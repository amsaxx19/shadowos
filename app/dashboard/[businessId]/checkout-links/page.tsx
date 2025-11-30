"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Settings, XCircle, MoreVertical, Link as LinkIcon, ArrowUpDown } from "lucide-react"
import Link from "next/link"

export default function CheckoutLinksPage() {
    return (
        <div className="p-8 space-y-6 max-w-[1600px] mx-auto text-white">
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
                <div className="flex items-center gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                        <Plus className="mr-2 h-4 w-4" />
                        Create checkout link
                    </Button>
                    <Button variant="outline" className="border-[#333] bg-[#161616] text-white hover:bg-[#222]">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between border-b border-[#222] pb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#161616] border border-[#333] text-sm text-neutral-400">
                        <XCircle className="h-4 w-4" />
                        <span>Visibility</span>
                        <span className="text-neutral-600">|</span>
                        <span className="text-blue-500">Visible, hidden</span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border border-[#222] bg-[#0e0e0e]">
                <Table>
                    <TableHeader>
                        <TableRow className="border-[#222] hover:bg-transparent">
                            <TableHead className="text-neutral-500">Product</TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Created at <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Plan <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Total sales <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Active users <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Visibility <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="text-neutral-500">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                                    Release method <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-[#222] hover:bg-[#161616]">
                            <TableCell className="font-medium text-white">Elevate Clipping Mastery</TableCell>
                            <TableCell className="text-white">3h ago</TableCell>
                            <TableCell className="text-white">$100.00</TableCell>
                            <TableCell className="text-white">$0.00</TableCell>
                            <TableCell className="text-blue-500">0</TableCell>
                            <TableCell>
                                <span className="bg-green-500/20 text-green-500 text-xs font-medium px-2 py-0.5 rounded">
                                    Visible
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="bg-green-500/20 text-green-500 text-xs font-medium px-2 py-0.5 rounded">
                                    Buy now
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#222]">
                                        <LinkIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#222]">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="p-4 border-t border-[#222] text-xs text-neutral-500 flex justify-between items-center">
                    <span>Showing 1 to 1 of 1</span>
                    <div className="flex gap-2">
                        {/* Pagination arrows would go here */}
                    </div>
                </div>
            </div>
        </div>
    )
}
