'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function createProduct(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const title = formData.get('name') as string
    const headline = formData.get('headline') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string) || 0
    const pricingType = formData.get('pricingType') as string || 'one-time'
    const faqs = JSON.parse(formData.get('faqs') as string || '[]')
    const category = formData.get('category') as string || 'other'

    // Affiliate settings
    const isAffiliateEnabled = formData.get('is_affiliate_enabled') === 'true'
    const affiliatePercentage = parseInt(formData.get('affiliate_percentage') as string) || 0

    const businessId = formData.get('business_id') as string

    // Check if businessId is valid UUID, if not use null (for development)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const validBusinessId = uuidRegex.test(businessId) ? businessId : null

    // Generate slug from title for the product link
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product'

    const adminSupabase = createAdminClient()

    // Only insert columns that exist in the database
    const { data, error } = await adminSupabase.from('products').insert({
        title,
        description,
        price: pricingType === 'free' ? 0 : price,
        creator_id: user.id,
        operator_id: user.id,
        business_id: validBusinessId,
        split_percentage_creator: 100,
        split_percentage_operator: 0,
        category,
        faqs,
        is_affiliate_enabled: isAffiliateEnabled,
        affiliate_percentage: isAffiliateEnabled ? affiliatePercentage : 0,
    }).select('id').single()

    if (error) {
        console.error('Error creating product:', error)
        throw new Error(error.message || 'Failed to create product')
    }

    revalidatePath(`/dashboard/${businessId}`)

    // Return the product data for the success modal
    return {
        success: true,
        productId: data.id,
        slug: slug,
        productLink: `https://cuanboss.com/product/${data.id}`,
    }
}
