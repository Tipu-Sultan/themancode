import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Secret should match the one used in NextAuth config
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
  // Get the pathname of the request
  const { pathname } = req.nextUrl

  // Check if the path starts with /admin
  if (pathname.startsWith('/admin')) {
    // Get the token from the request
    const token = await getToken({ req, secret })

    // If no token exists (user not authenticated) or isAdmin is not true
    if (!token || !token.isAdmin) {
      // Redirect to homepage
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  // If no conditions match, proceed with the request
  return NextResponse.next()
}

// Define the matcher to apply middleware to specific routes
export const config = {
  matcher: '/admin/:path*', // Applies to all routes under /admin
}