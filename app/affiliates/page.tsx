"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, Info, Plus, Search, Settings, MoreVertical, ArrowUpDown, CheckCircle2, Wallet, Users, Link as LinkIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function AffiliatesPage() {
    const [sellerVolume, setSellerVolume] = useState([250000])

    const calculateEarnings = (volume: number) => {
        return {
            monthly: volume * 0.04,
            yearly: volume * 0.04 * 12,
            tenYears: volume * 0.04 * 12 * 10
        }
    }

    const earnings = calculateEarnings(sellerVolume[0])

    return (
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto text-white h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Affiliates</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-[#333] bg-[#161616] text-neutral-400 hover:text-white hover:bg-[#222] h-9 text-xs font-medium">
                        Apply to be a partner
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-neutral-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="dashboard" className="w-full space-y-6">
                <TabsList className="bg-transparent border-b border-[#222] w-full justify-start h-auto p-0 rounded-none space-x-6">
                    <TabsTrigger
                        value="dashboard"
                        className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 text-sm font-medium text-neutral-400 shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-white hover:text-neutral-300"
                    >
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                        value="refer-buyers"
                        className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 text-sm font-medium text-neutral-400 shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-white hover:text-neutral-300"
                    >
                        Refer buyers
                    </TabsTrigger>
                    <TabsTrigger
                        value="refer-sellers"
                        className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 text-sm font-medium text-neutral-400 shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-white hover:text-neutral-300"
                    >
                        Refer sellers
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="space-y-6">
                    {/* Filters */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-9 text-xs font-medium justify-between min-w-[140px]">
                            All companies
                            <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                        <span className="text-sm text-neutral-500 px-1">in</span>
                        <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-9 text-xs font-medium justify-between min-w-[120px]">
                            Last 7 days
                            <ChevronDown className="h-3 w-3 opacity-50" />
                        </Button>
                        <Button variant="outline" className="border-[#333] bg-[#161616] text-neutral-400 hover:text-white hover:bg-[#222] h-9 text-xs font-medium gap-2">
                            <Calendar className="h-3 w-3" />
                            Nov 23 - 29, 2025
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Net commission */}
                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-5 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                                    Net commission <Info className="h-3 w-3" />
                                </div>
                                <div className="text-2xl font-bold text-white">Rp 0</div>
                            </div>
                            <div className="h-24 flex items-center justify-center">
                                <div className="text-xs font-medium text-neutral-600 bg-[#161616] px-3 py-1 rounded-full border border-[#222]">
                                    No data available
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 font-medium pt-2">
                                <span>Nov 23</span>
                                <span>Today</span>
                            </div>
                        </div>

                        {/* Refunds & disputes (Gross) */}
                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-5 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                                    Refunds & disputes (Gross) <Info className="h-3 w-3" />
                                </div>
                                <div className="text-2xl font-bold text-white">Rp 0</div>
                            </div>
                            <div className="h-24 flex items-center justify-center">
                                <div className="text-xs font-medium text-neutral-600 bg-[#161616] px-3 py-1 rounded-full border border-[#222]">
                                    No data available
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 font-medium pt-2">
                                <span>Nov 23</span>
                                <span>Today</span>
                            </div>
                        </div>

                        {/* Refunds & disputes (Counts) */}
                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-5 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                                    Refunds & disputes (Counts) <Info className="h-3 w-3" />
                                </div>
                                <div className="text-2xl font-bold text-white">0</div>
                            </div>
                            <div className="h-24 flex items-center justify-center">
                                <div className="text-xs font-medium text-neutral-600 bg-[#161616] px-3 py-1 rounded-full border border-[#222]">
                                    No data available
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 font-medium pt-2">
                                <span>Nov 23</span>
                                <span>Today</span>
                            </div>
                        </div>

                        {/* Users referred */}
                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-5 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                                    Users referred <Info className="h-3 w-3" />
                                </div>
                                <div className="text-2xl font-bold text-white">0</div>
                            </div>
                            <div className="h-24 flex items-center justify-center">
                                <div className="text-xs font-medium text-neutral-600 bg-[#161616] px-3 py-1 rounded-full border border-[#222]">
                                    No data available
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 font-medium pt-2">
                                <span>Nov 23</span>
                                <span>Today</span>
                            </div>
                        </div>

                        {/* Revenue produced */}
                        <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-5 space-y-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400">
                                    Revenue produced <Info className="h-3 w-3" />
                                </div>
                                <div className="text-2xl font-bold text-white">Rp 0</div>
                            </div>
                            <div className="h-24 flex items-center justify-center">
                                <div className="text-xs font-medium text-neutral-600 bg-[#161616] px-3 py-1 rounded-full border border-[#222]">
                                    No data available
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-neutral-600 font-medium pt-2">
                                <span>Nov 23</span>
                                <span>Today</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Section */}
                    <div className="pt-8 space-y-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-bold">All activity</h2>
                            <Button variant="outline" className="border-[#333] bg-[#161616] text-neutral-400 hover:text-white hover:bg-[#222] h-8 text-xs font-medium gap-2 rounded-full">
                                <Plus className="h-3 w-3" />
                                Transaction type
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="refer-buyers" className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold">Your affiliate programs</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                            <Input
                                placeholder="Search"
                                className="pl-10 bg-[#161616] border-[#333] text-white h-10 w-full focus-visible:ring-blue-600"
                            />
                        </div>

                        <div className="rounded-md border border-[#222] bg-[#0e0e0e] overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[#222] hover:bg-transparent bg-[#161616]">
                                        <TableHead className="text-neutral-500 h-10 font-medium text-xs">Company</TableHead>
                                        <TableHead className="text-neutral-500 h-10 font-medium text-xs">
                                            <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                Earnings <MoreVertical className="h-3 w-3 rotate-90" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-neutral-500 h-10 font-medium text-xs text-right">
                                            <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-neutral-300">
                                                Assets <MoreVertical className="h-3 w-3 rotate-90" />
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border-[#222] hover:bg-[#161616]">
                                        <TableCell className="font-medium text-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 rounded bg-blue-900/50 flex items-center justify-center text-[10px] font-bold text-blue-400 border border-blue-800">
                                                    EC
                                                </div>
                                                <span>Elevate Academy: Coaching & Courses</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-neutral-300">$0.00</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" className="h-7 text-xs border-[#333] bg-[#161616] text-neutral-300 hover:text-white hover:bg-[#222]">
                                                View assets
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="flex items-center justify-between px-4 py-3 border-t border-[#222] bg-[#0e0e0e]">
                                <span className="text-xs text-neutral-500">Showing 1 to 1 of 1</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-500" disabled>
                                        <ChevronDown className="h-4 w-4 rotate-90" />
                                    </Button>
                                    <div className="h-6 w-6 flex items-center justify-center bg-[#222] rounded text-xs text-white">1</div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-neutral-500" disabled>
                                        <ChevronDown className="h-4 w-4 -rotate-90" />
                                    </Button>
                                    <span className="text-xs text-neutral-500 ml-2">Show</span>
                                    <Button variant="outline" className="h-6 text-xs border-[#333] bg-[#161616] text-neutral-300 gap-1 px-2">
                                        10 <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="refer-sellers" className="space-y-12">
                    {/* Hero */}
                    <div className="text-center space-y-6 py-12">
                        <h1 className="text-5xl font-bold tracking-tight">Become a Whop partner</h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                            Become a Whop Partner, refer users, and make money whenever Whop makes money for the next 50 years.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 h-12 text-base rounded-lg">
                            Apply to be a partner
                        </Button>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="rounded-xl border border-[#222] bg-[#111] p-6 space-y-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-12 w-12 rounded-lg bg-[#161616] border border-[#333] flex items-center justify-center mb-4">
                                <LinkIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">1. Share your link</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    Share your referral link with your network or invite new users to your whop.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-[#222] bg-[#111] p-6 space-y-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-12 w-12 rounded-lg bg-[#161616] border border-[#333] flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">2. New user signs up</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    When people sign up to Whop with your link, they will be attributed to you.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-[#222] bg-[#111] p-6 space-y-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-12 w-12 rounded-lg bg-[#161616] border border-[#333] flex items-center justify-center mb-4">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">3. Get paid</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    Anytime Whop makes money from one of your referrals, you'll get paid for the next 50 years.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Calculator */}
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-center">How much will I make? A lot.</h2>

                        <div className="grid grid-cols-2 gap-8">
                            {/* Left: Type Selection */}
                            <div className="rounded-xl border border-[#222] bg-[#0e0e0e] overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-[#222] bg-[#161616]/50">
                                    <span className="text-sm text-neutral-400">Referral type</span>
                                    <span className="text-sm text-neutral-400">Your cut</span>
                                </div>
                                <div className="divide-y divide-[#222]">
                                    <div className="p-4 bg-blue-900/10 border-l-2 border-blue-600 flex items-center justify-between cursor-pointer">
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-blue-400">Whop seller volume</div>
                                            <div className="text-xs text-blue-400/70">Refer a seller and earn 4% of everything they make.</div>
                                        </div>
                                        <span className="text-sm font-bold text-blue-400">4% of volume</span>
                                    </div>
                                    <div className="p-4 hover:bg-[#161616] flex items-center justify-between cursor-pointer transition-colors opacity-50">
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium text-white">Whop purchases</div>
                                            <div className="text-xs text-neutral-400">Refer a user and earn 0.5% of all money they spend on Whop.</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-white">0.5% of</div>
                                            <div className="text-sm font-medium text-white">volume</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Calculator */}
                            <div className="rounded-xl border border-[#222] bg-[#0e0e0e] p-6 space-y-8">
                                <div className="space-y-6">
                                    <h3 className="font-medium">Whop seller volume referrals calculator</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white font-medium">Monthly Whop seller volume</span>
                                            <span className="text-white font-bold">Rp {sellerVolume[0].toLocaleString('id-ID')}</span>
                                        </div>
                                        <Slider
                                            defaultValue={[250000]}
                                            max={1000000}
                                            step={10000}
                                            value={sellerVolume}
                                            onValueChange={setSellerVolume}
                                            className="py-4"
                                        />
                                        <div className="flex justify-between text-xs text-neutral-500">
                                            <span>Rp 0</span>
                                            <span>Rp 15.000.000.000</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <h4 className="text-sm text-neutral-400">Your estimated earnings</h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="rounded-lg bg-[#161616] p-4 border border-[#222]">
                                                <div className="text-xs text-neutral-500 mb-1">Monthly</div>
                                                <div className="text-lg font-bold text-white">Rp {earnings.monthly.toLocaleString('id-ID')}</div>
                                            </div>
                                            <div className="rounded-lg bg-[#161616] p-4 border border-[#222]">
                                                <div className="text-xs text-neutral-500 mb-1">Yearly</div>
                                                <div className="text-lg font-bold text-white">Rp {earnings.yearly.toLocaleString('id-ID')}</div>
                                            </div>
                                            <div className="rounded-lg bg-[#161616] p-4 border border-[#222]">
                                                <div className="text-xs text-neutral-500 mb-1">10 years</div>
                                                <div className="text-lg font-bold text-white">Rp {earnings.tenYears.toLocaleString('id-ID')}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ / Info Cards */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="rounded-xl border border-[#222] bg-[#111] p-6 space-y-2">
                            <div className="flex items-center gap-2 text-yellow-500 mb-2">
                                <span className="text-lg">💰</span>
                                <h3 className="font-bold">Your whop earns money</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Every new user who joins your whop and didn't have a Whop account before is automatically counted as your referral.
                            </p>
                        </div>
                        <div className="rounded-xl border border-[#222] bg-[#111] p-6 space-y-2">
                            <div className="flex items-center gap-2 text-blue-400 mb-2">
                                <span className="text-lg">📖</span>
                                <h3 className="font-bold">Learn from the best</h3>
                            </div>
                            <p className="text-sm text-neutral-400">
                                If you're just getting started it's all good! Once accepted, you'll get access to a free community with top partners, educational resources, and best practices.
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
