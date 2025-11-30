import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, Calendar } from "lucide-react"

export default async function CreatorsPage() {
    const supabase = await createClient()

    // Fetch users with role 'creator'
    // Note: In a real app we might have a separate profile table, but for now we use auth.users metadata or just the users table if we synced it.
    // Based on previous steps, we have a 'users' table.
    const { data: creators } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'creator')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Creators</h1>
                <p className="text-zinc-500">Manage your partner creators.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {creators?.map((creator) => (
                    <Card key={creator.id} className="group relative overflow-hidden border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-semibold text-zinc-900">
                                    {creator.name || "Unnamed Creator"}
                                </CardTitle>
                                <p className="text-xs text-zinc-500">Joined {new Date(creator.created_at).toLocaleDateString()}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-zinc-600">
                                <Mail className="h-4 w-4 text-zinc-400" />
                                {creator.email}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {(!creators || creators.length === 0) && (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 p-12 text-center">
                        <Users className="h-10 w-10 text-zinc-300 mb-4" />
                        <h3 className="text-lg font-semibold text-zinc-900">No creators found</h3>
                        <p className="text-sm text-zinc-500 mt-1">Creators will appear here once they sign up.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
