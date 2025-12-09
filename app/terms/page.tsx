import Link from "next/link"

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold mb-8 hover:opacity-80 transition">
                        <span className="text-orange-500 text-2xl">⚡</span>
                        <span>CUANBOSS</span>
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-neutral-400 text-sm">Last updated: December 2024</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-neutral max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            By accessing and using CUANBOSS ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            CUANBOSS is a digital business platform that enables users to sell digital products and services. We provide tools for product management, payment processing, and business analytics.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            All payments are processed securely through our payment partners. Sellers are responsible for complying with applicable tax laws and regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">5. Prohibited Activities</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            You may not use the Service for any illegal or unauthorized purpose. You must not transmit any malware, spam, or harmful content through the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            CUANBOSS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            If you have any questions about these Terms, please contact us at support@cuanboss.com.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-neutral-800">
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        ← Back to Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
