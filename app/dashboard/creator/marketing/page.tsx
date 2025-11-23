import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CopyLinkButton } from "@/components/dashboard/copy-link-button"

export default function MarketingPage() {
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
                            <Megaphone className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Bahan Promosi</h1>
                            <p className="text-blue-100 mt-1">Scripts and assets to help you sell.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950">Winning Scripts</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <h3 className="font-bold text-blue-900">Script 1: Soft Selling (Storytelling)</h3>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm whitespace-pre-wrap">
                                    {"Gue baru aja nemu tools yang gila banget buat produktivitas. Dulu gue sering keteteran ngurus kerjaan, tapi sejak pake ini, semuanya jadi auto-pilot.\n\nBuat yang mau tau caranya, cek link di bio ya! #ProductivityHacks #ShadowOS"}
                                </div>
                                <CopyLinkButton
                                    url={"Gue baru aja nemu tools yang gila banget buat produktivitas. Dulu gue sering keteteran ngurus kerjaan, tapi sejak pake ini, semuanya jadi auto-pilot.\n\nBuat yang mau tau caranya, cek link di bio ya! #ProductivityHacks #ShadowOS"}
                                    label="Copy Script"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-blue-900">Script 2: Hard Selling (Urgency)</h3>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm whitespace-pre-wrap">
                                    {"PROMO TERBATAS! 🔥\n\nDapetin akses eksklusif ke ShadowOS sekarang juga. Harga bakal naik minggu depan. Jangan sampe nyesel!\n\nKlik link di bawah buat amanin slot lo sekarang! 👇"}
                                </div>
                                <CopyLinkButton
                                    url={"PROMO TERBATAS! 🔥\n\nDapetin akses eksklusif ke ShadowOS sekarang juga. Harga bakal naik minggu depan. Jangan sampe nyesel!\n\nKlik link di bawah buat amanin slot lo sekarang! 👇"}
                                    label="Copy Script"
                                    className="w-full"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader className="p-6 pb-4">
                            <CardTitle className="text-blue-950">Creative Assets</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="p-6 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Copy className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-900">Google Drive Folder</h3>
                                    <p className="text-sm text-blue-600 mt-1">Access high-quality images and videos for your content.</p>
                                </div>
                                <Button className="bg-[#0055D4] hover:bg-[#0044AA] text-white">
                                    Open Google Drive
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
