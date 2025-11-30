"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useBusiness } from "@/components/providers/business-provider"
import { Loader2 } from "lucide-react"

export default function DashboardRootPage() {
    const { businesses, isLoading } = useBusiness()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (businesses.length > 0) {
                router.push(`/dashboard/${businesses[0].id}/home`)
            } else {
                // TODO: Redirect to create business page or show empty state
                // For now, let's assume there's always a default business from the provider mock
                console.warn("No businesses found")
            }
        }
    }, [businesses, isLoading, router])

    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    )
}
