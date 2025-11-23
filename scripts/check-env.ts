import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)
