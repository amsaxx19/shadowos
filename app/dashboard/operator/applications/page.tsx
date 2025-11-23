import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react"
import { ApplicationRow } from "./application-row"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function ApplicationsPage() {
    const supabase = await createClient()

    const { data: applications } = await supabase
        .from('applications')
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
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Daftar Pengajuan</h1>
                            <p className="text-blue-100 mt-1">Tinjau dan kelola pengajuan partnership baru.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Menunggu</CardTitle>
                            <Clock className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-2xl font-bold text-blue-950">
                                {applications?.filter(a => a.status === 'pending').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Diterima</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-2xl font-bold text-blue-950">
                                {applications?.filter(a => a.status === 'approved').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-6">
                            <CardTitle className="text-sm font-bold text-blue-900/70 uppercase tracking-wider">Ditolak</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-2xl font-bold text-blue-950">
                                {applications?.filter(a => a.status === 'rejected').length || 0}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-white border-none shadow-xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-blue-50/50">
                            <TableRow className="border-blue-100 hover:bg-blue-50/80">
                                <TableHead className="text-blue-900 font-bold">Pemohon</TableHead>
                                <TableHead className="text-blue-900 font-bold">Profil TikTok</TableHead>
                                <TableHead className="text-blue-900 font-bold">Followers</TableHead>
                                <TableHead className="text-blue-900 font-bold">Status</TableHead>
                                <TableHead className="text-blue-900 font-bold">Tanggal</TableHead>
                                <TableHead className="text-right text-blue-900 font-bold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications?.map((application) => (
                                <ApplicationRow key={application.id} application={application} />
                            ))}
                            {(!applications || applications.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-blue-400">
                                        Belum ada pengajuan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}
