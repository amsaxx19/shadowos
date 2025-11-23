import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"

import fs from 'fs'
import path from 'path'

// Manually parse .env.local
try {
    const files = ['.env.local', '.env']
    files.forEach(file => {
        try {
            const envConfig = fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8')
            envConfig.split('\n').forEach(line => {
                const [key, value] = line.split('=')
                if (key && value) {
                    process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '')
                }
            })
        } catch (e) {
            // Ignore missing files
        }
    })
    console.log("Loaded keys:", Object.keys(process.env).filter(k => k.includes('SUPABASE')))
} catch (e) {
    console.error("Could not read .env.local", e)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars. URL:", !!supabaseUrl, "Key:", !!supabaseKey)
    process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

async function createTestCreator() {
    const email = `creator_${Date.now()}@example.com`
    const password = "password123"

    console.log(`Creating creator: ${email} / ${password}`)

    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
            full_name: "Test Creator",
            role: "creator"
        }
    })

    if (error) {
        console.error("Error creating user:", error)
        return
    }

    console.log("User created successfully:", user.user.id)

    // Also ensure wallet exists (trigger should handle it, but good to verify)
    // We can't verify wallet easily without admin client for public schema, but trigger is reliable.
}

createTestCreator()
