import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, User, Users } from "lucide-react"
import { createUser } from "./actions"
import { createClient } from "@/lib/supabase/server"

export default async function UsersPage() {
    const supabase = await createClient()
    const { data: users } = await supabase.from('users').select('*').eq('role', 'creator').order('created_at', { ascending: false })

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
                            <h1 className="text-3xl font-bold tracking-tight text-white">Creators</h1>
                            <p className="text-blue-100 mt-1">Manage your exclusive creator partnerships.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Create User Form */}
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-blue-950 font-bold">Add New Creator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={createUser} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-blue-900 font-medium">Full Name</Label>
                                    <Input id="name" name="name" placeholder="e.g. John Doe" required className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-300 dark:border-gray-300 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-blue-900 font-medium">Email Address</Label>
                                    <Input id="email" name="email" type="email" placeholder="creator@example.com" required className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-300 dark:border-gray-300 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-blue-900 font-medium">Initial Password</Label>
                                    <Input id="password" name="password" type="text" placeholder="Generate a strong password" required className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-300 dark:border-gray-300 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                                </div>
                                <Button type="submit" className="w-full bg-[#0055D4] text-white hover:bg-blue-700 font-semibold shadow-md">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Account
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* User List */}
                    <Card className="bg-white border-none shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-blue-950 font-bold">Existing Creators</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {users?.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/50 p-5 hover:bg-blue-50 transition-colors group">
                                        <div className="flex items-center gap-4 min-w-0 mr-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-blue-100 text-[#0055D4] shadow-sm group-hover:scale-105 transition-transform">
                                                <User className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-bold text-blue-950 truncate">{user.full_name}</p>
                                                <p className="text-sm text-blue-500 truncate font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-blue-600 shrink-0 bg-white px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                                            Joined {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                                {users?.length === 0 && (
                                    <div className="text-center py-12 bg-blue-50/30 rounded-xl border border-dashed border-blue-200">
                                        <Users className="h-10 w-10 text-blue-300 mx-auto mb-3" />
                                        <p className="text-blue-900 font-medium">No creators found.</p>
                                        <p className="text-sm text-blue-400">Add your first creator above.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
