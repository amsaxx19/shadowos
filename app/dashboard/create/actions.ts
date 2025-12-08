'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Word lists for random name generation
const PREFIXES_EN = ['Nova', 'Apex', 'Stellar', 'Prime', 'Elite', 'Bright', 'Swift', 'Bold', 'Peak', 'Core', 'Next', 'Rise', 'Spark', 'Flow', 'Vibe', 'Hive', 'Pulse', 'Wave', 'Flux', 'Glow']
const SUFFIXES_EN = ['Labs', 'Studio', 'Co', 'Hub', 'Works', 'Craft', 'Tech', 'Digital', 'Media', 'Agency', 'Group', 'Ventures', 'Creative', 'Solutions', 'Space']
const PREFIXES_ID = ['Karya', 'Maju', 'Sukses', 'Jaya', 'Bintang', 'Gemilang', 'Abadi', 'Sejahtera', 'Mandiri', 'Prima', 'Sentosa', 'Utama', 'Berkah', 'Mulia', 'Sinar']
const SUFFIXES_ID = ['Kreatif', 'Digital', 'Solusi', 'Media', 'Teknologi', 'Grup', 'Indonesia', 'Nusantara', 'Global', 'Inovasi']

export async function generateBusinessName(): Promise<{ name: string } | { error: string }> {
    const supabase = await createClient()

    // Try up to 10 times to find a unique name
    for (let i = 0; i < 10; i++) {
        // Randomly choose Indonesian or English
        const isIndonesian = Math.random() > 0.5

        let name: string
        if (isIndonesian) {
            const prefix = PREFIXES_ID[Math.floor(Math.random() * PREFIXES_ID.length)]
            const suffix = SUFFIXES_ID[Math.floor(Math.random() * SUFFIXES_ID.length)]
            name = `${prefix} ${suffix}`
        } else {
            const prefix = PREFIXES_EN[Math.floor(Math.random() * PREFIXES_EN.length)]
            const suffix = SUFFIXES_EN[Math.floor(Math.random() * SUFFIXES_EN.length)]
            name = `${prefix} ${suffix}`
        }

        // Check if name exists
        const { data: existing } = await supabase
            .from('businesses')
            .select('name')
            .ilike('name', name)
            .maybeSingle()

        if (!existing) {
            return { name }
        }
    }

    // If all attempts failed, add random number
    const randomNum = Math.floor(Math.random() * 1000)
    const prefix = PREFIXES_EN[Math.floor(Math.random() * PREFIXES_EN.length)]
    return { name: `${prefix} ${randomNum}` }
}

export async function checkBusinessName(name: string): Promise<{ available: boolean }> {
    const supabase = await createClient()

    if (!name.trim()) {
        return { available: false }
    }

    const { data: existing } = await supabase
        .from('businesses')
        .select('name')
        .ilike('name', name.trim())
        .maybeSingle()

    return { available: !existing }
}

export async function createBusiness(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const name = formData.get('name') as string
    const model = formData.get('model') as string || ''
    const industry = formData.get('industry') as string || ''

    // Check if business name already exists
    const { data: existingBusiness } = await supabase
        .from('businesses')
        .select('name')
        .ilike('name', name)
        .maybeSingle()

    if (existingBusiness) {
        return { error: "Nama bisnis sudah dipakai. Silakan gunakan nama lain." }
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000)

    // 1. Create Business
    const { data: business, error: createError } = await supabase
        .from('businesses')
        .insert({
            name,
            slug,
            currency: 'IDR',
            owner_id: user.id,
            business_model: model,
            industry: industry,
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
        return { error: "Failed to set up business membership." }
    }

    // 3. Update User's Current Business
    await supabase
        .from('users')
        .update({ current_business_id: business.id })
        .eq('id', user.id)

    revalidatePath('/dashboard')
    // Redirect with onboarding flag to trigger confetti
    redirect(`/dashboard/${business.id}/home?from_onboarding=true`)
}
