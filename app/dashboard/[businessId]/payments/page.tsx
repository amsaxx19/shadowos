"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search, Receipt } from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
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

            {/* Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8">
                {/* Icon Placeholder (Receipt) */}
                <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-[#161616] border border-[#222] flex items-center justify-center relative z-10">
                        <Receipt className="h-16 w-16 text-neutral-400" />
                    </div>
                    {/* Decorative elements to mimic the roll */}
                    <div className="absolute top-2 -right-2 h-32 w-8 bg-[#222] rounded-r-3xl -z-10 transform rotate-6" />
                </div>

                <div className="space-y-2 max-w-md">
                    <h2 className="text-2xl font-bold text-white">Get your <span className="text-yellow-400">first</span> payment</h2>
                    <p className="text-neutral-500">
                        Get your first paying customer! Click and share your whop below.
                    </p>
                </div>

                <Link href="/dashboard/products">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 h-10">
                        Go to products
                    </Button>
                </Link>
            </div>
        </div>
    )
}
