import { signup } from '../login/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Lock, Mail, User, Briefcase } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-md bg-zinc-900/50 border-zinc-800 backdrop-blur-xl relative z-10">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
                            <UserPlus className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-white">Buat Akun Baru</CardTitle>
                    <CardDescription className="text-center text-zinc-400">
                        Mulai perjalanan bisnis digital Anda bersama ShadowOS.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={signup} className="space-y-4">
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
                                    placeholder="name@example.com"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-200">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="pl-9 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-200">Peran Anda</Label>
                            <RadioGroup defaultValue="creator" name="role" className="grid grid-cols-2 gap-4">
                                <div>
                                    <RadioGroupItem value="creator" id="creator" className="peer sr-only" />
                                    <Label
                                        htmlFor="creator"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-700 bg-zinc-800/50 p-4 hover:bg-zinc-800 hover:text-white peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 cursor-pointer transition-all"
                                    >
                                        <User className="mb-2 h-6 w-6" />
                                        Creator
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="operator" id="operator" className="peer sr-only" />
                                    <Label
                                        htmlFor="operator"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-700 bg-zinc-800/50 p-4 hover:bg-zinc-800 hover:text-white peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:text-blue-600 cursor-pointer transition-all"
                                    >
                                        <Briefcase className="mb-2 h-6 w-6" />
                                        Operator
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            Daftar Sekarang
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
