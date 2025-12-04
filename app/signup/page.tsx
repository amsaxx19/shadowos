"use client"

import { useState } from "react"
import React from "react"
import { sendOtp, verifyOtp } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp"
import { useRouter, useSearchParams } from "next/navigation"
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
    const searchParams = useSearchParams()
    const router = useRouter()

    const step = searchParams.get('step') === 'otp' ? 'otp' : 'email'
    const emailParam = searchParams.get('email') || ""

    const [isLoading, setIsLoading] = useState(false)

    const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const emailInput = formData.get('email') as string

        try {
            const result = await sendOtp(emailInput)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Code sent to your email!")
                router.push(`/signup?step=otp&email=${encodeURIComponent(emailInput)}`)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyOtp = async (token: string) => {
        if (token.length !== 6) return

        setIsLoading(true)
        const result = await verifyOtp(emailParam, token)
        setIsLoading(false)

        if (result.error) {
            toast.error(result.error)
        } else if (result.success && result.redirectUrl) {
            toast.success("Welcome to CUANBOSS!")
            router.push(result.redirectUrl)
        }
    }

    return (
        <div className="min-h-screen bg-[#111] flex flex-col md:flex-row text-white font-sans">
            {/* Left Side - Brand & Hero */}
            <div className="hidden md:flex md:w-1/2 lg:w-2/3 bg-[#0a0a0a] relative flex-col justify-between p-12 overflow-hidden">
                 {/* Background Pattern similar to Whop's abstract lines */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
                         <path d="M0 100 C 30 10 60 10 100 100 Z" fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth="0.5" />
                         <path d="M0 100 C 40 20 70 20 100 100 Z" fill="none" stroke="rgba(236,72,153,0.3)" strokeWidth="0.5" />
                    </svg>
                </div>
                
                 {/* Whop-like Hero Image Placeholder */}
                 <div className="relative z-10 flex-1 flex items-center justify-center">
                    <div className="relative w-[500px] h-[400px]">
                         {/*  Ideally this would be the actual illustration from the user's screenshot, but we'll build a CSS version */}
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md text-center">
                             <h1 className="text-5xl font-bold mb-4 tracking-tight">Where the internet <br/> does business</h1>
                         </div>
                         
                         {/* Abstract Building Blocks (CSS Art to mimic the screenshot) */}
                         <div className="absolute top-10 left-1/2 -translate-x-1/2">
                             <div className="relative w-64 h-64">
                                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-40 bg-orange-500 rounded-t-xl transform skew-x-6 z-20 border-4 border-black flex items-center justify-center">
                                    <span className="text-4xl font-black text-white">⚡</span>
                                 </div>
                                 <div className="absolute bottom-0 left-4 w-24 h-56 bg-blue-400 rounded-t-lg -rotate-6 z-10 border-4 border-black"></div>
                                 <div className="absolute bottom-0 right-4 w-24 h-48 bg-red-400 rounded-t-lg rotate-6 z-10 border-4 border-black"></div>
                                 <div className="absolute bottom-10 left-0 w-16 h-32 bg-yellow-300 rounded-lg -rotate-12 z-0 border-4 border-black"></div>
                                 <div className="absolute bottom-10 right-0 w-16 h-32 bg-green-300 rounded-lg rotate-12 z-0 border-4 border-black"></div>
                             </div>
                         </div>
                    </div>
                 </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full md:w-1/2 lg:w-1/3 bg-[#111] flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[420px] space-y-8">
                    
                    {/* Mobile Logo */}
                    <div className="md:hidden flex justify-center mb-8">
                         <span className="text-blue-500 text-4xl font-bold">⚡ CUANBOSS</span>
                    </div>

                    {step === 'email' ? (
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-3xl p-8 shadow-2xl">
                            <div className="flex justify-center mb-6">
                                <div className="flex items-center gap-2 text-xl font-bold">
                                    <span className="text-orange-500">⚡</span> Whop
                                </div>
                            </div>
                            
                            <div className="text-center mb-8">
                                <h2 className="text-neutral-400 text-lg font-medium">
                                    Create an account or log in to discover whops and find ways to make money.
                                </h2>
                            </div>

                            <form onSubmit={handleSendOtp} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-neutral-500 text-sm">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="johnappleseed@gmail.com"
                                        defaultValue={emailParam}
                                        required
                                        className="bg-[#111] border-[#333] text-white placeholder:text-neutral-600 focus:border-blue-600 focus:ring-0 h-12 rounded-xl text-lg px-4"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-lg transition-all shadow-[0_4px_0_rgb(29,78,216)] hover:shadow-[0_2px_0_rgb(29,78,216)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Continue"}
                                </Button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#333]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#1a1a1a] px-2 text-neutral-500">OR</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <Button variant="outline" className="bg-white hover:bg-neutral-200 text-black border-none h-12 rounded-xl" onClick={() => toast.info("Google Login Coming Soon!")}>
                                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </Button>
                                <Button variant="outline" className="bg-white hover:bg-neutral-200 text-black border-none h-12 rounded-xl" onClick={() => toast.info("Apple Login Coming Soon!")}>
                                     <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 3.87-.75c1.29.24 2.23.85 2.84 1.71-2.68 1.57-2.16 5.21.41 6.12-.71 1.97-1.75 3.95-2.2 5.15zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                </Button>
                                <Button variant="outline" className="bg-[#5865F2] hover:bg-[#4752C4] text-white border-none h-12 rounded-xl" onClick={() => toast.info("Discord Login Coming Soon!")}>
                                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.42-2.157 2.42z" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="text-center text-sm text-neutral-500 mt-8">
                                Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline font-medium">Sign up</Link>
                            </div>

                            <div className="text-center text-[10px] text-neutral-600 mt-4 max-w-xs mx-auto">
                                By signing in you agree to Whop's <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-3xl p-8 shadow-2xl">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                                        <span className="text-3xl">📧</span>
                                    </div>
                                </div>
                                <h2 className="text-white text-2xl font-bold mb-2">Check your email</h2>
                                <p className="text-neutral-400">
                                    We sent a verification code to <br/> <span className="text-white font-medium">{emailParam}</span>
                                </p>
                            </div>

                            <div className="flex justify-center mb-8">
                                <InputOTP
                                    maxLength={6}
                                    value={""}
                                    onChange={(value: string) => {
                                        if (value.length === 6) handleVerifyOtp(value)
                                    }}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="h-12 w-12 bg-[#111] border-[#333]" />
                                        <InputOTPSlot index={1} className="h-12 w-12 bg-[#111] border-[#333]" />
                                        <InputOTPSlot index={2} className="h-12 w-12 bg-[#111] border-[#333]" />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="h-12 w-12 bg-[#111] border-[#333]" />
                                        <InputOTPSlot index={4} className="h-12 w-12 bg-[#111] border-[#333]" />
                                        <InputOTPSlot index={5} className="h-12 w-12 bg-[#111] border-[#333]" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            {isLoading && <div className="flex justify-center mb-4"><Loader2 className="animate-spin text-blue-500" /></div>}

                            <div className="text-center">
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="text-neutral-500 hover:text-white text-sm font-medium flex items-center gap-2 mx-auto transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Use a different email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
