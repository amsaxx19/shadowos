'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBusiness(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string

    if (!name || !slug) {
        throw new Error('Name and slug are required')
    }

    const { data, error } = await supabase.from('businesses').insert({
        owner_id: user.id,
        name,
        slug,
    }).select().single()

    if (error) {
        console.error('Error creating business:', error)
        throw new Error('Failed to create business')
    }

    revalidatePath('/dashboard')
    redirect(`/dashboard/${data.id}/home`)
}
