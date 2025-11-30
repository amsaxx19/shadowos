"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Plus, Settings } from "lucide-react"
// import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from "recharts"
import { StatCard } from "@/components/dashboard/stat-card"

// Mock Data for Graph
const data = [
    { name: "12 AM", total: 0 },
    { name: "4 AM", total: 0 },
    { name: "8 AM", total: 0 },
    { name: "12 PM", total: 0 },
    { name: "4 PM", total: 0 },
    { name: "8 PM", total: 0 },
    { name: "11:59 PM", total: 0 },
]

export default function OperatorDashboard() {
    console.log("Rendering OperatorDashboard")
    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Today</h1>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add apps
                    </Button>
                    <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Top Section: Graph & Balance */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Left: Gross Revenue Graph (Span 2) */}
                <Card className="md:col-span-2 border-[#222] bg-[#161616] shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-sm font-medium text-neutral-400">Gross revenue</CardTitle>
                            <div className="text-2xl font-bold text-white">--</div>
                        </div>
                        <div className="space-y-1 text-right">
                            <CardTitle className="text-sm font-medium text-neutral-400">Yesterday</CardTitle>
                            <div className="text-2xl font-bold text-white">--</div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full mt-4 relative flex items-center justify-center border border-dashed border-[#333] rounded-md">
                            {/* <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#333" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#333" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#444"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#444"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#444"
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer> */}

                            {/* "No data available" Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-full bg-[#222] px-4 py-2 text-xs font-medium text-neutral-400 border border-[#333]">
                                    No data available
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Balance & Payouts */}
                <div className="space-y-6">
                    <Card className="border-[#222] bg-[#161616] shadow-none h-[140px] flex flex-col justify-center">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-400">Balance</CardTitle>
                            <span className="text-xs font-medium text-blue-500 cursor-pointer hover:underline">View</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">$0.00</div>
                            <p className="text-xs text-neutral-500 mt-1">$0.00 pending</p>
                        </CardContent>
                    </Card>

                    <Card className="border-[#222] bg-[#161616] shadow-none h-[140px] flex flex-col justify-center">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-400">Payouts</CardTitle>
                            <span className="text-xs font-medium text-blue-500 cursor-pointer hover:underline">View</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">--</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Middle Banner */}
            <div className="rounded-lg border border-[#222] bg-[#161616] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-blue-900/20 flex items-center justify-center text-blue-500">
                        <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-300">
                        Join ShadowOS University and start your path to your first $10K.
                    </span>
                </div>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Bottom Section: Stats */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-white">Stats</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs font-normal">
                            Last 7 days
                            <ArrowRight className="ml-2 h-3 w-3 rotate-90" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs font-normal">
                            <Calendar className="mr-2 h-3 w-3 text-neutral-500" />
                            Nov 22 - 28, 2025
                        </Button>
                        <span className="text-xs text-neutral-500">compared to</span>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs font-normal">
                            Previous period
                            <ArrowRight className="ml-2 h-3 w-3 rotate-90" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs font-normal">
                            Daily
                            <ArrowRight className="ml-2 h-3 w-3 rotate-90" />
                        </Button>
                        <span className="text-xs text-neutral-500">on</span>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs font-normal">
                            All products
                            <ArrowRight className="ml-2 h-3 w-3 rotate-90" />
                        </Button>
                        <div className="w-px h-4 bg-[#333] mx-2 hidden md:block" />
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs">
                            <Plus className="mr-1 h-3 w-3" /> Add
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#333] bg-[#161616] text-white hover:bg-[#222] h-8 text-xs">
                            <Settings className="mr-1 h-3 w-3" /> Edit
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <StatCard title="Gross revenue" value="$0.00" />
                    <StatCard title="Net revenue" value="$0.00" />

                    <StatCard
                        title="New users"
                        value="1"
                        badge={<span className="bg-green-500/20 text-green-500 text-[10px] font-bold px-1.5 py-0.5 rounded">+1</span>}
                        hasData={true}
                    >
                        {/* <div className="h-full w-full -ml-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={[{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }, { v: 1 }]}>
                                    <Line
                                        type="monotone"
                                        dataKey="v"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div> */}
                        <div className="h-full w-full flex items-center justify-center text-neutral-500 text-xs">
                            Chart disabled (SSR issue)
                        </div>
                    </StatCard>

                    <StatCard title="MRR" value="$0.00" />
                    <StatCard title="ARR" value="$0.00" />
                    <StatCard title="Churn rate" value="0%" />
                </div>
            </div>
        </div>
    )
}
