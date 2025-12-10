import { createAdminClient } from '../lib/supabase/admin'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function run() {
    const supabase = createAdminClient()
    console.log('🗑️  Deleting ALL ledger entries (to fix foreign key constraints)...')
    const { error: ledgerError } = await supabase.from('ledger').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    if (ledgerError) {
        console.error('Error deleting ledger:', ledgerError.message)
    } else {
        console.log('✅ All ledger entries deleted.')
    }

    console.log('🗑️  Deleting ALL orders...')
    const { error: orderError } = await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    if (orderError) {
        console.error('Error deleting orders:', orderError.message)
    } else {
        console.log('✅ All orders deleted.')
    }

    console.log('🗑️  Deleting ALL products...')
    const { error } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000') // Delete all rows

    if (error) {
        console.error('Error deleting products:', error.message)
    } else {
        console.log('✅ All products deleted.')
    }
}

run()
