import { BusinessProvider } from "@/components/providers/business-provider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BusinessProvider>
            {children}
        </BusinessProvider>
    )
}
