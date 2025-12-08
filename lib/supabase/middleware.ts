import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
// import { Ratelimit } from '@upstash/ratelimit'
// import { kv } from '@vercel/kv'

// Simple in-memory fallback for development without Upstash
const localCache = new Map<string, number[]>()

export async function updateSession(request: NextRequest) {
    console.log("Middleware running for:", request.nextUrl.pathname)
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // --- RATE LIMITING LOGIC ---
    const ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'

    // Only limit critical paths (Login, Checkout)
    if (false && (request.nextUrl.pathname.startsWith('/api/payment') || request.nextUrl.pathname.startsWith('/login'))) {
        let success = true
        let limit = 10
        let remaining = 10
        let reset = Date.now() + 10000

        if (false) { // process.env.UPSTASH_REDIS_REST_URL
            // Use Upstash if configured
            // const ratelimit = new Ratelimit({
            //     redis: kv,
            //     limiter: Ratelimit.slidingWindow(10, '10 s'),
            // })
            // const result = await ratelimit.limit(ip)
            // success = result.success
            // limit = result.limit
            // remaining = result.remaining
            // reset = result.reset
        } else {
            // Local Fallback (Simple Token Bucket / Window)
            // Note: This only works reliably in 'next dev' (single process). 
            // In Vercel/Edge, this Map is empty every request.
            const now = Date.now()
            const windowStart = now - 10000

            let timestamps = localCache.get(ip) || []
            // Filter out old timestamps
            timestamps = timestamps.filter(t => t > windowStart)

            if (timestamps.length >= 10) {
                success = false
                remaining = 0
            } else {
                timestamps.push(now)
                localCache.set(ip, timestamps)
                remaining = 10 - timestamps.length
            }

            // Cleanup old entries periodically (simple heuristic)
            if (Math.random() < 0.01) { // 1% chance per request
                for (const [key, times] of localCache.entries()) {
                    if (times.every(t => t < windowStart)) {
                        localCache.delete(key)
                    }
                }
            }
        }

        if (!success) {
            return new NextResponse('Too Many Requests', { status: 429 })
        }
    }
    // ---------------------------

    try {
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
        if ((request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/home')) && !user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (user) {
            // ... existing user logic ...
            const role = user.user_metadata.role

            // Multi-Tenancy Redirection
            // If visiting /dashboard root, redirect to active business
            if (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname === '/dashboard/') {
                // Try to get last business from cookie or user metadata
                // For now, we'll default to the first business ID found in the 'businesses' table or a fallback
                // Since we can't easily query 'businesses' here without potentially slowing down every request,
                // we'll rely on a 'current_business_id' in the user's metadata or a cookie.

                // Ideally, we should have 'current_business_id' in user_metadata.
                // Let's assume we store it there or in a cookie 'shadow_last_business'.
                const lastBusinessId = request.cookies.get('shadow_last_business')?.value || 'biz_1' // Fallback to biz_1 for now

                return NextResponse.redirect(new URL(`/dashboard/${lastBusinessId}/home`, request.url))
            }

            // Redirect legacy routes (e.g. /dashboard/payouts -> /dashboard/[id]/payouts)
            // If the second segment is NOT a UUID (simple check) and matches known legacy pages
            const pathParts = request.nextUrl.pathname.split('/')
            // pathParts[0] = '', [1] = 'dashboard', [2] = 'payouts' (potential)
            if (pathParts.length === 3 && ['payouts', 'products', 'analytics', 'settings', 'store', 'invoices', 'users'].includes(pathParts[2])) {
                const lastBusinessId = request.cookies.get('shadow_last_business')?.value || 'biz_1'
                return NextResponse.redirect(new URL(`/dashboard/${lastBusinessId}/${pathParts[2]}`, request.url))
            }

            // Prevent Creator from accessing Operator Dashboard (Legacy check, might need update)
            // With multi-tenancy, roles are per-business. We'll defer role checking to the page/layout level or RLS.

            if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
                return NextResponse.redirect(new URL('/home', request.url))
            }
        }
    } catch (err: any) {
        console.error("Supabase Middleware Error:", err)
        // return new NextResponse("Supabase Error: " + err.message, { status: 500 })
        throw err // Let the root middleware catch it
    }

    return response
}

