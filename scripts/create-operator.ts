import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createOperator() {
    console.log('Creating operator account...');

    const email = 'operator@shadowos.com';
    const password = 'password123';

    // 1. Create Auth User
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role: 'operator', full_name: 'Shadow Operator' }
    });

    if (authError) {
        console.error('Error creating auth user:', authError.message);
        return;
    }

    console.log('Auth user created:', authUser.user.id);

    // 2. Insert into public.users (Trigger might handle this, but let's be safe)
    // Actually, the trigger 'on_auth_user_created' in schema.sql handles this.
    // Let's just verify if the user exists in public.users

    // Wait a bit for trigger
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { data: publicUser, error: publicError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.user.id)
        .single();

    if (publicError) {
        console.error('Error fetching public user (trigger might have failed):', publicError.message);
        // Manually insert if needed
        const { error: insertError } = await supabase
            .from('users')
            .insert({
                id: authUser.user.id,
                email,
                full_name: 'Shadow Operator',
                role: 'operator'
            });

        if (insertError) console.error('Manual insert failed:', insertError);
        else console.log('Manually inserted into public.users');
    } else {
        console.log('User exists in public.users:', publicUser);
    }
}

createOperator();
