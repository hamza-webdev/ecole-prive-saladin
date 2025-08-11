
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Si l'utilisateur est connecté et essaie d'accéder à la page de login
    if (token && pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!token && pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Le middleware gère la redirection
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
