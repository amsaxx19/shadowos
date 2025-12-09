# Supabase Email Templates

Template email untuk ShadowOS. Copy-paste ke **Supabase Dashboard → Authentication → Email Templates**.

## Cara Pakai

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project ShadowOS
3. Pergi ke **Authentication → Email Templates**
4. Pilih template yang mau diubah
5. Copy HTML dari file di bawah
6. Paste ke field "Body"
7. Save

## Available Templates

| File | Untuk | Supabase Template |
|------|-------|------------------|
| `magic-link.html` | OTP Login/Signup | Magic Link |
| `confirm-signup.html` | Konfirmasi Email | Confirm signup |
| `reset-password.html` | Reset Password | Reset Password |
| `invite-user.html` | Undang User | Invite user |

## Variables

Supabase menyediakan variables ini:

- `{{ .Token }}` - 6-digit OTP code
- `{{ .ConfirmationURL }}` - Link konfirmasi
- `{{ .SiteURL }}` - URL website
- `{{ .Email }}` - Email user
