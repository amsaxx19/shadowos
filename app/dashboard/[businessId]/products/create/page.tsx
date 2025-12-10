"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, Image as ImageIcon, Video, Eye, Trash2, ChevronRight, ChevronDown, CheckCircle2, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState, use, useRef, useEffect, useCallback, useMemo, useActionState } from "react"
import { cn } from "@/lib/utils"
import { createProduct, uploadProductImage } from "../actions"
import Image from "next/image"
import { useRouter } from "next/navigation"

const CATEGORIES = [
    { value: "trading", label: "Trading & Investasi", icon: "📈" },
    { value: "bisnis", label: "Bisnis & Uang", icon: "💰" },
    { value: "sosmed", label: "Media Sosial", icon: "📱" },
    { value: "karir", label: "Karir & Pekerjaan", icon: "💼" },
    { value: "teknologi", label: "Teknologi & Tools", icon: "🛠️" },
    { value: "lifestyle", label: "Lifestyle & Hobi", icon: "✨" },
] as const

const PRODUCT_TYPES = [
    { value: "ebook", label: "E-Book & PDF", icon: "📚" },
    { value: "course", label: "Kelas Online / Course", icon: "🎥" },
    { value: "community", label: "Komunitas VIP", icon: "💬" },
    { value: "clipping", label: "Clipping", icon: "✂️" },
    { value: "software", label: "Software & Tools", icon: "💻" },
] as const

export default function CreateProductPage({ params }: { params: Promise<{ businessId: string }> }) {
    const { businessId } = use(params)
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        headline: "",
        description: "",
        price: "100000",
        type: "ebook",
        category: "trading",
        pricingType: "one-time",
    })
    const [visibility, setVisibility] = useState(true)
    const [affiliateEnabled, setAffiliateEnabled] = useState(false)
    const [affiliatePercentage, setAffiliatePercentage] = useState("20")
    const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([])
    const [features, setFeatures] = useState<string[]>([])
    const [newFeature, setNewFeature] = useState("")
    const [mediaFiles, setMediaFiles] = useState<{ file: File, preview: string }[]>([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Success modal state
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [createdProduct, setCreatedProduct] = useState<{ productLink: string, slug: string } | null>(null)
    const [copied, setCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Dynamic join date
    const joinDate = useMemo(() => {
        const now = new Date()
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${months[now.getMonth()]} ${now.getFullYear()}`
    }, [])

    // Cleanup Object URLs on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            mediaFiles.forEach(media => {
                URL.revokeObjectURL(media.preview)
            })
        }
    }, []) // Empty deps - only cleanup on unmount

    // Memoized update function
    const updateField = useCallback((field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    // FAQ handlers
    const addFaq = useCallback(() => setFaqs(prev => [...prev, { question: "", answer: "" }]), [])
    const removeFaq = useCallback((index: number) => setFaqs(prev => prev.filter((_, i) => i !== index)), [])
    const updateFaq = useCallback((index: number, field: 'question' | 'answer', value: string) => {
        setFaqs(prev => {
            const newFaqs = [...prev]
            newFaqs[index] = { ...newFaqs[index], [field]: value }
            return newFaqs
        })
    }, [])

    // Feature handlers
    const addFeature = useCallback(() => {
        if (newFeature.trim()) {
            setFeatures(prev => [...prev, newFeature.trim()])
            setNewFeature("")
        }
    }, [newFeature])
    const removeFeature = useCallback((index: number) => setFeatures(prev => prev.filter((_, i) => i !== index)), [])

    // File handlers with cleanup
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const newFiles = Array.from(files).map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
            setMediaFiles(prev => [...prev, ...newFiles])
        }
        // Reset input for re-selecting same file
        if (e.target) e.target.value = ''
    }, [])

    const removeMedia = useCallback((index: number) => {
        setMediaFiles(prev => {
            // Revoke the URL before removing
            if (prev[index]) {
                URL.revokeObjectURL(prev[index].preview)
            }
            return prev.filter((_, i) => i !== index)
        })
        // Reset current index if needed
        setCurrentImageIndex(prev => Math.max(0, prev - 1))
    }, [])

    // Memoized slug computation
    const slug = useMemo(() =>
        formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product-name'
        , [formData.name])

    // Handle form submit
    const handleSubmit = async (formDataSubmit: FormData): Promise<void> => {
        setIsSubmitting(true)
        try {
            // Upload first image if exists
            let imageUrl = null
            if (mediaFiles.length > 0) {
                const uploadFormData = new FormData()
                uploadFormData.append('file', mediaFiles[0].file)

                const uploadResult = await uploadProductImage(uploadFormData)
                if ('url' in uploadResult) {
                    imageUrl = uploadResult.url
                } else if ('error' in uploadResult) {
                    console.error('Upload error:', uploadResult.error)
                    alert(`Upload failed: ${uploadResult.error}`)
                    setIsSubmitting(false)
                    return
                }
            }

            // Add image_url to form data
            if (imageUrl) {
                formDataSubmit.set('image_url', imageUrl)
            }

            const result = await createProduct(formDataSubmit)
            if (result.success) {
                setCreatedProduct({
                    productLink: result.productLink,
                    slug: result.slug,
                })
                setShowSuccessModal(true)
            }
        } catch (error) {
            console.error('Error creating product:', error)
            alert('Failed to create product. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Copy link handler
    const copyLink = useCallback(() => {
        if (createdProduct?.productLink) {
            navigator.clipboard.writeText(createdProduct.productLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }, [createdProduct])

    // Handle done button
    const handleDone = () => {
        setShowSuccessModal(false)
        router.push(`/dashboard/${businessId}/products`)
    }

    return (
        <>
            <form action={handleSubmit} className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden fixed inset-0">
                <input type="hidden" name="business_id" value={businessId} />
                <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />
                <input type="hidden" name="features" value={JSON.stringify(features)} />
                <input type="hidden" name="is_affiliate_enabled" value={affiliateEnabled.toString()} />
                <input type="hidden" name="affiliate_percentage" value={affiliatePercentage} />
                <input type="hidden" name="is_visible" value={visibility.toString()} />

                {/* LEFT: Form Panel - 35% width */}
                <div className="w-[35%] min-w-[380px] max-w-[480px] flex-shrink-0 flex flex-col bg-[#0a0a0a] border-r border-[#1a1a1a]">
                    {/* Header */}
                    <div className="h-14 px-4 flex items-center gap-3 border-b border-[#1a1a1a]">
                        <Link href={`/dashboard/${businessId}/products`}>
                            <button type="button" className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#1a1a1a] text-neutral-400 hover:text-white transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-neutral-500">Products</span>
                            <ChevronRight className="h-3 w-3 text-neutral-600" />
                            <span className="text-white">Create product</span>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        <div className="p-5 space-y-5">
                            {/* Product Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Product type</label>
                                <Select value={formData.type} onValueChange={(v) => updateField('type', v)} name="type">
                                    <SelectTrigger className="h-12 bg-[#111] border-[#222] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{PRODUCT_TYPES.find(t => t.value === formData.type)?.icon}</span>
                                            <span>{PRODUCT_TYPES.find(t => t.value === formData.type)?.label}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111] border-[#222]">
                                        {PRODUCT_TYPES.map(type => (
                                            <SelectItem key={type.value} value={type.value}>
                                                <div className="flex items-center gap-2">
                                                    <span>{type.icon}</span>
                                                    <span>{type.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white">Category</label>
                                <Select value={formData.category} onValueChange={(v) => updateField('category', v)} name="category">
                                    <SelectTrigger className="h-12 bg-[#111] border-[#222] rounded-xl">
                                        <div className="flex items-center gap-2">
                                            <span>{CATEGORIES.find(c => c.value === formData.category)?.icon}</span>
                                            <span>{CATEGORIES.find(c => c.value === formData.category)?.label}</span>
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#111] border-[#222]">
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                <div className="flex items-center gap-2">
                                                    <span>{cat.icon}</span>
                                                    <span>{cat.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Product Details Section */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-4">
                                <h3 className="text-sm font-semibold text-white">Product details</h3>

                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs text-neutral-500">Name</label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => updateField('name', e.target.value)}
                                        placeholder="Basic Access"
                                        className="h-11 bg-[#0a0a0a] border-[#222] rounded-xl text-white"
                                        maxLength={30}
                                    />
                                    <div className="text-right text-[10px] text-neutral-600">{formData.name.length} / 30</div>
                                </div>

                                {/* Headline */}
                                <div className="space-y-1.5">
                                    <label className="text-xs text-neutral-500">Headline</label>
                                    <Input
                                        name="headline"
                                        value={formData.headline}
                                        onChange={(e) => updateField('headline', e.target.value)}
                                        placeholder="How to Build a Viral App: Rp 0 to Rp 100jt/mo"
                                        className="h-11 bg-[#0a0a0a] border-[#222] rounded-xl text-white"
                                        maxLength={80}
                                    />
                                    <div className="text-right text-[10px] text-neutral-600">{formData.headline.length} / 80</div>
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <label className="text-xs text-neutral-500">Description</label>
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) => updateField('description', e.target.value)}
                                        placeholder="Describe your offer in detail..."
                                        className="min-h-[80px] bg-[#0a0a0a] border-[#222] rounded-xl resize-none text-white"
                                        maxLength={1500}
                                    />
                                    <div className="text-right text-[10px] text-neutral-600">{formData.description.length} / 1500</div>
                                </div>
                            </div>

                            {/* Product Media */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-3">
                                <h3 className="text-sm font-semibold text-white">Product media</h3>
                                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*,video/*" multiple className="hidden" />

                                <div className="grid grid-cols-2 gap-2">
                                    {mediaFiles.map((media, index) => (
                                        <div key={index} className="aspect-video rounded-lg border border-[#222] relative group overflow-hidden">
                                            <Image src={media.preview} alt="" fill className="object-cover" />
                                            <button type="button" onClick={() => removeMedia(index)} className="absolute top-1.5 right-1.5 h-6 w-6 rounded bg-red-500/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="h-3 w-3 text-white" />
                                            </button>
                                        </div>
                                    ))}
                                    <div onClick={() => fileInputRef.current?.click()} className="aspect-video rounded-lg border border-dashed border-[#333] bg-[#0a0a0a] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-blue-500/50 hover:bg-[#111] transition-all">
                                        <div className="flex gap-1.5">
                                            <Video className="h-4 w-4 text-neutral-500" />
                                            <ImageIcon className="h-4 w-4 text-neutral-500" />
                                        </div>
                                        <span className="text-[11px] text-neutral-500">Add videos and photos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-3">
                                <h3 className="text-sm font-semibold text-white">Pricing</h3>
                                <p className="text-xs text-neutral-500">
                                    {formData.pricingType === 'free' ? 'Free' : `Rp ${Number(formData.price).toLocaleString('id-ID')} ${formData.pricingType === 'recurring' ? '/bulan' : 'sekali bayar'}`}
                                </p>

                                <Tabs value={formData.pricingType} onValueChange={(v) => updateField('pricingType', v)} className="w-full">
                                    <TabsList className="w-full h-10 bg-[#0a0a0a] border border-[#222] rounded-lg p-1">
                                        <TabsTrigger value="free" className="flex-1 h-8 text-xs data-[state=active]:bg-[#1a1a1a] rounded-md">Free</TabsTrigger>
                                        <TabsTrigger value="one-time" className="flex-1 h-8 text-xs data-[state=active]:bg-[#1a1a1a] rounded-md">One-time</TabsTrigger>
                                        <TabsTrigger value="recurring" className="flex-1 h-8 text-xs data-[state=active]:bg-[#1a1a1a] rounded-md">Recurring</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                {formData.pricingType !== 'free' && (
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-neutral-500 text-sm">Rp</span>
                                        <Input name="price" value={formData.price} onChange={(e) => updateField('price', e.target.value)} className="h-10 bg-[#0a0a0a] border-[#222] rounded-lg pl-9 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-3">
                                <h3 className="text-sm font-semibold text-white">Features</h3>
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#0a0a0a] border border-[#222] group">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm flex-1">{feature}</span>
                                        <button type="button" onClick={() => removeFeature(i)} className="h-6 w-6 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 opacity-0 group-hover:opacity-100">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="Add a feature..." className="h-9 bg-[#0a0a0a] border-[#222] rounded-lg text-sm" />
                                    <Button type="button" onClick={addFeature} size="sm" className="h-9 px-3 bg-blue-600 hover:bg-blue-700 rounded-lg">Add</Button>
                                </div>
                            </div>

                            {/* FAQs */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-3">
                                <h3 className="text-sm font-semibold text-white">FAQs</h3>
                                {faqs.map((faq, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-[#0a0a0a] border border-[#222] space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-neutral-500">Question {i + 1}</span>
                                            <button type="button" onClick={() => removeFaq(i)} className="h-6 w-6 rounded flex items-center justify-center text-neutral-500 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                        <Input value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="Enter your question..." className="h-9 bg-transparent border-[#333] rounded-lg text-sm" />
                                        <Textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} placeholder="Enter your answer..." className="min-h-[60px] bg-transparent border-[#333] rounded-lg text-sm resize-none" />
                                    </div>
                                ))}
                                <button type="button" onClick={addFaq} className="w-full h-9 rounded-lg border border-dashed border-[#333] text-sm text-blue-400 hover:bg-[#111] hover:border-blue-500/50 flex items-center justify-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add FAQ item
                                </button>
                            </div>

                            {/* Advanced */}
                            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] space-y-4">
                                <h3 className="text-sm font-semibold text-white">Advanced</h3>

                                {/* Affiliate */}
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 flex-shrink-0">✦</div>
                                        <div>
                                            <p className="text-sm font-medium">Affiliate Program</p>
                                            <p className="text-xs text-neutral-500">Allow others to promote and earn commission.</p>
                                        </div>
                                    </div>
                                    <div onClick={() => setAffiliateEnabled(!affiliateEnabled)} className={cn("w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors", affiliateEnabled ? "bg-green-500" : "bg-[#333]")}>
                                        <div className={cn("h-5 w-5 rounded-full bg-white transition-transform", affiliateEnabled ? "translate-x-4" : "translate-x-0")} />
                                    </div>
                                </div>

                                {affiliateEnabled && (
                                    <div className="pl-11">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={affiliatePercentage}
                                                onChange={(e) => setAffiliatePercentage(e.target.value)}
                                                className="w-20 h-9 bg-[#0a0a0a] border-[#222] rounded-lg text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                min="0"
                                                max="100"
                                            />
                                            <span className="text-sm text-neutral-500">% commission</span>
                                        </div>
                                    </div>
                                )}

                                {/* Visibility */}
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                                            <Eye className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Visible on store</p>
                                            <p className="text-xs text-neutral-500">Show this product publicly on your store.</p>
                                        </div>
                                    </div>
                                    <div onClick={() => setVisibility(!visibility)} className={cn("w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors", visibility ? "bg-blue-500" : "bg-[#333]")}>
                                        <div className={cn("h-5 w-5 rounded-full bg-white transition-transform", visibility ? "translate-x-4" : "translate-x-0")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="p-4 border-t border-[#1a1a1a]">
                        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
                            Save
                        </Button>
                    </div>
                </div>

                {/* RIGHT: Preview Panel */}
                <div className="flex-1 bg-black p-6 flex flex-col overflow-hidden">
                    <h2 className="text-sm text-neutral-500 mb-4 flex-shrink-0">Product page preview</h2>

                    {/* Browser Frame */}
                    <div className="flex-1 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] overflow-hidden flex flex-col">
                        {/* URL Bar */}
                        <div className="h-10 bg-[#111] border-b border-[#1a1a1a] flex items-center px-4 gap-3 flex-shrink-0">
                            <div className="flex gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                                <div className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                                <div className="h-2.5 w-2.5 rounded-full bg-[#333]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-3 py-1 rounded bg-[#0a0a0a] border border-[#222] text-[11px] text-neutral-500 max-w-[300px] truncate">
                                    cuanboss.com/{slug}
                                </div>
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5">
                            {/* Media Carousel */}
                            <div className="space-y-3">
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                                    {mediaFiles.length > 0 ? (
                                        <Image src={mediaFiles[currentImageIndex]?.preview || mediaFiles[0].preview} alt="" fill className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-white/80 text-lg font-medium text-center px-4">{formData.name || "Your Product"}</p>
                                        </div>
                                    )}
                                    {mediaFiles.length > 1 && (
                                        <>
                                            <button type="button" onClick={() => setCurrentImageIndex(i => Math.max(0, i - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80">
                                                <ChevronRight className="h-4 w-4 rotate-180" />
                                            </button>
                                            <button type="button" onClick={() => setCurrentImageIndex(i => Math.min(mediaFiles.length - 1, i + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80">
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                {mediaFiles.length > 1 && (
                                    <div className="flex justify-center gap-1.5">
                                        {mediaFiles.map((_, i) => (
                                            <button key={i} type="button" onClick={() => setCurrentImageIndex(i)} className={cn("h-1.5 rounded-full transition-all", i === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-neutral-600 hover:bg-neutral-500")} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="h-5 w-5 rounded bg-purple-600/20 flex items-center justify-center text-[10px]">
                                        {PRODUCT_TYPES.find(t => t.value === formData.type)?.icon}
                                    </span>
                                    <span className="text-xs text-neutral-400">{formData.name || "Product Name"}</span>
                                </div>
                                <h1 className="text-xl font-bold text-white">{formData.headline || "Your Product Headline"}</h1>
                                <p className="text-sm text-neutral-500">{CATEGORIES.find(c => c.value === formData.category)?.label}</p>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Description</h3>
                                <p className="text-sm text-neutral-500">{formData.description || "Description"}</p>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-sm font-semibold mb-2">Features</h3>
                                {features.length > 0 ? features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-400 mb-1.5">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />{f}
                                    </div>
                                )) : (
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <CheckCircle2 className="h-4 w-4 text-neutral-600" />Feature
                                    </div>
                                )}
                            </div>

                            {/* About Creator */}
                            <div className="pt-4 border-t border-[#1a1a1a]">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-semibold">About the creator</h3>
                                    <Button variant="outline" size="sm" className="h-7 text-xs border-[#333] bg-transparent">View profile</Button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">🔥</div>
                                    <div>
                                        <p className="text-sm font-medium">Amos</p>
                                        <p className="text-xs text-neutral-500">@tiktokkamoss • Joined {joinDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQs */}
                            {(faqs.length > 0 || true) && (
                                <div className="pt-4 border-t border-[#1a1a1a]">
                                    <h3 className="text-sm font-semibold mb-3">FAQs</h3>
                                    {faqs.filter(f => f.question).map((faq, i) => (
                                        <div key={i} className="mb-2">
                                            <button
                                                type="button"
                                                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#111] border border-[#1a1a1a] hover:bg-[#161616] transition-colors"
                                            >
                                                <span className="text-sm text-neutral-300 text-left">{faq.question}</span>
                                                <ChevronDown className={cn("h-4 w-4 text-neutral-500 transition-transform", expandedFaq === i && "rotate-180")} />
                                            </button>
                                            {expandedFaq === i && faq.answer && (
                                                <div className="px-3 py-2 text-sm text-neutral-400 bg-[#0a0a0a] border-x border-b border-[#1a1a1a] rounded-b-lg -mt-px">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {faqs.filter(f => f.question).length === 0 && (
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#111] border border-[#1a1a1a]">
                                            <span className="text-sm text-neutral-500">Question</span>
                                            <ChevronDown className="h-4 w-4 text-neutral-600" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Affiliates */}
                            {affiliateEnabled && (
                                <div className="pt-4 border-t border-[#1a1a1a]">
                                    <h3 className="text-sm font-semibold mb-3">Affiliates</h3>
                                    <div className="space-y-2">
                                        <div className="h-11 w-11 rounded-lg bg-purple-600/20 flex items-center justify-center font-bold text-purple-400">
                                            {(formData.name || "PM").substring(0, 2).toUpperCase()}
                                        </div>
                                        <p className="text-sm font-medium">{formData.name || "Product Name"}</p>
                                        <span className="inline-block px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-medium">{affiliatePercentage}% reward</span>
                                        <p className="text-xs text-neutral-500">Earn money by bringing customers. Every purchase using your link earns you a commission.</p>
                                    </div>
                                </div>
                            )}

                            {/* Price + CTA */}
                            <div className="pt-4 border-t border-[#1a1a1a]">
                                <p className="text-base font-semibold mb-3">
                                    {formData.pricingType === 'free' ? 'Free' : `Rp ${Number(formData.price).toLocaleString('id-ID')} ${formData.pricingType === 'recurring' ? '/bulan' : 'sekali bayar'}`}
                                </p>
                                <Button className="w-full h-10 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-lg font-medium">Join</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#111] border border-[#222] rounded-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleDone}
                            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#222] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#333] transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Floating emojis */}
                        <div className="flex justify-center mb-6 relative h-32">
                            <div className="absolute left-1/4 top-0 text-5xl animate-bounce" style={{ animationDelay: '0ms' }}>💬</div>
                            <div className="absolute right-1/4 top-4 text-5xl animate-bounce" style={{ animationDelay: '150ms' }}>🎓</div>
                            <div className="absolute left-1/3 bottom-0 text-5xl animate-bounce" style={{ animationDelay: '300ms' }}>📝</div>
                            <div className="absolute right-1/3 bottom-4 text-4xl animate-bounce" style={{ animationDelay: '75ms' }}>✨</div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-center mb-2">Your product was created! 🎉</h2>
                        <p className="text-sm text-neutral-400 text-center mb-6">You can now share your product link with your customers.</p>

                        {/* Product link */}
                        <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] border border-[#222] rounded-xl mb-4">
                            <input
                                type="text"
                                readOnly
                                value={createdProduct?.productLink || ''}
                                className="flex-1 bg-transparent text-sm text-neutral-300 outline-none truncate"
                            />
                            <button
                                type="button"
                                onClick={copyLink}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222] hover:bg-[#333] rounded-lg text-sm font-medium transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-green-400" />
                                        <span className="text-green-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copy link</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Done button */}
                        <Button
                            onClick={handleDone}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
                        >
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
