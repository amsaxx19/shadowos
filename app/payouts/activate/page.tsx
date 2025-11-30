"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Calendar } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ActivatePayoutsPage() {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-[300px] border-r border-[#222] bg-[#0e0e0e] flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-[#222]">
                    <Link href="/dashboard/payouts" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                        <span className="text-sm font-medium">Activate payouts</span>
                    </Link>
                </div>

                <div className="p-6 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="relative mt-1">
                                <div className="h-4 w-4 rounded-full border-2 border-blue-600 bg-black z-10 relative" />
                                <div className="absolute top-4 left-1.5 w-0.5 h-8 bg-[#222] -z-0" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Tell us about yourself</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 opacity-40">
                            <div className="relative mt-1">
                                <div className="h-4 w-4 rounded-full border-2 border-neutral-700 bg-black z-10 relative" />
                                <div className="absolute top-4 left-1.5 w-0.5 h-8 bg-[#222] -z-0" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Get verified</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 opacity-40">
                            <div className="relative mt-1">
                                <div className="h-4 w-4 rounded-full border-2 border-neutral-700 bg-black z-10 relative" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Additional information</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-[#222]">
                    <div className="text-xs text-neutral-500">
                        Need help? <span className="text-blue-500 cursor-pointer hover:underline">Contact our help team</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-2xl mx-auto py-12 px-8 space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Tell us about yourself</h1>
                            <p className="text-neutral-400">Add your name, business type, and address to get started</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-300">First name</label>
                                    <Input
                                        placeholder="John"
                                        className="bg-[#161616] border-[#333] text-white h-10 focus-visible:ring-blue-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-300">Last name</label>
                                    <Input
                                        placeholder="Smith"
                                        className="bg-[#161616] border-[#333] text-white h-10 focus-visible:ring-blue-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300">Business type</label>
                                <Select defaultValue="individual">
                                    <SelectTrigger className="bg-[#161616] border-[#333] text-white h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161616] border-[#333] text-white">
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="company">Company</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300">Date of birth</label>
                                <div className="relative">
                                    <Input
                                        placeholder="mm / dd / yyyy"
                                        className="bg-[#161616] border-[#333] text-white h-10 focus-visible:ring-blue-600 pr-10"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300">Country</label>
                                <Select>
                                    <SelectTrigger className="bg-[#161616] border-[#333] text-white h-10">
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161616] border-[#333] text-white max-h-[300px]">
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="id">Indonesia</SelectItem>
                                        <SelectItem value="sg">Singapore</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-neutral-300">Address line 1</label>
                                <Input
                                    placeholder="123 Main St"
                                    className="bg-[#161616] border-[#333] text-white h-10 focus-visible:ring-blue-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="h-20 border-t border-[#222] bg-[#0e0e0e] flex items-center justify-end px-8">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8">
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}
