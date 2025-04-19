'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
const siteKey = process.env.RECAPTCHA_SITE_KEY;
if (!siteKey) {
  throw new Error('Please define the RECAPTCHA_SITE_KEY environment variable');
}

export default function ClientProvider({ children }) {
  return (
    
    <SessionProvider>
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}

      </GoogleReCaptchaProvider>
    </SessionProvider>
  );
}