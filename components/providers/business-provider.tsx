"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

type Business = {
    id: string
    name: string
    slug: string
    logo_url: string | null
    currency: string
    role?: string
}

type BusinessContextType = {
    businesses: Business[]
    activeBusiness: Business | null
    isLoading: boolean
    switchBusiness: (businessId: string) => void
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined)

export function BusinessProvider({ children }: { children: ReactNode }) {
    const [businesses, setBusinesses] = useState<Business[]>([])
    const [activeBusiness, setActiveBusiness] = useState<Business | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const router = useRouter()
    const pathname = usePathname()

    // Extract businessId from URL if present
    const urlBusinessId = params?.businessId as string | undefined

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) {
                    setIsLoading(false)
                    return
                }

                // Fetch businesses the user is a member of
                // Note: This query depends on the policies set up in migration
                const { data, error } = await supabase
                    .from('businesses')
                    .select('*')

                if (error) {
                    console.error("Error fetching businesses:", error)
                    // Fallback for dev/mock if DB not ready
                    setBusinesses([
                        { id: 'biz_1', name: 'ShadowOS Inc.', slug: 'shadow-os', logo_url: null, currency: 'USD', role: 'owner' },
                        { id: 'biz_2', name: 'My Second Store', slug: 'store-2', logo_url: null, currency: 'USD', role: 'admin' }
                    ])
                } else {
                    setBusinesses(data || [])
                }
            } catch (err) {
                console.error("Failed to fetch businesses", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBusinesses()
    }, [])

    useEffect(() => {
        if (businesses.length > 0) {
            if (urlBusinessId) {
                const business = businesses.find(b => b.id === urlBusinessId)
                if (business) {
                    setActiveBusiness(business)
                }
            } else if (!activeBusiness) {
                // If no URL param and no active business, set first one
                setActiveBusiness(businesses[0])
            }
        }
    }, [businesses, urlBusinessId, activeBusiness])

    const switchBusiness = (businessId: string) => {
        const business = businesses.find(b => b.id === businessId)
        if (business) {
            setActiveBusiness(business)
            // Redirect to the same page but for the new business
            // Replace current businessId in path with new one
            // Or default to home if not in a business route
            if (urlBusinessId) {
                const newPath = pathname.replace(urlBusinessId, businessId)
                router.push(newPath)
            } else {
                router.push(`/dashboard/${businessId}/home`)
            }
        }
    }

    return (
        <BusinessContext.Provider value={{ businesses, activeBusiness, isLoading, switchBusiness }}>
            {children}
        </BusinessContext.Provider>
    )
}

export function useBusiness() {
    const context = useContext(BusinessContext)
    if (context === undefined) {
        throw new Error("useBusiness must be used within a BusinessProvider")
    }
    return context
}
