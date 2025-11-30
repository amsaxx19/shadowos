"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, ChevronDown, Download, CreditCard, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function CreateInvoicePage() {
    const [activePreview, setActivePreview] = useState("email")
    const [price, setPrice] = useState("100")

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Left Column: Form */}
            <div className="w-[600px] flex flex-col border-r border-[#222] bg-[#0e0e0e]">
                {/* Header */}
                <div className="h-14 flex items-center px-4 border-b border-[#222] gap-4">
                    <Link href="/dashboard/invoices" className="text-neutral-400 hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <span>Invoices</span>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white font-medium">Create invoice</span>
                    </div>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Customer */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Customer</label>
                        <Input
                            placeholder="Find or add a customer"
                            className="bg-[#161616] border-[#333] text-white placeholder:text-neutral-600 focus-visible:ring-blue-600"
                        />
                    </div>

                    {/* Product */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Product</label>
                        <Select defaultValue="clipping">
                            <SelectTrigger className="bg-[#161616] border-[#333] text-white">
                                <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161616] border-[#333] text-white">
                                <SelectItem value="clipping">Elevate Clipping Mastery</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Collection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Payment collection</label>
                        <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Due date</div>
                        <div className="flex gap-2">
                            <Select defaultValue="7days">
                                <SelectTrigger className="bg-[#161616] border-[#333] text-white flex-1">
                                    <SelectValue placeholder="Due date" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-[#333] text-white">
                                    <SelectItem value="7days">Due in 7 days</SelectItem>
                                    <SelectItem value="14days">Due in 14 days</SelectItem>
                                    <SelectItem value="30days">Due in 30 days</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="bg-[#161616] border border-[#333] rounded-md px-3 flex items-center text-sm text-neutral-400 w-[120px] justify-center">
                                12/6/2025
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-neutral-300">Description</label>
                        <div className="relative">
                            <Textarea
                                placeholder="Invoice for September coaching call"
                                className="bg-[#161616] border-[#333] text-white min-h-[100px] resize-none focus-visible:ring-blue-600"
                            />
                            <div className="absolute bottom-2 right-2 text-[10px] text-neutral-600">0 / 500</div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                        <Tabs defaultValue="one-time" className="w-full">
                            <TabsList className="w-full bg-[#161616] border border-[#333] p-1 h-auto">
                                <TabsTrigger value="one-time" className="flex-1 data-[state=active]:bg-[#333] data-[state=active]:text-white text-neutral-400 text-xs py-1.5 h-8">One-time</TabsTrigger>
                                <TabsTrigger value="recurring" className="flex-1 data-[state=active]:bg-[#333] data-[state=active]:text-white text-neutral-400 text-xs py-1.5 h-8">Recurring</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</div>
                                <Input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="bg-[#161616] border-[#333] text-white pl-7 focus-visible:ring-blue-600"
                                />
                            </div>
                            <Select defaultValue="idr">
                                <SelectTrigger className="w-[80px] bg-[#161616] border-[#333] text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-[#333] text-white">
                                    <SelectItem value="idr">IDR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">
                            {["50", "100", "250"].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setPrice(val)}
                                    className="px-3 py-1 rounded bg-[#161616] border border-[#333] text-xs text-neutral-400 hover:text-white hover:bg-[#222] transition-colors"
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="space-y-0 border-t border-[#222] pt-4">
                        <button className="w-full flex items-center justify-between py-3 text-sm font-medium text-neutral-300 hover:text-white">
                            <span>Advanced options</span>
                            <ChevronRight className="h-4 w-4 text-neutral-500" />
                        </button>
                        <button className="w-full flex items-center justify-between py-3 text-sm font-medium text-neutral-300 hover:text-white border-t border-[#222]">
                            <span>Payment methods</span>
                            <ChevronRight className="h-4 w-4 text-neutral-500" />
                        </button>
                    </div>

                    {/* Footer Options */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center text-white">
                                <CheckCircle2 className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-neutral-300">Pass payment processing fees on to customer</span>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="p-4 border-t border-[#222] bg-[#0e0e0e]">
                    <Button className="w-full bg-[#222] hover:bg-[#333] text-neutral-400 font-medium justify-between px-4 border border-[#333]">
                        <span></span>
                        <span>Send invoice</span>
                        <span></span>
                    </Button>
                </div>
            </div>

            {/* Right Column: Preview */}
            <div className="flex-1 bg-black flex flex-col items-center justify-center p-8 relative">
                {/* Preview Toggle */}
                <div className="absolute top-8 bg-[#161616] rounded-lg p-1 flex border border-[#222]">
                    <button
                        onClick={() => setActivePreview("email")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                            activePreview === "email" ? "bg-[#333] text-white" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        Email preview
                    </button>
                    <button
                        onClick={() => setActivePreview("checkout")}
                        className={cn(
                            "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                            activePreview === "checkout" ? "bg-[#333] text-white" : "text-neutral-500 hover:text-neutral-300"
                        )}
                    >
                        Checkout link preview
                    </button>
                </div>

                {activePreview === "email" ? (
                    /* Email Preview */
                    <div className="w-[400px] space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-400 border border-blue-800">
                                EC
                            </div>
                            <span className="text-sm font-medium text-white">Elevate Academy: Coaching & Courses</span>
                        </div>

                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-6 space-y-6">
                            <div className="space-y-1">
                                <div className="text-4xl font-bold text-white">${Number(price).toFixed(2)}</div>
                                <div className="text-sm text-neutral-500">Due December 6, 2025</div>
                            </div>

                            <Button variant="outline" className="w-fit h-8 text-xs border-[#333] bg-[#161616] text-neutral-400 hover:text-white">
                                <Download className="mr-2 h-3 w-3" />
                                Download invoice
                            </Button>

                            <div className="space-y-1">
                                <div className="text-xs text-neutral-500">Invoice number</div>
                                <div className="text-sm font-medium text-white">#00000001</div>
                            </div>

                            <Button className="w-full bg-[#161616] hover:bg-[#222] text-neutral-400 border border-[#333] h-10">
                                Pay now
                            </Button>
                        </div>

                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-6 space-y-4">
                            <div className="text-xs text-neutral-500">November 29, 2025</div>

                            <div className="flex justify-between text-sm">
                                <span className="text-white">Elevate Clipping Mastery</span>
                                <span className="text-white">${Number(price).toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-white">Service fee</span>
                                <span className="text-white">$5.00</span>
                            </div>

                            <div className="border-t border-[#222] pt-4 flex justify-between text-sm font-medium">
                                <span className="text-white">Total</span>
                                <span className="text-white">${(Number(price) + 5).toFixed(2)}</span>
                            </div>

                            <div className="text-xs text-neutral-600 pt-4">
                                If you need any help, please reach out to support <span className="text-blue-500 underline">here</span>.
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Checkout Link Preview (Phone) */
                    <div className="relative w-[300px] h-[600px] rounded-[3rem] border-8 border-[#222] bg-black overflow-hidden shadow-2xl ring-1 ring-white/10 animate-in fade-in duration-300">
                        {/* Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#222] rounded-b-xl z-20" />

                        <div className="h-full w-full overflow-y-auto bg-[#0e0e0e] text-white pt-12 px-6 pb-6 space-y-6 scrollbar-hide">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 rounded bg-blue-900/30 flex items-center justify-center text-xs font-bold text-blue-400 border border-blue-800">
                                    EC
                                </div>
                                <span className="text-sm font-bold">Elevate Clipping M...</span>
                            </div>

                            <div className="text-xs text-neutral-400 leading-relaxed">
                                Clipping Mastery for Barbers: Sharpen Your Fades, Speed, and Style
                            </div>

                            <div className="rounded-lg bg-[#161616] border border-[#222] p-4 text-center">
                                <div className="text-2xl font-bold text-white">${Number(price).toFixed(2)}</div>
                                <div className="text-xs text-neutral-500">One-time</div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-white">Due date</div>
                                    <div className="text-xs text-neutral-400">December 6, 2025</div>
                                </div>
                                <div className="h-px bg-[#222]" />
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-white">Description</div>
                                    <div className="text-xs text-neutral-400">Description</div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <div className="text-xs font-bold text-white">Email</div>
                                <Input
                                    value="johnappleseed@gmail.com"
                                    readOnly
                                    className="bg-[#161616] border-[#333] text-neutral-400 text-xs h-9"
                                />
                            </div>

                            <div className="rounded-lg border border-[#333] bg-[#161616] p-3 flex items-center gap-3 mt-auto">
                                <div className="h-4 w-4 rounded-full border border-blue-500 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                </div>
                                <CreditCard className="h-4 w-4 text-white" />
                                <span className="text-xs font-medium text-white">Card</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
