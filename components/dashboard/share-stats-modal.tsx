"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Download, Share2, Loader2, TrendingUp, TrendingDown } from "lucide-react"
import html2canvas from "html2canvas"

interface ShareStatsModalProps {
    grossRevenue: string
    percentageChange?: string
    isPositive?: boolean
    businessName?: string
    totalOrders?: number
    winRate?: number
}

export function ShareStatsModal({
    grossRevenue = "$0.00",
    percentageChange = "+0.00%",
    isPositive = true,
    businessName = "Shadow Operator",
    totalOrders = 0,
    winRate = 100
}: ShareStatsModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!cardRef.current) return

        try {
            setIsGenerating(true)
            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                scale: 3, // Higher resolution for crisp images
                backgroundColor: null,
            })

            const image = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = `cuanboss-pnl-${Date.now()}.png`
            link.click()
            setIsOpen(false)
        } catch (error) {
            console.error("Error generating image:", error)
        } finally {
            setIsGenerating(false)
        }
    }

    // Get current date range
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const formatDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                    <Share2 className="mr-1.5 h-3 w-3" /> Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-[#0a0a0a] border-[#222] text-white p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg">Share your PnL</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center space-y-6 py-4">
                    {/* The Card to be captured - Binance Style */}
                    <div
                        ref={cardRef}
                        className="relative w-full max-w-[380px] overflow-hidden rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 50%, #0a0c10 100%)',
                        }}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Gradient orbs */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

                            {/* Decorative diamonds/shapes */}
                            <div className="absolute top-8 right-8 w-3 h-3 bg-emerald-400/60 rotate-45" />
                            <div className="absolute top-16 right-16 w-2 h-2 bg-emerald-400/40 rotate-45" />
                            <div className="absolute top-24 right-6 w-1.5 h-1.5 bg-emerald-400/30 rotate-45" />
                            <div className="absolute bottom-20 right-12 w-2 h-2 bg-cyan-400/40 rotate-45" />

                            {/* Grid pattern overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px'
                                }}
                            />
                        </div>

                        {/* Card Content */}
                        <div className="relative z-10 p-6 flex flex-col min-h-[420px]">
                            {/* Header - Logo */}
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                                    <span className="text-black font-black text-sm">C</span>
                                </div>
                                <div>
                                    <div className="font-bold text-lg tracking-tight text-white">CUANBOSS</div>
                                    <div className="text-[10px] text-neutral-400 tracking-widest">DIGITAL BUSINESS</div>
                                </div>
                            </div>

                            {/* Illustration Area - Abstract Figure */}
                            <div className="flex-1 flex items-center justify-center mb-6">
                                <div className="relative">
                                    {/* Abstract celebration graphic */}
                                    <div className="w-24 h-24 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {isPositive ? (
                                                <TrendingUp className="w-16 h-16 text-emerald-400" strokeWidth={1.5} />
                                            ) : (
                                                <TrendingDown className="w-16 h-16 text-red-400" strokeWidth={1.5} />
                                            )}
                                        </div>
                                        {/* Floating particles */}
                                        <div className="absolute -top-2 -left-4 w-2 h-2 bg-yellow-400/80 rotate-45" />
                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-orange-400/60 rotate-45" />
                                        <div className="absolute -bottom-2 left-2 w-1 h-1 bg-pink-400/60 rotate-45" />
                                        <div className="absolute bottom-4 -right-4 w-2 h-2 bg-emerald-400/60 rotate-45" />
                                    </div>
                                </div>
                            </div>

                            {/* Main Stats */}
                            <div className="text-center mb-6">
                                <div className="text-sm text-neutral-400 mb-1">Check out my Sales PnL on CuanBoss</div>
                                <div className="text-xs text-neutral-500 mb-4">Cumulative PNL %</div>

                                {/* Big Percentage */}
                                <div className={`text-5xl font-bold tracking-tight mb-4 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {percentageChange}
                                </div>

                                {/* Revenue and Orders Row */}
                                <div className="flex justify-center gap-8 mb-4">
                                    <div className="text-center">
                                        <div className="text-xs text-neutral-500 mb-1">Total Revenue</div>
                                        <div className="text-lg font-semibold text-white">{grossRevenue}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-neutral-500 mb-1">Success Rate</div>
                                        <div className="text-lg font-semibold text-white">{winRate.toFixed(2)}%</div>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="text-xs text-neutral-500">
                                    Period: {formatDate(startOfMonth)} - {formatDate(today)}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                                            <span className="text-black font-black text-[10px]">C</span>
                                        </div>
                                        <span className="text-sm font-semibold text-white">CUANBOSS</span>
                                        <span className="text-xs text-neutral-400">| IDR</span>
                                    </div>
                                    <div className="text-[10px] text-neutral-500 mt-0.5">Seller: {businessName}</div>
                                </div>

                                {/* cuanboss.com text */}
                                <div className="text-xs text-neutral-400 font-medium">
                                    cuanboss.com
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full max-w-[380px]">
                        <Button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold h-12"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Save Image
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
