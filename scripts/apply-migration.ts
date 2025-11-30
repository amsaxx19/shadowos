import { Client } from 'pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load env from .env.local
dotenv.config({ path: '.env.local' })

async function applyMigration() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

    if (!connectionString) {
        console.error('Error: DATABASE_URL or POSTGRES_URL not found in .env.local')
        process.exit(1)
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false } // Required for Supabase/Neon usually
    })

    try {
        await client.connect()
        console.log('Connected to database.')

        const migrationPath = path.join(process.cwd(), 'supabase/migrations/20251201_add_category_to_products.sql')
        const sql = fs.readFileSync(migrationPath, 'utf8')

        console.log('Applying migration...')
        await client.query(sql)
        console.log('Migration applied successfully!')

    } catch (err) {
        console.error('Error applying migration:', err)
        process.exit(1)
    } finally {
        await client.end()
    }
}

applyMigration()
