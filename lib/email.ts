'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'ShadowOS <noreply@resend.dev>'

interface OrderDetails {
    orderId: string
    productTitle: string
    amount: number
    customerName?: string
}

interface PayoutDetails {
    amount: number
    status: 'approved' | 'rejected'
    creatorName?: string
}

// Check if email is a test email (mock)
function isTestEmail(email: string): boolean {
    return email.endsWith('@example.com')
}

/**
 * Send welcome email to new users after signup/onboarding
 */
export async function sendWelcomeEmail(email: string, name: string) {
    // Mock for test emails
    if (isTestEmail(email)) {
        console.log(`[EMAIL MOCK] Welcome email to ${email}:`, { name })
        return { success: true, mocked: true }
    }

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: '🎉 Selamat Datang di ShadowOS!',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; }
                        .container { max-width: 600px; margin: 0 auto; background: #171717; border-radius: 16px; padding: 40px; }
                        .header { text-align: center; margin-bottom: 32px; }
                        .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
                        h1 { font-size: 24px; margin-bottom: 16px; }
                        p { color: #a3a3a3; line-height: 1.6; margin-bottom: 16px; }
                        .button { display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-top: 24px; }
                        .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #525252; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">ShadowOS</div>
                        </div>
                        <h1>Selamat Datang, ${name}! 🚀</h1>
                        <p>Terima kasih sudah bergabung dengan ShadowOS. Sekarang kamu bisa mulai menjual produk digital dan menghasilkan pendapatan.</p>
                        <p>Berikut langkah selanjutnya:</p>
                        <ul style="color: #a3a3a3; line-height: 2;">
                            <li>Buat produk digital pertamamu</li>
                            <li>Atur percentage split dengan creator</li>
                            <li>Mulai promosikan dan dapatkan penjualan</li>
                        </ul>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">Masuk ke Dashboard</a>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} ShadowOS. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        })

        if (error) {
            console.error('[EMAIL ERROR] Welcome email failed:', error)
            return { success: false, error }
        }

        console.log('[EMAIL] Welcome email sent:', data)
        return { success: true, data }
    } catch (error) {
        console.error('[EMAIL ERROR] Welcome email exception:', error)
        return { success: false, error }
    }
}

/**
 * Send purchase confirmation to customer after successful payment
 */
export async function sendPurchaseConfirmation(email: string, order: OrderDetails) {
    // Mock for test emails
    if (isTestEmail(email)) {
        console.log(`[EMAIL MOCK] Purchase confirmation to ${email}:`, order)
        return { success: true, mocked: true }
    }

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(order.amount)

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `✅ Pembelian Berhasil - ${order.productTitle}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; }
                        .container { max-width: 600px; margin: 0 auto; background: #171717; border-radius: 16px; padding: 40px; }
                        .header { text-align: center; margin-bottom: 32px; }
                        .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
                        h1 { font-size: 24px; margin-bottom: 16px; color: #22c55e; }
                        p { color: #a3a3a3; line-height: 1.6; margin-bottom: 16px; }
                        .order-box { background: #262626; border-radius: 12px; padding: 24px; margin: 24px 0; }
                        .order-row { display: flex; justify-content: space-between; margin-bottom: 12px; }
                        .label { color: #737373; }
                        .value { color: #ffffff; font-weight: 500; }
                        .total { font-size: 20px; color: #22c55e; font-weight: 700; }
                        .button { display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-top: 24px; }
                        .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #525252; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">ShadowOS</div>
                        </div>
                        <h1>✅ Pembayaran Berhasil!</h1>
                        <p>Terima kasih atas pembelianmu. Berikut detail pesananmu:</p>
                        <div class="order-box">
                            <div class="order-row">
                                <span class="label">Order ID</span>
                                <span class="value">${order.orderId}</span>
                            </div>
                            <div class="order-row">
                                <span class="label">Produk</span>
                                <span class="value">${order.productTitle}</span>
                            </div>
                            <hr style="border-color: #404040; margin: 16px 0;">
                            <div class="order-row">
                                <span class="label">Total Dibayar</span>
                                <span class="value total">${formattedPrice}</span>
                            </div>
                        </div>
                        <p>Kamu sekarang bisa mengakses produk digital yang sudah dibeli.</p>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/product/${order.orderId}" class="button">Akses Produk</a>
                        <div class="footer">
                            <p>Butuh bantuan? Hubungi support kami.</p>
                            <p>© ${new Date().getFullYear()} ShadowOS. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        })

        if (error) {
            console.error('[EMAIL ERROR] Purchase confirmation failed:', error)
            return { success: false, error }
        }

        console.log('[EMAIL] Purchase confirmation sent:', data)
        return { success: true, data }
    } catch (error) {
        console.error('[EMAIL ERROR] Purchase confirmation exception:', error)
        return { success: false, error }
    }
}

/**
 * Send payout notification to creator when withdrawal is processed
 */
export async function sendPayoutNotification(email: string, payout: PayoutDetails) {
    // Mock for test emails
    if (isTestEmail(email)) {
        console.log(`[EMAIL MOCK] Payout notification to ${email}:`, payout)
        return { success: true, mocked: true }
    }

    const formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(payout.amount)

    const isApproved = payout.status === 'approved'
    const statusText = isApproved ? 'Disetujui ✅' : 'Ditolak ❌'
    const statusColor = isApproved ? '#22c55e' : '#ef4444'

    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `💸 Pencairan Dana ${statusText}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; }
                        .container { max-width: 600px; margin: 0 auto; background: #171717; border-radius: 16px; padding: 40px; }
                        .header { text-align: center; margin-bottom: 32px; }
                        .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
                        h1 { font-size: 24px; margin-bottom: 16px; }
                        p { color: #a3a3a3; line-height: 1.6; margin-bottom: 16px; }
                        .status-badge { display: inline-block; background: ${statusColor}20; color: ${statusColor}; padding: 8px 16px; border-radius: 8px; font-weight: 600; margin-bottom: 24px; }
                        .amount-box { background: #262626; border-radius: 12px; padding: 32px; margin: 24px 0; text-align: center; }
                        .amount { font-size: 36px; font-weight: 700; color: ${statusColor}; }
                        .button { display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-top: 24px; }
                        .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #525252; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">ShadowOS</div>
                        </div>
                        <h1>Pencairan Dana ${statusText}</h1>
                        <span class="status-badge">${payout.status.toUpperCase()}</span>
                        <div class="amount-box">
                            <p style="color: #737373; margin-bottom: 8px;">Jumlah</p>
                            <span class="amount">${formattedAmount}</span>
                        </div>
                        ${isApproved 
                            ? '<p>Dana akan segera ditransfer ke rekening yang terdaftar. Proses transfer biasanya membutuhkan 1-3 hari kerja.</p>'
                            : '<p>Maaf, permintaan pencairanmu tidak dapat diproses. Dana sudah dikembalikan ke wallet-mu. Silakan hubungi support untuk informasi lebih lanjut.</p>'
                        }
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">Lihat Dashboard</a>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} ShadowOS. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        })

        if (error) {
            console.error('[EMAIL ERROR] Payout notification failed:', error)
            return { success: false, error }
        }

        console.log('[EMAIL] Payout notification sent:', data)
        return { success: true, data }
    } catch (error) {
        console.error('[EMAIL ERROR] Payout notification exception:', error)
        return { success: false, error }
    }
}
