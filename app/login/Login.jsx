'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const callbackUrl = searchParams.get('redirect') || '/';
      await signIn('google', { callbackUrl });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <Card className="bg-white shadow-md border-none overflow-hidden">
          <CardHeader className="space-y-3 text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            >
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome to RideMarket
              </CardTitle>
            </motion.div>
            <CardDescription className="text-gray-600 text-sm sm:text-base px-4">
              Sign in with Google to access your personalized vehicle marketplace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 sm:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center gap-3 bg-gray-50 hover:bg-blue-600 hover:text-white border-gray-300 hover:border-blue-600 text-gray-700 text-sm sm:text-base font-medium py-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span>Signing In...</span>
                  </motion.div>
                ) : (
                  <>
                    <Image
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}