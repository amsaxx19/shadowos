import { createAdminClient } from '../lib/supabase/admin'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function inspect() {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('products').select('*').limit(1).single()
    if (error) {
        console.error('Error:', error)
    } else {
        console.log('Product Structure:', Object.keys(data))
        console.log('Full Data:', JSON.stringify(data, null, 2))
    }
}

inspect()
