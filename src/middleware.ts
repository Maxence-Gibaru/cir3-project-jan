import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const url = request.nextUrl.clone();

    if (url.pathname.startsWith("/admin")) {

        const userRole = null;

        if (userRole !== 'admin') {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (url.pathname.startsWith("/api/admin")) {

        const userRole = null;

        if (userRole !== 'admin') {
            return NextResponse.json(
                { message: 'Access to API routes is forbidden from the browser.' },
                { status: 403 }
            );
        }
    }

    /* if (request.nextUrl.pathname.startsWith("/api/comments")) {
        const isAuthenticated = false;
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } */

    return NextResponse.next();


}


export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
}