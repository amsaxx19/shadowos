import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle, ExternalLink, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function LeadsPage() {
    const supabase = await createClient()

    // Fetch leads
    const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#0055D4] relative font-sans -m-8 p-8">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto space-y-8 pt-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#004CC4] flex items-center justify-center text-white shadow-lg border border-white/10">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Leads CRM</h1>
                            <p className="text-blue-100 mt-1">Manage your outreach and potential creator partnerships.</p>
                        </div>
                    </div>
                    <Button className="bg-white text-[#0055D4] hover:bg-blue-50 font-semibold shadow-lg">
                        <Users className="mr-2 h-4 w-4" />
                        Add New Lead
                    </Button>
                </div>

                <Card className="bg-white border-none shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-blue-50 bg-blue-50/30 p-6">
                        <CardTitle className="text-blue-950 font-bold">Active Leads</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-blue-500 uppercase bg-blue-50/50">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Name</th>
                                        <th className="px-6 py-4 font-bold">Social Link</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold">Notes</th>
                                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-50">
                                    {leads?.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4 font-bold text-blue-950">
                                                {lead.name}
                                            </td>
                                            <td className="px-6 py-4 text-blue-600">
                                                {lead.social_link ? (
                                                    <Link href={lead.social_link} target="_blank" className="flex items-center gap-1 hover:underline">
                                                        {lead.social_link}
                                                        <ExternalLink className="h-3 w-3" />
                                                    </Link>
                                                ) : (
                                                    <span className="text-blue-300 italic">No link</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide
                                                    ${lead.status === 'DM Sent' ? 'bg-blue-100 text-blue-700' :
                                                        lead.status === 'Negotiating' ? 'bg-amber-100 text-amber-700' :
                                                            lead.status === 'Closed' ? 'bg-green-100 text-green-700' :
                                                                'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-500 max-w-xs truncate">
                                                {lead.notes || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:text-blue-600">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!leads || leads.length === 0) && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-blue-400">
                                                No leads found. Start adding creators you are pitching to.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
