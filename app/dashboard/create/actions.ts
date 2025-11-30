'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createBusiness(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const name = formData.get('name') as string
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000)

    // 1. Create Business
    const { data: business, error: createError } = await supabase
        .from('businesses')
        .insert({
            name,
            slug,
            currency: 'IDR', // Default to IDR
            owner_id: user.id
        })
        .select()
        .single()

    if (createError) {
        console.error("Error creating business:", createError)
        return { error: "Failed to create business. Please try again." }
    }

    // 2. Add User as Member (Owner)
    const { error: memberError } = await supabase
        .from('business_members')
        .insert({
            business_id: business.id,
            user_id: user.id,
            role: 'owner'
        })

    if (memberError) {
        console.error("Error adding member:", memberError)
        // Cleanup business if member creation fails? 
        // For now, let's just return error, user might be stuck but data is there.
        return { error: "Failed to set up business membership." }
    }

    // 3. Update User's Current Business
    await supabase
        .from('users')
        .update({ current_business_id: business.id })
        .eq('id', user.id)

    revalidatePath('/dashboard')
    redirect(`/dashboard/${business.id}/home`)
}
