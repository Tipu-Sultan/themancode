import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define admin routes
  const isAdminRoute = pathname.startsWith('/admin');

  // If the request is not for an admin route, allow it to proceed without checks
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Get the session token from the request (NextAuth JWT) only for admin routes
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'askfosfsdgsgsdngnslknls11w3rwfeEnkdnsk77AKw3883sdnsksfnsklnlksa',
  });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // If the user is not authenticated and trying to access an admin route
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the user is authenticated and trying to access an admin route
  const isAdmin = token?.isAdmin === true;
  if (!isAdmin) {
    // Redirect non-admin users to home page ('/') if they try to access admin routes
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow authenticated admin users to proceed to /admin/* routes
  return NextResponse.next();
}

// Configure the matcher to apply middleware only to /admin routes
export const config = {
  matcher: [
    // Only apply middleware to /admin and its subroutes
    '/admin/:path*',
  ],
};