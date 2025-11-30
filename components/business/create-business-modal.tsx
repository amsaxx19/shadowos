"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"
import { createBusiness } from "@/app/dashboard/actions"
import { cn } from "@/lib/utils"

interface CreateBusinessModalProps {
    trigger?: React.ReactNode
    className?: string
}

export function CreateBusinessModal({ trigger, className }: CreateBusinessModalProps) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <button className={cn("flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-[#222]", className)}>
                        <Plus className="h-4 w-4" />
                        <span>Create new business</span>
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="bg-[#161616] border-[#222] text-white">
                <DialogHeader>
                    <DialogTitle>Create New Business</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    await createBusiness(formData)
                    setOpen(false)
                }} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Business Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="My Awesome Store"
                            className="bg-[#0e0e0e] border-[#333] text-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Business Slug (URL)</Label>
                        <Input
                            id="slug"
                            name="slug"
                            placeholder="my-awesome-store"
                            className="bg-[#0e0e0e] border-[#333] text-white"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Create Business
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
