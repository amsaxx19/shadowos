"use client"

import { ShareStatsModal } from "@/components/dashboard/share-stats-modal"

export default function ShareTestPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="space-y-8 text-center bg-[#111] p-12 rounded-xl border border-[#333]">
                <h1 className="text-2xl font-bold">Share Stats Test</h1>
                <p className="text-neutral-400">Click the button below to test the share feature.</p>

                <ShareStatsModal
                    grossRevenue="Rp 12.345.000"
                    percentageChange="+125.5%"
                    isPositive={true}
                    businessName="Test Business"
                />
            </div>
        </div>
    )
}
