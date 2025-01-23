import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authOptions } from './lib/authOptions';
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }

        const url = req.nextUrl.pathname;

        // Vérifier les rôles en fonction du chemin
        if (url.startsWith("/admin") && token?.user?.role !== "admin") {
            return new Response("Forbidden: Admins only", { status: 403 });
        }

        if (url.startsWith("/api/organizer") && token?.user?.role !== "organizer") {
            return new Response("Forbidden: Organizers only", { status: 403 });
        }

        // Tout va bien, continuer
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Vérifier si le token existe
        },
    },
);

export const config = {
    matcher: [
        "/admin/:path*",          // Routes accessibles uniquement aux admins
        "/api/admin/:path*",      // Routes API accessibles uniquement aux admins
        "/api/organizer/:path*",  // Routes API accessibles uniquement aux organisateurs
    ],
};
/* 
export const config = {
    matcher: ['/admin/:path*', '/api/:path*'],
} */