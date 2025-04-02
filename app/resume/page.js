'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, Download, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function ResumePage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Resume</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Preview my skills and experience below or download the full PDF.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center"
        >
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={scale >= 2.0}
              className="rounded-full"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="rounded-full"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            <a href="/assets/MyResume-2025.pdf" download className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </Button>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-muted/30 dark:border-muted-foreground/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative w-full overflow-auto max-h-[70vh] bg-muted/10 rounded-lg">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}
                <Document
                  file="/assets/MyResume-2025.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => console.error('Error loading PDF:', error)}
                  className="flex justify-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-md"
                  />
                </Document>
              </div>
              {numPages > 1 && (
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                    disabled={pageNumber <= 1}
                    className="rounded-full"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground self-center">
                    Page {pageNumber} of {numPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
                    disabled={pageNumber >= numPages}
                    className="rounded-full"
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}