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

    const is_affiliate_enabled = formData.get('is_affiliate_enabled') === 'true'
    const affiliate_percentage = is_affiliate_enabled ? parseInt(formData.get('affiliate_percentage') as string) : 0

    // Get businessId from URL params (passed via hidden input or we need to parse referer/params)
    // For now, let's assume we can get it from the form if we add a hidden input, OR we parse the referer.
    // Better: The page should pass it.
    // Let's check if the page has businessId in params.
    // The page component `CreateProductPage` is inside `[businessId]`, so it can access params.
    // But this is a server action called by form.
    // We should add a hidden input for businessId in the form.

    const businessId = formData.get('business_id') as string

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
        business_id: businessId,
        split_percentage_creator: 100,
        split_percentage_operator: 0,
        faqs: faqs,
        is_affiliate_enabled,
        affiliate_percentage,
        category: formData.get('category') as string || 'other'
    })

    if (error) {
        console.error('Error creating product:', error)
        throw new Error('Failed to create product')
    }

    revalidatePath(`/dashboard/${businessId}`)
    redirect(`/dashboard/${businessId}/products`)
}
