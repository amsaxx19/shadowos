"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Loader2, FileText, Download, MessageSquare } from "lucide-react"
import { createProduct } from "@/app/actions/product-actions"
import { useBusiness } from "@/components/providers/business-provider"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateProductModal({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const { activeBusiness } = useBusiness()
    const router = useRouter()

    const [formData, setFormData] = useState({
        title: "",
        type: "course",
        price: "0",
        pricingType: "one_time",
        apps: [] as string[]
    })

    const handleNext = () => setStep(step + 1)
    const handleBack = () => setStep(step - 1)

    const handleSubmit = async () => {
        if (!activeBusiness) return

        setIsLoading(true)
        try {
            const result = await createProduct({
                businessId: activeBusiness.id,
                title: formData.title,
                type: formData.type as any,
                price: parseFloat(formData.price),
                pricingType: formData.pricingType as any,
                apps: formData.apps.map(app => ({ type: app as any }))
            })

            if (result.success) {
                toast.success("Product created successfully!")
                setOpen(false)
                setStep(1)
                setFormData({ title: "", type: "course", price: "0", pricingType: "one_time", apps: [] })
                router.refresh()
            } else {
                toast.error("Failed to create product")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const toggleApp = (appType: string) => {
        setFormData(prev => ({
            ...prev,
            apps: prev.apps.includes(appType)
                ? prev.apps.filter(a => a !== appType)
                : [...prev.apps, appType]
        }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-[#161616] border-[#222] text-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {/* Progress Indicator */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-[#333]'}`} />
                        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-[#333]'}`} />
                        <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-[#333]'}`} />
                    </div>

                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Product Name</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Masterclass 2025"
                                    className="bg-[#0e0e0e] border-[#333] text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger className="bg-[#0e0e0e] border-[#333] text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161616] border-[#333] text-white">
                                        <SelectItem value="course">Course</SelectItem>
                                        <SelectItem value="community">Community</SelectItem>
                                        <SelectItem value="software">Software</SelectItem>
                                        <SelectItem value="file">Digital Download</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Pricing Type</Label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['one_time', 'subscription', 'free'].map((type) => (
                                        <div
                                            key={type}
                                            onClick={() => setFormData({ ...formData, pricingType: type })}
                                            className={`cursor-pointer rounded-md border p-3 text-center text-sm transition-all ${formData.pricingType === type
                                                    ? 'border-blue-600 bg-blue-600/10 text-blue-500'
                                                    : 'border-[#333] bg-[#0e0e0e] hover:border-neutral-500'
                                                }`}
                                        >
                                            {type === 'one_time' ? 'One-time' : type === 'subscription' ? 'Recurring' : 'Free'}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {formData.pricingType !== 'free' && (
                                <div className="space-y-2">
                                    <Label>Price ($)</Label>
                                    <Input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="bg-[#0e0e0e] border-[#333] text-white"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <Label>Included Apps</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div
                                    onClick={() => toggleApp('file')}
                                    className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center gap-2 transition-all ${formData.apps.includes('file')
                                            ? 'border-blue-600 bg-blue-600/10 text-blue-500'
                                            : 'border-[#333] bg-[#0e0e0e] hover:border-neutral-500'
                                        }`}
                                >
                                    <Download className="h-6 w-6" />
                                    <span className="text-sm font-medium">File Download</span>
                                </div>
                                <div
                                    onClick={() => toggleApp('text')}
                                    className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center gap-2 transition-all ${formData.apps.includes('text')
                                            ? 'border-blue-600 bg-blue-600/10 text-blue-500'
                                            : 'border-[#333] bg-[#0e0e0e] hover:border-neutral-500'
                                        }`}
                                >
                                    <FileText className="h-6 w-6" />
                                    <span className="text-sm font-medium">Text Content</span>
                                </div>
                                <div
                                    onClick={() => toggleApp('chat')}
                                    className={`cursor-pointer rounded-lg border p-4 flex flex-col items-center gap-2 transition-all ${formData.apps.includes('chat')
                                            ? 'border-blue-600 bg-blue-600/10 text-blue-500'
                                            : 'border-[#333] bg-[#0e0e0e] hover:border-neutral-500'
                                        }`}
                                >
                                    <MessageSquare className="h-6 w-6" />
                                    <span className="text-sm font-medium">Chat / Community</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between pt-4 border-t border-[#222]">
                    {step > 1 ? (
                        <Button variant="ghost" onClick={handleBack} className="text-neutral-400 hover:text-white">
                            Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Create Product
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
