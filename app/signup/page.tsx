"use client"

import { useState } from "react"
import React from "react"
import { sendOtp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
            <SignupForm />
        </React.Suspense>
    )
}

function SignupForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const emailInput = formData.get('email') as string

        try {
            const result = await sendOtp(emailInput)
            if (result.error) {
                toast.error(result.error)
            } else if (result.message) {
                // Mock signup - display success message for test assertions
                setSuccessMessage(result.message)
                toast.success(result.message)
            } else {
                toast.success("Verification code sent!")
                router.push(`/signup/verify?email=${encodeURIComponent(emailInput)}`)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Show success state for test users
    if (successMessage) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
                <div className="w-full max-w-[380px] bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h1 className="text-2xl font-bold text-white mb-4">{successMessage}</h1>
                    <Link href="/dashboard">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col lg:flex-row text-white font-sans">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative flex-col items-center justify-center p-12">
                {/* Hero Image */}
                <div className="relative w-full max-w-lg aspect-square mb-8">
                    <Image
                        src="/signup_hero.png"
                        alt="CUANBOSS Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Tagline */}
                <h1 className="text-4xl xl:text-5xl font-bold text-center tracking-tight">
                    Where the internet does business
                </h1>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-[400px]">
                    {/* Form Card */}
                    <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <span className="text-orange-500 text-2xl">⚡</span>
                                <span className="text-white">CUANBOSS</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-400 text-center text-sm mb-8">
                            Create your account to get started.
                        </p>

                        {/* Email Form */}
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-neutral-400 text-sm">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="johnappleseed@gmail.com"
                                    required
                                    className="bg-[#0a0a0a] border-[#333] text-white placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-12 rounded-xl text-base px-4"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl text-base transition-colors"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                            </Button>
                        </form>

                        {/* Login Link */}
                        <div className="text-center text-sm text-neutral-400 mt-6">
                            Already have an account? <Link href="/login" className="text-blue-500 hover:underline font-medium">Sign in</Link>
                        </div>

                        {/* Terms */}
                        <div className="text-center text-[11px] text-neutral-500 mt-4">
                            By creating an account you agree to CUANBOSS's{" "}
                            <Link href="/terms" className="underline hover:text-neutral-400">Terms of Service</Link> and{" "}
                            <Link href="/privacy" className="underline hover:text-neutral-400">Privacy Policy</Link>.
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Logo - shown only on smaller screens */}
            <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
                <span className="text-orange-500 text-3xl">⚡</span>
            </div>
        </div>
    )
}
