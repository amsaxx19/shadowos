'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
    // 1. Verify Auth using standard client
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const title = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const faqs = JSON.parse(formData.get('faqs') as string || '[]')

    // 2. Use Admin Client for DB operations to bypass RLS
    const adminSupabase = createAdminClient()

    const creator_id = user.id
    const operator_id = user.id

    const { error } = await adminSupabase.from('products').insert({
        title,
        description,
        price,
        creator_id,
        operator_id,
        split_percentage_creator: 100,
        split_percentage_operator: 0,
        faqs: faqs
    })

    if (error) {
        console.error('Error creating product:', error)
        throw new Error('Failed to create product')
    }

    revalidatePath('/dashboard')
    redirect('/dashboard/biz_1/products')
}
