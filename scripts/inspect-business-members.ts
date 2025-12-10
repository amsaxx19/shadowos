import { createAdminClient } from '../lib/supabase/admin'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function inspect() {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('business_members').select('*').limit(1)

    if (error) {
        console.error('Error accessing table:', error.message)
        // If table doesn't exist, this will tell us.
    } else {
        console.log('Table exists. Sample data:', data)
        // If data is empty, we can't guess columns easily from 'data', but clean error means table exists.
        // To be sure of columns, I'll try to insert a dummy to force an error or just assume standard cols if empty.
        // Actually, let's try to infer from a failed select of a non-existent column if needed, or just hope there's data.
        if (data.length > 0) {
            console.log('Columns:', Object.keys(data[0]))
        } else {
            console.log('Table is empty. Cannot infer columns from data.')
        }
    }
}

inspect()
