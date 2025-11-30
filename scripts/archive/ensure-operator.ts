import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function ensureOperator() {
    const email = 'operator_test@shadowos.com';
    const password = 'password123';

    console.log(`Ensuring operator account: ${email}`);

    // 1. Check if user exists in public.users
    const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (existingUser) {
        console.log('User already exists in public.users:', existingUser.id);
        console.log('User already exists in public.users:', existingUser.id);
        console.log('Cannot update password without service key. Please try logging in with existing password.');
        return;
    }

    console.log('User does not exist. Creating...');

    // 2. Create Auth User using signUp (since we lack service key)
    const { data: authUser, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { role: 'operator', full_name: 'Test Operator' }
        }
    });

    if (authError) {
        console.error('Error creating auth user:', authError.message);
        return;
    }

    if (!authUser.user) {
        console.error('Auth user creation failed (no user returned).');
        return;
    }

    console.log('Auth user created:', authUser.user.id);

    // 3. Wait for trigger to populate public.users
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Verify public.users
    const { data: publicUser, error: publicError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.user.id)
        .single();

    if (publicError) {
        console.log('Trigger might have failed. Manually inserting into public.users...');
        const { error: insertError } = await supabase
            .from('users')
            .insert({
                id: authUser.user.id,
                email,
                full_name: 'Test Operator',
                role: 'operator'
            });

        if (insertError) console.error('Manual insert failed:', insertError);
        else console.log('Manually inserted into public.users');
    } else {
        console.log('User successfully verified in public.users');
    }
}

ensureOperator();
