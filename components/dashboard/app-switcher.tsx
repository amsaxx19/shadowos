"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/components/dashboard/dashboard-context"

export function AppSwitcher() {
    const { activeApp, setActiveApp } = useDashboard()

    return (
        <div className="flex w-[60px] flex-col items-center border-r border-[#222] bg-[#0e0e0e] py-4 gap-4 z-30">
            {/* ShadowOS App */}
            <div className="group relative flex items-center justify-center">
                <div className={cn(
                    "absolute left-0 h-8 w-1 rounded-r-full bg-white transition-all",
                    activeApp === "ShadowOS" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )} />
                <div
                    onClick={() => setActiveApp("ShadowOS")}
                    className={cn(
                        "h-10 w-10 overflow-hidden rounded-xl border transition-all cursor-pointer flex items-center justify-center text-xs font-bold",
                        activeApp === "ShadowOS"
                            ? "border-[#333] bg-[#161616] text-white"
                            : "border-[#222] bg-[#161616] text-neutral-500 hover:text-white hover:rounded-lg"
                    )}
                >
                    SO
                </div>
            </div>

            {/* Clipper Agency App */}
            <div className="group relative flex items-center justify-center">
                <div className={cn(
                    "absolute left-0 h-8 w-1 rounded-r-full bg-white transition-all",
                    activeApp === "ClipperAgency" ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                )} />
                <div
                    onClick={() => setActiveApp("ClipperAgency")}
                    className={cn(
                        "h-10 w-10 overflow-hidden rounded-xl border transition-all cursor-pointer flex items-center justify-center text-xs font-bold",
                        activeApp === "ClipperAgency"
                            ? "border-[#333] bg-[#161616] text-white"
                            : "border-[#222] bg-[#161616] text-neutral-500 hover:text-white hover:rounded-lg"
                    )}
                >
                    CA
                </div>
            </div>

            {/* Add New */}
            <div className="mt-auto">
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#161616] text-neutral-400 transition-all hover:bg-[#222] hover:text-white">
                    <Plus className="h-5 w-5" />
                </div>
            </div>
        </div>
    )
}
