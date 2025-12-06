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

                // If no user, show empty
                if (!user) {
                    setBusinesses([])
                    setIsLoading(false)
                    return
                }

                // First try to fetch via business_members (for proper role support)
                const { data: memberData, error: memberError } = await supabase
                    .from('business_members')
                    .select(`
                        role,
                        businesses (
                            id,
                            name,
                            slug,
                            logo_url,
                            currency
                        )
                    `)
                    .eq('user_id', user.id)

                if (!memberError && memberData && memberData.length > 0) {
                    // Transform the data to flatten businesses with role
                    const userBusinesses = memberData
                        .filter(item => item.businesses)
                        .map(item => {
                            const biz = item.businesses as unknown as Business
                            return {
                                ...biz,
                                role: item.role
                            }
                        })
                    setBusinesses(userBusinesses)
                } else {
                    // Fallback: directly query businesses where user is owner
                    const { data: ownedData, error: ownedError } = await supabase
                        .from('businesses')
                        .select('*')
                        .eq('owner_id', user.id)

                    if (!ownedError && ownedData && ownedData.length > 0) {
                        setBusinesses(ownedData.map(b => ({ ...b, role: 'owner' })))
                    } else {
                        console.warn("No businesses found for user")
                        setBusinesses([])
                    }
                }
            } catch (err) {
                console.error("Failed to fetch businesses", err)
                setBusinesses([])
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
