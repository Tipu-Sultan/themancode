import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import Login from './Login';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}