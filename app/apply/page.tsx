import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { submitApplication } from "./actions"
import { Rocket, Instagram, Users, ExternalLink, Sparkles, User, Mail } from "lucide-react"
import { TikTok } from "@/components/icons/tiktok"
import Link from "next/link"

export default function ApplyPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl relative z-10">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-white">Ajukan Partnership</CardTitle>
                    <CardDescription className="text-center text-zinc-400">
                        Gabung dengan jaringan eksklusif kami dan ubah followers jadi income pasif.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={submitApplication} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full_name" className="text-zinc-200">Nama Lengkap</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    placeholder="John Doe"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-200">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok_link" className="text-zinc-200">Link Profil TikTok</Label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 h-4 w-4 text-zinc-500 flex items-center justify-center">
                                    <TikTok className="h-3 w-3 fill-current" />
                                </div>
                                <Input
                                    id="tiktok_link"
                                    name="tiktok_link"
                                    placeholder="https://tiktok.com/@username"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="follower_count" className="text-zinc-200">Jumlah Followers</Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="follower_count"
                                    name="follower_count"
                                    type="number"
                                    placeholder="10000"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            Kirim Pengajuan
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm text-zinc-500">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline">
                            Masuk
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
