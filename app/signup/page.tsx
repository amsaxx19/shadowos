"use client"

import { useState } from "react"
import React from "react"
import { sendOtp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

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
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Form Card - Dark Theme */}
            <div className="w-full max-w-[380px] bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl relative z-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <span className="text-orange-500 text-5xl">⚡</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-white mb-8">
                    Create your account
                </h1>

                {/* Email Form */}
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-neutral-400 text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="johnappleseed@gmail.com"
                            required
                            className="bg-[#1a1a1a] border-[#333] text-white placeholder:text-neutral-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-11 rounded-lg text-sm px-4 autofill:bg-[#1a1a1a] autofill:text-white [&:-webkit-autofill]:bg-[#1a1a1a] [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11 rounded-lg text-sm transition-colors"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                    </Button>
                </form>

                {/* Login Link */}
                <div className="text-center text-sm text-neutral-400 mt-6">
                    Already have an account? <Link href="/login" className="text-blue-500 hover:underline font-medium">Sign in</Link>
                </div>

                {/* Terms */}
                <div className="text-center text-[11px] text-neutral-500 mt-4 leading-relaxed">
                    By creating an account you agree to CUANBOSS's{" "}
                    <Link href="#" className="underline hover:text-neutral-400">Terms of Service</Link> and{" "}
                    <Link href="#" className="underline hover:text-neutral-400">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    )
}
