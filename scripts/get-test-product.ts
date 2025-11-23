import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function getTestProduct() {
    const { data: products, error } = await supabase
        .from('products')
        .select('id, title, price')
        .limit(1)

    if (error) {
        console.error('Error fetching products:', error)
        return
    }

    if (!products || products.length === 0) {
        console.log('No products found.')
        return
    }

    console.log('Test Product:', products[0])
}

getTestProduct()
