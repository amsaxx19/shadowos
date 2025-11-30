"use client"

import { Button } from "@/components/ui/button"
import { Copy, Instagram, Twitter, Youtube, PenLine, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MyStorePage() {
    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto text-white h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Store page</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-500">whop.com/elevate-academy-coaching-courses-3103</span>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Copy link
                    </Button>
                </div>
            </div>

            <div className="flex gap-8 flex-1 min-h-0">
                {/* Main Content: Phone Mockup */}
                <div className="flex-1 rounded-2xl border border-[#222] bg-[#0e0e0e] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                    <div className="text-center space-y-4 mb-12 relative z-10">
                        <h2 className="text-xl font-bold">Build your store page</h2>
                        <p className="text-neutral-400">Launch a high-converting store page in seconds.</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8">
                            <PenLine className="mr-2 h-4 w-4" />
                            Edit store page
                        </Button>
                    </div>

                    {/* Phone Mockup */}
                    <div className="relative z-10 w-[300px] h-[600px] rounded-[3rem] border-8 border-[#222] bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#222] rounded-b-xl z-20" />

                        {/* Phone Content */}
                        <div className="h-full w-full overflow-y-auto bg-black text-white pt-12 px-4 pb-4 space-y-6 scrollbar-hide">
                            {/* Store Header */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-[#222] flex items-center justify-center border border-[#333] text-xs font-bold text-blue-500">
                                    EC
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xs font-medium text-neutral-400">Elevate Academy:</div>
                                    <div className="text-sm font-bold">Coaching & Courses</div>
                                </div>
                            </div>

                            {/* Hero Section */}
                            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
                                <div className="text-center z-10 px-4">
                                    <h3 className="text-[10px] font-bold text-white/80">Elevate Academy: Coaching & Courses</h3>
                                </div>
                            </div>

                            {/* Product Card */}
                            <div className="rounded-xl bg-[#111] border border-[#222] p-3 space-y-3">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-blue-500 border border-[#333]">
                                        EC
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">Elevate Clipping Mastery</div>
                                        <div className="text-[10px] text-neutral-400 leading-tight mt-1">
                                            Clipping Mastery for Barbers: Sharpen Your Fades, Speed, and Style
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="text-sm font-bold text-blue-400">$100</div>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs font-medium rounded-lg">
                                    Join
                                </Button>
                            </div>

                            {/* Footer Branding */}
                            <div className="text-center text-[10px] text-neutral-600 pt-4">
                                Powered by Whop
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Link in Bio */}
                <div className="w-[350px] space-y-6">
                    <div className="rounded-2xl border border-[#222] bg-[#161616] p-8 text-center space-y-6">
                        {/* Social Icons Circle */}
                        <div className="relative h-32 w-32 mx-auto">
                            <div className="absolute inset-0 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
                                <div className="grid grid-cols-2 gap-2 p-4">
                                    <Instagram className="h-6 w-6 text-pink-500" />
                                    <Twitter className="h-6 w-6 text-black" />
                                    <Youtube className="h-6 w-6 text-red-500" />
                                    <div className="h-6 w-6 bg-black rounded flex items-center justify-center text-white text-[8px] font-bold">Tk</div>
                                </div>
                            </div>
                            {/* Decorative blurred circles behind */}
                            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-blue-500/20 blur-xl" />
                            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-purple-500/20 blur-xl" />
                        </div>

                        <div className="space-y-4 text-left">
                            <h3 className="text-lg font-bold text-white">Add your link in bio</h3>
                            <div className="space-y-4 text-sm text-neutral-400">
                                <div className="flex gap-3">
                                    <span className="text-neutral-600">1.</span>
                                    <span>Copy your store link above</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-neutral-600">2.</span>
                                    <span>Open your social media profile</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-neutral-600">3.</span>
                                    <span>Paste your link to get customers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
