import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get the session token from the request (NextAuth JWT)
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Define admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  // If the user is not authenticated
  if (!isAuthenticated) {
    // Redirect to home page ('/') if trying to access any protected route
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next(); // Allow access to '/' if not authenticated
  }

  // If the user is authenticated and trying to access an admin route
  if (isAdminRoute) {
    const isAdmin = token?.isAdmin === true;

    if (!isAdmin) {
      // Redirect non-admin users to home page ('/') if they try to access admin routes
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow admin users to proceed to /admin/* routes
    return NextResponse.next();
  }

  // Allow authenticated users to access any non-admin route
  return NextResponse.next();
}

// Configure the matcher to apply middleware to specific routes
export const config = {
  matcher: [
    // Apply to all routes except static files, API routes, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};