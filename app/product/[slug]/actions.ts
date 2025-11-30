'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitReview(productId: string, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Harus login untuk mereview')
    }

    const rating = parseInt(formData.get('rating') as string)
    const comment = formData.get('comment') as string

    const { error } = await supabase.from('reviews').insert({
        product_id: productId,
        user_id: user.id,
        rating,
        comment
    })

    if (error) {
        console.error('Error submitting review:', error)
        throw new Error('Gagal mengirim review')
    }

    revalidatePath(`/product/${productId}`)
}
