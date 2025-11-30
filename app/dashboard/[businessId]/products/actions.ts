'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const title = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)

    // For now, we assume the creator is also the operator (Self-Operated)
    // In a real scenario, we would look up the business owner based on the URL params or context
    const creator_id = user.id
    const operator_id = user.id

    const { error } = await supabase.from('products').insert({
        title,
        description,
        price,
        creator_id,
        operator_id,
        split_percentage_creator: 100, // Default to 100% for self-operated
        split_percentage_operator: 0,
    })

    if (error) {
        console.error('Error creating product:', error)
        throw new Error('Failed to create product')
    }

    revalidatePath('/dashboard')
    redirect('/dashboard/biz_1/products') // Redirect to products list (assuming biz_1 for now)
}
