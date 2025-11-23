'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePassword } from "./actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)

        const res = await updatePassword(formData)

        if (res?.error) {
            toast.error(res.error)
        } else if (res?.success) {
            toast.success(res.success)
            router.push("/login")
        }

        setIsLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md bg-zinc-950 border-zinc-800 text-white">
                <CardHeader>
                    <CardTitle>Set New Password</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Enter your new password below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-zinc-900 border-zinc-800 text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="bg-zinc-900 border-zinc-800 text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
