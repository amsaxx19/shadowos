import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protected Routes Logic
    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (user) {
        const role = user.user_metadata.role

        // Prevent Creator from accessing Operator Dashboard
        if (request.nextUrl.pathname.startsWith('/dashboard/operator') && role === 'creator') {
            return NextResponse.redirect(new URL('/dashboard/creator', request.url))
        }

        // Prevent Operator from accessing Creator Dashboard (Optional, but good for consistency)
        if (request.nextUrl.pathname.startsWith('/dashboard/creator') && role === 'operator') {
            return NextResponse.redirect(new URL('/dashboard/operator', request.url))
        }

        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
            return NextResponse.redirect(new URL(role === 'creator' ? '/dashboard/creator' : '/dashboard/operator', request.url))
        }
    }

    return response
}
