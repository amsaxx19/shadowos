import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const createAdminClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}

async function debugProductPage() {
    const supabase = createAdminClient()
    const slug = '669ad57e-bf16-422b-a4a2-e41d167e1c89' // The ID from the URL

    console.log("Testing Product Fetch with ID:", slug)
    console.log("Service Role Key Present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    const { data: product, error } = await supabase
        .from('products')
        .select('*, users:creator_id(full_name, avatar_url)')
        .eq('id', slug)
        .single()

    if (error) {
        console.error("Error fetching product:", error)
    } else if (!product) {
        console.error("Product not found (null data)")
    } else {
        console.log("Success! Product found:", product.title)
    }
}

debugProductPage()
