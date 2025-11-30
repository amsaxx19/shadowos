"use server"

import { supabase } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type ProductData = {
    businessId: string
    title: string
    description?: string
    price: number
    currency?: string
    type: 'course' | 'discord_role' | 'file' | 'service' | 'coaching' | 'community' | 'software'
    pricingType: 'one_time' | 'subscription' | 'free'
    isVisible?: boolean
    apps?: {
        type: 'chat' | 'course_module' | 'file' | 'text'
        config?: any
    }[]
}

export async function createProduct(data: ProductData) {
    try {
        // 1. Insert Product
        const { data: product, error: productError } = await supabase
            .from('products')
            .insert({
                business_id: data.businessId,
                title: data.title,
                description: data.description,
                price: data.price,
                currency: data.currency || 'IDR',
                type: data.type,
                pricing_type: data.pricingType,
                is_visible: data.isVisible ?? true,
                image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60', // Default placeholder
                creator_name: 'ShadowOS User' // Should fetch actual user/business name
            })
            .select()
            .single()

        if (productError) {
            console.error("Error creating product:", productError)
            throw new Error("Failed to create product")
        }

        // 2. Insert Apps (if any)
        if (data.apps && data.apps.length > 0) {
            const appsToInsert = data.apps.map(app => ({
                product_id: product.id,
                app_type: app.type,
                config: app.config || {}
            }))

            const { error: appsError } = await supabase
                .from('product_apps')
                .insert(appsToInsert)

            if (appsError) {
                console.error("Error creating product apps:", appsError)
                // We might want to delete the product if apps fail, or just warn
            }
        }

        // 3. Revalidate and Redirect
        revalidatePath(`/dashboard/${data.businessId}/products`)
        return { success: true, productId: product.id }

    } catch (error) {
        console.error("Server Action Error:", error)
        return { success: false, error: "Internal Server Error" }
    }
}
