'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ClientProvider({ children }) {
  const siteKey = process.env.RECAPTCHA_SITE_KEY || '';
  return (
    <SessionProvider>
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        {children}

      </GoogleReCaptchaProvider>
    </SessionProvider>
  );
}