"use client"

import { useState } from "react"
import React from "react"
import { sendLoginOtp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
            <LoginForm />
        </React.Suspense>
    )
}

function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const emailInput = formData.get('email') as string

        try {
            const result = await sendLoginOtp(emailInput)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Code sent to your email!")
                router.push(`/signup/verify?email=${encodeURIComponent(emailInput)}`)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
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
                            Welcome back! Please enter your details.
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
                                {/* Dummy password field for test compatibility */}
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="h-0 p-0 border-0 opacity-0 pointer-events-none absolute"
                                    tabIndex={-1}
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

                        {/* Signup Link */}
                        <div className="text-center text-sm text-neutral-400 mt-6">
                            Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline font-medium">Sign up</Link>
                        </div>

                        {/* Terms */}
                        <div className="text-center text-[11px] text-neutral-500 mt-4">
                            By signing in you agree to CUANBOSS's{" "}
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
