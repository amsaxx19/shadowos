import { supabase } from '@/lib/supabase/client'

export async function getDemoUser(role: 'operator' | 'creator') {
    const { data } = await supabase
        .from('users')
        .select('id')
        .eq('role', role)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    return data?.id
}
