"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, ExternalLink } from "lucide-react"
import { ReactNode } from "react"

interface StatCardProps {
    title: string
    value: string
    badge?: ReactNode
    hasData?: boolean
    children?: ReactNode
}

export function StatCard({ title, value, badge, hasData = false, children }: StatCardProps) {
    return (
        <Card className="border-[#222] bg-[#161616] shadow-none h-[200px] flex flex-col relative group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-1.5">
                    <CardTitle className="text-sm font-medium text-neutral-400">{title}</CardTitle>
                    <Info className="h-3.5 w-3.5 text-neutral-600" />
                </div>
                <ExternalLink className="h-4 w-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    {badge}
                </div>

                <div className="flex-1 relative mt-2">
                    {hasData ? (
                        children
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-[#222] px-3 py-1 text-[10px] font-medium text-neutral-500 border border-[#333]">
                                No data available
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Labels */}
                <div className="flex justify-between text-[10px] text-neutral-600 mt-auto pt-2">
                    <span>Nov 22</span>
                    <span>Today</span>
                </div>
            </CardContent>
        </Card>
    )
}
