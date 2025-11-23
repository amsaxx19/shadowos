'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('name') as string

    // 1. Create Auth User
    // Note: In a real production app, we'd use the Service Role key to create a user without signing them in.
    // However, using the client-side `signUp` (or server-side `signUp` without service role) might sign the current user out or fail if email confirmation is on.
    // For this "Private Operator" MVP, we will assume we can use `signUp` and it might require email confirmation OR we just create it.
    // BUT, `signUp` returns a session. If we use it here, it might overwrite the Operator's session.
    // Ideally, we use `supabase.auth.admin.createUser` which requires `service_role` key.

    // Let's try to use a separate client with the service role key if available, or fall back to a "hacky" way (which might sign us out).
    // Given the user instructions "System sends them a login credential", we need to create it.

    // I will try to use the ADMIN client if I can find the key.
    // If not, I will use the normal client and warn the user.

    // Actually, since I am running locally, I can try to read the service role key from env if the user put it there.
    // But usually `createClient` in `lib/supabase/server` uses the anon key.

    // Let's try to use `signUp`. If it signs us out, that's a known issue with client-side auth, but server-side `signUp` *should* just return data unless we set `autoRefreshToken`.
    // Wait, `supabase.auth.signUp` on the server *does not* automatically set cookies for the *current* request context unless we use the middleware/cookie stuff.
    // But `createClient` in `lib/supabase/server` *does* handle cookies.
    // So if we call `signUp` on that client, it MIGHT set the session cookies for the *new* user, effectively logging out the Operator.

    // SOLUTION: Create a TEMPORARY client that DOES NOT persist sessions to cookies.
    // We can use `createClient` from `@supabase/supabase-js` directly (not the Next.js helper) for this one-off action.

    const { createClient: createDirectClient } = require('@supabase/supabase-js')
    const tempSupabase = createDirectClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: authData, error: authError } = await tempSupabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: 'creator' // We set this in metadata, and our trigger should handle the `users` table insert
            }
        }
    })

    if (authError) {
        console.error("Error creating user:", authError)
        throw new Error(authError.message)
    }

    // If email confirmation is enabled, they won't be able to login immediately.
    // For this MVP, we assume email confirmation is OFF or we just accept it.

    revalidatePath('/dashboard/operator/users')
}
