import { createAdminClient } from '../lib/supabase/admin'



import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })


const products = [
    {
        title: 'Kelas Investasi Saham Pemula',
        description: 'Panduan lengkap belajar investasi saham dari nol. Pelajari analisis fundamental, teknikal, dan manajemen risiko untuk membangun portofolio jangka panjang yang sehat.',
        price: 350000,
        category: 'finance',
        image_url: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000',
        features: [
            'Modul Video Lengkap',
            'E-Book Analisis Saham',
            'Template Excel Portofolio',
            'Webinar Bulanan',
            'Komunitas Diskusi'
        ],
        faqs: [
            {
                question: 'Apakah cocok untuk pemula?',
                answer: 'Ya, materi disusun khusus untuk yang baru mulai belajar investasi.'
            }
        ],
        is_affiliate_enabled: true,
        affiliate_percentage: 20
    },
    {
        title: 'Bisnis Dropship 2025',
        description: 'Pelajari cara membangun bisnis e-commerce yang sustainable. Fokus pada branding, pelayanan pelanggan, dan kurasi produk berkualitas.',
        price: 750000,
        category: 'bisnis',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000',
        features: [
            'Panduan Branding Toko',
            'Daftar Supplier Terpercaya',
            'Template Customer Service',
            'Strategi Pemasaran Digital',
            'Grup Support'
        ],
        faqs: [
            {
                question: 'Apakah perlu stok barang?',
                answer: 'Tidak, kami mengajarkan model dropship yang aman dan efisien.'
            }
        ],
        is_affiliate_enabled: true,
        affiliate_percentage: 30
    },
    {
        title: 'Masterclass Video Editing Mobile',
        description: 'Tutorial editing video profesional menggunakan smartphone. Cocok untuk content creator yang ingin meningkatkan kualitas visual konten mereka.',
        price: 150000,
        category: 'creative',
        image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44b?auto=format&fit=crop&q=80&w=1000',
        features: [
            '30+ Modul Praktik',
            'Aset & Preset Gratis',
            'Teknik Color Grading',
            'Sound Design Basic',
            'Sertifikat Penyelesaian'
        ],
        faqs: [
            {
                question: 'Aplikasi apa yang digunakan?',
                answer: 'Fokus pada penggunaan aplikasi editing mobile populer seperti CapCut.'
            }
        ],
        is_affiliate_enabled: false,
        affiliate_percentage: null
    },
    {
        title: 'Panduan Karir Remote Work',
        description: 'Strategi mendapatkan pekerjaan remote di perusahaan global. Termasuk tips wawancara, negosiasi gaji, dan optimasi profil profesional.',
        price: 199000,
        category: 'karir',
        image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
        features: [
            'Template CV ATS-Friendly',
            'Email Cover Letter',
            'Database Job Board',
            'Panduan Interview Bahasa Inggris',
            'Review Profile'
        ],
        faqs: [
            {
                question: 'Apakah untuk fresh graduate?',
                answer: 'Bisa, banyak tips untuk entry-level juga.'
            }
        ],
        is_affiliate_enabled: true,
        affiliate_percentage: 25
    },
    {
        title: 'Starter Kit Developer Freelance',
        description: 'Kumpulan template dan panduan untuk memulai karir sebagai freelance developer. Manajemen proyek, kontrak kerja, dan template invoice.',
        price: 450000,
        category: 'teknologi',
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000',
        features: [
            'Template Kontrak Kerja',
            'Sistem Manajemen Proyek',
            'Template Invoice Profesional',
            'Panduan Negosiasi Klien',
            'Akses Update Materi'
        ],
        faqs: [
            {
                question: 'Apakah boleh dipakai komersial?',
                answer: 'Ya, template bebas digunakan untuk bisnis freelance Anda.'
            }
        ],
        is_affiliate_enabled: true,
        affiliate_percentage: 40
    }
]

async function run() {
    const supabase = createAdminClient()

    console.log('🔍 Finding creator and operator users...')
    // Try to find the demo user first for creator
    let { data: creator } = await supabase
        .from('users')
        .select('id')
        .eq('email', 'midtrans-demo@shadowos.com')
        .single()

    // If not found, get ANY creator
    if (!creator) {
        const { data: anyCreator } = await supabase
            .from('users')
            .select('id')
            .eq('role', 'creator')
            .limit(1)
            .single()
        creator = anyCreator
    }

    // Find an operator
    const { data: operator } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'operator')
        .limit(1)
        .single()

    if (!creator || !operator) {
        console.error('❌ Missing creator or operator user. Please ensure users exist.')
        process.exit(1)
    }

    console.log(`👤 Creator: ${creator.id} | Operator: ${operator.id}`)

    console.log('📦 Seeding products...')

    for (const product of products) {
        const { error } = await supabase.from('products').insert({
            ...product,
            creator_id: creator.id,
            operator_id: operator.id,
            split_percentage_creator: 70,
            split_percentage_operator: 30
        })

        if (error) {
            console.error(`❌ Failed to create ${product.title}:`, error.message)
        } else {
            console.log(`✅ Created: ${product.title}`)
        }
    }

    console.log('🎉 Done!')
}

run()
