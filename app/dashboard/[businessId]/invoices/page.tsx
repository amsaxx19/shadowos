"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search, Mail } from "lucide-react"

export default function InvoicesPage() {
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
                {/* Icon Placeholder (Mail/Envelope) */}
                <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-[#161616] border border-[#222] flex items-center justify-center relative z-10">
                        <Mail className="h-16 w-16 text-neutral-400" />
                    </div>
                    {/* Decorative elements to mimic the envelope flap/style */}
                    <div className="absolute top-2 -right-2 h-24 w-24 bg-[#ff4400] rounded-xl -z-10 transform rotate-12 opacity-80" />
                </div>

                <div className="space-y-2 max-w-md">
                    <h2 className="text-2xl font-bold text-white">No invoices yet</h2>
                    <p className="text-neutral-500">
                        Create your first invoice to request payment directly from a customer.
                    </p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 h-10">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first invoice
                </Button>
            </div>
        </div>
    )
}
