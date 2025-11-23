import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

    const { data: wallet, error } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single()

    if (error || !wallet) return NextResponse.json({ balance: 0 })

    return NextResponse.json({ balance: wallet.balance })
}
