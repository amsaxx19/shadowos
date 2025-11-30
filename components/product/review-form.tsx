"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useState } from "react"
import { submitReview } from "@/app/product/[slug]/actions"
import { Input } from "@/components/ui/input"

export function ReviewForm({ productId }: { productId: string }) {
    const [rating, setRating] = useState(5)
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-neutral-400">
                    Tulis Review
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#161616] border-[#222] text-white">
                <DialogHeader>
                    <DialogTitle>Tulis Review</DialogTitle>
                </DialogHeader>
                <form action={async (formData) => {
                    await submitReview(productId, formData)
                    setOpen(false)
                }} className="space-y-4">
                    <input type="hidden" name="rating" value={rating} />
                    <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`h-8 w-8 cursor-pointer ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-neutral-600"}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <Textarea
                        name="comment"
                        placeholder="Bagaimana pengalaman Anda?"
                        className="bg-[#0e0e0e] border-[#333] text-white"
                        required
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Kirim Review
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
