import { createBusiness } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function CreateBusinessPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <Card className="w-full max-w-[450px] bg-[#121212] border-[#222] shadow-2xl relative z-10 rounded-2xl">
                <CardHeader className="space-y-4 pb-2">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-600/20">
                            <Building2 className="h-8 w-8" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-white">Setup Your Business</CardTitle>
                    <CardDescription className="text-center text-neutral-500">
                        Give your new digital empire a name. You can change this later.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form action={createBusiness as any} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-neutral-400 text-xs uppercase font-bold tracking-wider">Business Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Acme Corp"
                                required
                                className="bg-[#1c1c1c] border-[#333] text-white placeholder:text-neutral-600 focus:border-blue-600 focus:ring-0 h-12 rounded-lg text-lg"
                                autoFocus
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-lg transition-all active:scale-95"
                        >
                            Create Business & Continue
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
