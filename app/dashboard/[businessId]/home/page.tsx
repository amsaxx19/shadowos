"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, GraduationCap, LayoutGrid, Plus, Settings, X, ExternalLink, Info, Bell } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"

export default function OperatorDashboard() {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto font-sans">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Today</h1>
                <div className="flex items-center gap-3">
                    <Button className="bg-[#2a2a2a] text-[#FFD700] hover:bg-[#333] border border-[#333] font-medium">
                        <div className="bg-[#FFD700]/20 p-0.5 rounded mr-2">
                            <LayoutGrid className="h-3 w-3 text-[#FFD700]" />
                        </div>
                        Add apps
                    </Button>
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <Bell className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Top Section: Graph & Balance */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Left: Gross Revenue Graph (Span 2) */}
                <Card className="md:col-span-2 border-[#222] bg-[#111] shadow-none relative overflow-hidden">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b border-[#222]/50">
                        <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-medium text-neutral-500">Gross revenue</CardTitle>
                                <div className="text-2xl font-bold text-white tracking-tight">--</div>
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-medium text-neutral-500">Yesterday</CardTitle>
                                <div className="text-2xl font-bold text-white tracking-tight">--</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="h-[300px] w-full relative flex flex-col">
                            {/* Chart Area with Grid Lines */}
                            <div className="flex-1 relative flex items-center justify-center">
                                {/* Vertical Grid Lines */}
                                <div className="absolute inset-0 flex justify-between px-4 pointer-events-none opacity-10">
                                    {[...Array(12)].map((_, i) => (
                                        <div key={i} className="h-full w-px bg-neutral-500" />
                                    ))}
                                </div>

                                {/* "No data available" Badge */}
                                <div className="z-10 bg-[#1a1a1a] px-3 py-1.5 rounded-md text-xs font-medium text-neutral-400 border border-[#333]">
                                    No data available
                                </div>
                            </div>

                            {/* Time Labels */}
                            <div className="flex justify-between px-6 py-3 text-[10px] text-neutral-600 border-t border-[#222]">
                                <span>11:36 AM</span>
                                <span>12:00 AM</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Balance & Payouts */}
                <div className="space-y-4">
                    <Card className="border-[#222] bg-[#111] shadow-none h-[160px] flex flex-col justify-between p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-neutral-500">Balance</span>
                                <div className="text-3xl font-bold text-white tracking-tight">$0.00</div>
                                <div className="text-sm text-neutral-600">$0.00 pending</div>
                            </div>
                            <span className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-400">View</span>
                        </div>
                    </Card>

                    <Card className="border-[#222] bg-[#111] shadow-none h-[120px] flex flex-col justify-between p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <span className="text-sm font-medium text-neutral-500">Payouts</span>
                                <div className="text-2xl font-bold text-white tracking-tight">--</div>
                            </div>
                            <span className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-400">View</span>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Middle Banner */}
            <div className="rounded-xl border border-[#222] bg-[#111] p-4 flex items-center justify-between group cursor-pointer hover:border-[#333] transition-colors">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                        Join Whop University and start your path to your first $10K.
                    </span>
                </div>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white h-8 w-8">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Bottom Section: Stats */}
            <div className="space-y-6">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-white">Stats</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            Last 7 days
                            <ChevronDown className="ml-2 h-3 w-3 text-neutral-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            Nov 26 - Dec 2, 2025
                        </Button>
                        <span className="text-xs text-neutral-500 px-1">compared to</span>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            Previous period
                            <ChevronDown className="ml-2 h-3 w-3 text-neutral-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            Daily
                            <ChevronDown className="ml-2 h-3 w-3 text-neutral-500" />
                        </Button>
                        <span className="text-xs text-neutral-500 px-1">on</span>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            All products
                            <ChevronDown className="ml-2 h-3 w-3 text-neutral-500" />
                        </Button>
                        <div className="w-px h-5 bg-[#333] mx-2 hidden xl:block" />
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            <Plus className="mr-1.5 h-3 w-3" /> Add
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#111] text-white hover:bg-[#222] h-9 text-xs font-medium px-3">
                            <Settings className="mr-1.5 h-3 w-3" /> Edit
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-[#222] bg-[#111] shadow-none h-[200px] flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-sm font-medium text-neutral-400">Gross revenue</CardTitle>
                                <Info className="h-3 w-3 text-neutral-600" />
                            </div>
                            <ExternalLink className="h-3 w-3 text-neutral-600" />
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <div className="text-3xl font-bold text-white tracking-tight">$0.00</div>
                            <div className="flex items-center justify-center flex-1">
                                <div className="bg-[#1a1a1a] px-3 py-1.5 rounded-md text-xs font-medium text-neutral-400 border border-[#333]">
                                    No data available
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-[#222] bg-[#111] shadow-none h-[200px] flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-sm font-medium text-neutral-400">Net revenue</CardTitle>
                                <Info className="h-3 w-3 text-neutral-600" />
                            </div>
                            <ExternalLink className="h-3 w-3 text-neutral-600" />
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                            <div className="text-3xl font-bold text-white tracking-tight">$0.00</div>
                            <div className="flex items-center justify-center flex-1">
                                <div className="bg-[#1a1a1a] px-3 py-1.5 rounded-md text-xs font-medium text-neutral-400 border border-[#333]">
                                    No data available
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
