// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function checkAuthentication(request: NextRequest): boolean {
    // Get the cookie and check if it exists
    const authCookie = request.cookies.get('isAuthenticated');

    // Check if the cookie exists and if its value is 'true'
    return authCookie !== undefined && authCookie.value === 'true';
}

export function middleware(request: NextRequest) {
    // Use the checkAuthentication function
    const isAuthenticated = checkAuthentication(request);

    // If not authenticated and trying to access the /home page
    if (!isAuthenticated && request.nextUrl.pathname === '/home') {
        // Redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // if (!isAuthenticated && request.nextUrl.pathname === '/') {
    //     // Redirect to the login page
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // if (isAuthenticated && request.nextUrl.pathname === '/') {
    //     // Redirect to the login page
    //     return NextResponse.redirect(new URL('/home', request.url));
    // }

    // If authenticated or not accessing /home, allow the request
    return NextResponse.next();
}

// Set the middleware to apply to the /home path
export const config = {
    matcher: ['/home', '/', '/login'],
};
