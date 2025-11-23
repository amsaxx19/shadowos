'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createProduct(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = Number(formData.get('price'))
    const creatorSplit = Number(formData.get('creator_split'))
    const operatorSplit = 100 - creatorSplit

    // Get current user (Operator)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const creatorId = formData.get('creator_id') as string

    if (!creatorId) {
        throw new Error("Creator is required")
    }

    const { error } = await supabase
        .from('products')
        .insert({
            title,
            description,
            price,
            split_percentage_creator: creatorSplit,
            split_percentage_operator: operatorSplit,
            operator_id: user.id,
            creator_id: creatorId
        })

    if (error) {
        console.error("Failed to create product:", error)
        // In a real app, return error to form
        throw new Error("Failed to create product")
    }

    redirect('/dashboard/operator/products')
}
