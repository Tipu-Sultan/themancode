// app/AdminPaddingWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';

export default function AdminPaddingWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? 'pt-16' : ''}>
      {children}
    </div>
  );
}