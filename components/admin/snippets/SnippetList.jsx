'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast'; // Assuming this is where useToast comes from
import { Trash2, Loader2 } from 'lucide-react'; // Import Trash2 for delete icon and Loader2 for spinner

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Track which snippet is being deleted
  const { toast } = useToast();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await fetch('/api/admin/snippet'); // Adjusted to match your API path
        const data = await res.json();
        if (res.ok) {
          setSnippets(data);
        } else {
          toast({ title: 'Error', description: data.message || 'Failed to fetch snippets', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Error', description: 'An error occurred while fetching snippets', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchSnippets();
  }, [toast]);

  const handleDelete = async (snippetId) => {
    setDeletingId(snippetId); // Set loading state for this snippet
    try {
      const res = await fetch(`/api/admin/snippet/${snippetId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setSnippets((prev) => prev.filter((snippet) => snippet._id !== snippetId));
        toast({ title: 'Success', description: 'Snippet deleted successfully!' });
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to delete snippet', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred while deleting the snippet', variant: 'destructive' });
    } finally {
      setDeletingId(null); // Reset loading state
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {snippets.length === 0 ? (
        <motion.p variants={fadeInUp} initial="initial" animate="animate" className="text-muted-foreground">
          No snippets found. Start by creating one!
        </motion.p>
      ) : (
        snippets.map((snippet, index) => (
          <motion.div
            key={snippet._id}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {snippet.category} - {snippet.section}
                    </h2>
                    <p className="text-muted-foreground">
                      {snippet.snippets.length} snippet{snippet.snippets.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/snippets/${snippet._id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(snippet._id)}
                      disabled={deletingId === snippet._id}
                    >
                      {deletingId === snippet._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))
      )}
    </div>
  );
}