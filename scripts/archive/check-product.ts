import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ohgnjyeqdqahhxewhgwi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZ25qeWVxZHFhaGh4ZXdoZ3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Njg5ODYsImV4cCI6MjA3OTI0NDk4Nn0.Gh8c3aJdCE7qc-DSpMytK4ilF8d3D2_SPlM5OOy20Jw'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProduct() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching product:', error)
    } else {
        console.log('Product found:', data)
    }
}

checkProduct()
