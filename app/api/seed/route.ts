import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
    // Use a timestamp to ensure uniqueness and guarantee we get a fresh session
    const timestamp = Date.now()

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const createUserWithSession = async (email: string, role: 'operator' | 'creator', name: string) => {
        // 1. Sign Up (This should succeed since email is unique)
        const { data, error } = await supabase.auth.signUp({
            email,
            password: 'password123',
            options: { data: { full_name: name, role } }
        })

        if (error) throw new Error(`Failed to create ${role}: ${error.message}`)
        if (!data.user || !data.session) throw new Error(`Created ${role} but got no session. Check "Confirm Email" settings.`)

        // 2. Ensure User exists in public.users
        const { error: upsertError } = await supabase.from('users').insert({
            id: data.user.id,
            email: email,
            full_name: name,
            role: role
        })

        if (upsertError) console.error(`Failed to insert public user ${email}:`, upsertError)

        // 3. Ensure Wallet exists
        await supabase.from('wallets').insert({
            user_id: data.user.id,
            balance: 0
        })

        return { user: data.user, session: data.session }
    }

    try {
        // Create FRESH users to guarantee we have a session (bypassing "User already exists" issues)
        const opResult = await createUserWithSession(`operator_${timestamp}@demo.com`, 'operator', 'Demo Operator')
        const crResult = await createUserWithSession(`creator_${timestamp}@demo.com`, 'creator', 'Demo Creator')

        const operator = opResult.user
        const creator = crResult.user

        // Create a scoped client for the operator to pass RLS
        const productCreatorClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${opResult.session.access_token}` } } }
        )

        // Create Product
        const { data: product, error: prodError } = await productCreatorClient.from('products').insert({
            title: `Mastering ShadowOS (${timestamp})`, // Unique title
            description: 'The ultimate guide.',
            price: 100000,
            creator_id: creator.id,
            operator_id: operator.id,
            split_percentage_creator: 70,
            split_percentage_operator: 30
        }).select().single()

        if (prodError) throw new Error(`Product creation failed: ${prodError.message}`)

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully with NEW users!',
            data: { operator, creator, product }
        })

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
