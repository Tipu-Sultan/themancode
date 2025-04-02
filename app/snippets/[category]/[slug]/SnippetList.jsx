// app/snippets/[category]/[slug]/SnippetList.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SnippetList({ snippets }) {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      {snippets.map((snippet, index) => (
        <motion.div
          key={snippet.id}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.1 }}
          className="border border-muted rounded-lg p-4 bg-muted/10"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {snippet.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {snippet.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(snippet.code, snippet.id)}
              className="hover:bg-muted"
            >
              {copiedId === snippet.id ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          <div className="relative">
            <SyntaxHighlighter
              language={snippet.language}
              style={oneDark}
              customStyle={{
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                background: '#2d2d2d',
              }}
              showLineNumbers
            >
              {snippet.code.trim()}
            </SyntaxHighlighter>
            <span className="absolute top-2 right-2 bg-primary/30 text-xs px-2 py-1 rounded-full text-foreground">
              {snippet.language}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}