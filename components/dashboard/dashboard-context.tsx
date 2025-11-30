"use client"

import React, { createContext, useContext, useState } from "react"

type AppType = "ShadowOS" | "ClipperAgency"

interface DashboardContextType {
    activeApp: AppType
    setActiveApp: (app: AppType) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [activeApp, setActiveApp] = useState<AppType>("ShadowOS")

    return (
        <DashboardContext.Provider value={{ activeApp, setActiveApp }}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = useContext(DashboardContext)
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider")
    }
    return context
}
