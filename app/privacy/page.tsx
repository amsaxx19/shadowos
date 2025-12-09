import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold mb-8 hover:opacity-80 transition">
                        <span className="text-orange-500 text-2xl">⚡</span>
                        <span>CUANBOSS</span>
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-neutral-400 text-sm">Last updated: December 2024</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-neutral max-w-none space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, and payment information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices, and respond to your comments and questions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We do not share your personal information with third parties except as described in this policy. We may share information with vendors and service providers who need access to perform services for us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no security system is impenetrable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">5. Cookies</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We use cookies and similar technologies to collect information about your browsing activities and to personalize your experience on our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            You may access, update, or delete your account information at any time by logging into your account settings. You may also contact us to request access to or deletion of your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at privacy@cuanboss.com.
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
