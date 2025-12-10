"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search, Info, Rocket, ArrowUpDown, MoreVertical } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function PayoutsPage() {
    return (
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto text-white h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-neutral-300 border border-[#333]">
                        EC
                    </div>
                    <h1 className="text-xl font-bold">Elevate Academy...</h1>
                    <Search className="h-4 w-4 text-neutral-500" />
                    <Button size="icon" className="h-6 w-6 bg-blue-600 hover:bg-blue-700 rounded-md">
                        <Plus className="h-4 w-4 text-white" />
                    </Button>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="whop-payments" className="w-full space-y-6">
                <TabsList className="bg-transparent border-b border-[#222] w-full justify-start h-auto p-0 rounded-none space-x-6">
                    <TabsTrigger
                        value="whop-payments"
                        className="rounded-none border-b-2 border-blue-600 bg-transparent px-0 py-2 text-sm font-medium text-white shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                    >
                        Whop payments
                    </TabsTrigger>
                    <TabsTrigger
                        value="financing"
                        className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 text-sm font-medium text-neutral-400 shadow-none data-[state=active]:border-white data-[state=active]:text-white hover:text-neutral-300"
                    >
                        Financing and additional payment methods
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="whop-payments" className="space-y-6">
                    {/* Balance Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-white mb-1">Available balance</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-white">Rp 0</span>
                                    <Info className="h-4 w-4 text-neutral-500" />
                                </div>
                            </div>
                            <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222]">
                                Top up
                            </Button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-500 font-medium cursor-pointer hover:underline">Total balance overview</span>
                            <span className="text-white">Rp 0</span>
                        </div>
                    </div>

                    {/* Verify Banner */}
                    <Link href="/payouts/activate">
                        <div className="rounded-md bg-blue-900/20 border border-blue-900/50 p-3 text-center cursor-pointer hover:bg-blue-900/30 transition-colors">
                            <span className="text-sm font-medium text-blue-400">Verify your business to pay out</span>
                        </div>
                    </Link>

                    {/* Withdrawals Section */}
                    <div className="space-y-4">
                        <Tabs defaultValue="withdrawals" className="w-full">
                            <TabsList className="bg-transparent border-b border-[#222] w-full justify-start h-auto p-0 rounded-none space-x-6">
                                <TabsTrigger
                                    value="withdrawals"
                                    className="rounded-none border-b-2 border-blue-600 bg-transparent px-0 py-2 text-sm font-medium text-white shadow-none data-[state=active]:border-blue-600 data-[state=active]:text-white data-[state=active]:shadow-none"
                                >
                                    Withdrawals
                                </TabsTrigger>
                                <TabsTrigger
                                    value="all-activity"
                                    className="rounded-none border-b-2 border-transparent bg-transparent px-0 py-2 text-sm font-medium text-neutral-400 shadow-none data-[state=active]:border-white data-[state=active]:text-white hover:text-neutral-300"
                                >
                                    All activity
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="withdrawals" className="pt-4">
                                <div className="rounded-md border border-[#222] bg-[#0e0e0e] min-h-[400px] flex flex-col">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-[#222] hover:bg-transparent">
                                                <TableHead className="text-neutral-500 h-10">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                        Amount <ArrowUpDown className="h-3 w-3" />
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-neutral-500 h-10">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                        Status <MoreVertical className="h-3 w-3 rotate-90" />
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-neutral-500 h-10">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                        Sent to <MoreVertical className="h-3 w-3 rotate-90" />
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-neutral-500 h-10">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                        Initiated <ArrowUpDown className="h-3 w-3" />
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-neutral-500 h-10">
                                                    <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                                        Estimated arrival <MoreVertical className="h-3 w-3 rotate-90" />
                                                    </div>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                    </Table>

                                    {/* Empty State */}
                                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                                        <div className="h-24 w-24 rounded-3xl bg-[#161616] border border-[#222] flex items-center justify-center">
                                            <Rocket className="h-10 w-10 text-neutral-400" />
                                        </div>
                                        <div className="space-y-2 max-w-md">
                                            <h3 className="text-lg font-medium text-white">No withdrawals yet</h3>
                                            <p className="text-sm text-neutral-500">
                                                When you withdraw money from your Whop account, it will be displayed here.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Footer Disclaimer */}
                    <div className="text-center text-[10px] text-neutral-600 max-w-4xl mx-auto leading-relaxed">
                        *Whop is a technology company, not a bank. Payment services are provided by Whop's payment partners, including Stripe. Whop Balances are held for you by Cross River Bank (member FDIC) or another partner bank. Whop balances are not FDIC insured
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
