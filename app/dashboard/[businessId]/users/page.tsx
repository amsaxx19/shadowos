"use client"

import { Button } from "@/components/ui/button"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Settings, Rocket, ArrowUpDown, MoreVertical } from "lucide-react"

export default function UsersPage() {
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
            </div>

            {/* Table Container */}
            <div className="rounded-md border border-[#222] bg-[#0e0e0e] flex-1 flex flex-col">
                <Table>
                    <TableHeader>
                        <TableRow className="border-[#222] hover:bg-transparent">
                            <TableHead className="text-neutral-500 w-[200px]">User</TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Email <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Product <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Status <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Total spend <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Contact <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    First joined at <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Joined at <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                {/* Empty State */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    <div className="h-24 w-24 rounded-3xl bg-[#161616] border border-[#222] flex items-center justify-center">
                        <Rocket className="h-10 w-10 text-neutral-400" />
                    </div>
                    <div className="space-y-2 max-w-md">
                        <h3 className="text-lg font-medium text-white">No users yet</h3>
                        <p className="text-sm text-neutral-500">
                            Before you can view this table, you need to get users! Click and share your store page link below.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
