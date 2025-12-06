"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    Loader2, ArrowLeft, Search, Sparkles, Check, X,
    GraduationCap, Briefcase, Users, Monitor, Calendar, Mail, Package, Store,
    TrendingUp, Target, Dumbbell, Heart, ShoppingCart, RefreshCw, Smartphone, Bot, Building2, Bitcoin, Gamepad2, BookOpen
} from "lucide-react"
import { createBusiness, generateBusinessName, checkBusinessName } from "./actions"

const BUSINESS_MODELS = [
    { id: "coaching", name: "Coaching and courses", Icon: GraduationCap, bgColor: "#facc15", textColor: "#000" },
    { id: "agency", name: "Agency services", Icon: Briefcase, bgColor: "#ec4899", textColor: "#fff" },
    { id: "paid-group", name: "Paid group", Icon: Users, bgColor: "#22c55e", textColor: "#000" },
    { id: "software", name: "Software", Icon: Monitor, bgColor: "#3b82f6", textColor: "#fff" },
    { id: "events", name: "Events", Icon: Calendar, bgColor: "#f97316", textColor: "#000" },
    { id: "newsletter", name: "Newsletter", Icon: Mail, bgColor: "#10b981", textColor: "#000" },
    { id: "physical", name: "Physical products", Icon: Package, bgColor: "#06b6d4", textColor: "#000" },
    { id: "brick-mortar", name: "Brick and mortar", Icon: Store, bgColor: "#14b8a6", textColor: "#000" },
]

const INDUSTRIES = [
    { id: "trading", name: "Trading", Icon: TrendingUp, bgColor: "#22c55e", textColor: "#000" },
    { id: "sports-betting", name: "Sports betting", Icon: Target, bgColor: "#ef4444", textColor: "#fff" },
    { id: "fitness", name: "Fitness", Icon: Dumbbell, bgColor: "#f97316", textColor: "#000" },
    { id: "health", name: "Health & wellness", Icon: Heart, bgColor: "#10b981", textColor: "#000" },
    { id: "ecommerce", name: "Ecommerce", Icon: ShoppingCart, bgColor: "#ec4899", textColor: "#fff" },
    { id: "reselling", name: "Reselling", Icon: RefreshCw, bgColor: "#06b6d4", textColor: "#000" },
    { id: "social-media", name: "Social media", Icon: Smartphone, bgColor: "#eab308", textColor: "#000" },
    { id: "ai", name: "AI", Icon: Bot, bgColor: "#a855f7", textColor: "#fff" },
    { id: "business", name: "Business", Icon: Building2, bgColor: "#6b7280", textColor: "#fff" },
    { id: "crypto", name: "Crypto", Icon: Bitcoin, bgColor: "#f59e0b", textColor: "#000" },
    { id: "gaming", name: "Gaming", Icon: Gamepad2, bgColor: "#6366f1", textColor: "#fff" },
    { id: "education", name: "Education", Icon: BookOpen, bgColor: "#3b82f6", textColor: "#fff" },
]

export default function CreateBusinessPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    const [nameAvailable, setNameAvailable] = useState<boolean | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const [formData, setFormData] = useState({
        businessModel: "",
        industry: "",
        businessName: "",
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Debounced name availability check
    useEffect(() => {
        if (!formData.businessName.trim()) {
            setNameAvailable(null)
            return
        }

        setIsChecking(true)
        const timer = setTimeout(async () => {
            const result = await checkBusinessName(formData.businessName)
            setNameAvailable(result.available)
            setIsChecking(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [formData.businessName])

    const handleGenerateName = async () => {
        setIsGenerating(true)
        const result = await generateBusinessName()
        if ('name' in result) {
            updateField('businessName', result.name)
            toast.success('Nama berhasil di-generate!')
        } else {
            toast.error('Gagal generate nama')
        }
        setIsGenerating(false)
    }

    const handleNext = () => {
        if (step === 2 && !formData.businessModel) {
            toast.error("Pilih model bisnis terlebih dahulu")
            return
        }
        if (step === 3 && !formData.industry) {
            toast.error("Pilih industri terlebih dahulu")
            return
        }
        setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = async () => {
        if (!formData.businessName.trim()) {
            toast.error("Nama bisnis harus diisi")
            return
        }

        setIsLoading(true)
        const fd = new FormData()
        fd.append('name', formData.businessName)
        fd.append('model', formData.businessModel)
        fd.append('industry', formData.industry)

        const result = await createBusiness(fd)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
    }

    const filteredIndustries = INDUSTRIES.filter(ind =>
        ind.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalSteps = 4
    const progress = (step / totalSteps) * 100

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col text-white">
            {/* Progress Bar */}
            <div className="px-6 pt-6">
                <div className="max-w-2xl mx-auto flex items-center gap-4">
                    {step > 1 && (
                        <button onClick={handleBack} className="text-neutral-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <div className="flex-1 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl">
                    {/* Step 1: Welcome */}
                    {step === 1 && (
                        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight">Let's create your business</h1>
                                <p className="text-neutral-400 text-lg">
                                    Businesses on CUANBOSS earn over Rp 10 billion every year. Let's build yours now.
                                </p>
                            </div>
                            <Button
                                onClick={handleNext}
                                className="bg-blue-600 hover:bg-blue-700 h-12 px-12 rounded-xl text-base font-semibold transition-all hover:scale-105 active:scale-95"
                            >
                                Continue
                            </Button>
                        </div>
                    )}

                    {/* Step 2: Business Model */}
                    {step === 2 && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h1 className="text-3xl font-bold text-center tracking-tight">Which model best describes your offer?</h1>

                            <div className="grid grid-cols-3 gap-3">
                                {BUSINESS_MODELS.map((model, index) => (
                                    <button
                                        key={model.id}
                                        onClick={() => {
                                            updateField("businessModel", model.id)
                                            setTimeout(() => setStep(3), 250)
                                        }}
                                        className={`group relative p-5 rounded-xl text-left border transform transition-all duration-200 
                                            hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98]
                                            ${formData.businessModel === model.id
                                                ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                                                : "border-[#1f1f1f] bg-[#0f0f0f] hover:bg-[#141414] hover:border-[#2a2a2a]"
                                            }`}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                        }}
                                    >
                                        {/* Gradient glow on hover */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            style={{
                                                background: `radial-gradient(ellipse at bottom, ${model.bgColor}25, transparent 70%)`
                                            }}
                                        />

                                        <div className="relative z-10 space-y-3">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                                                style={{ backgroundColor: model.bgColor }}
                                            >
                                                <model.Icon className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6" style={{ color: model.textColor }} />
                                            </div>
                                            <span className="block font-medium text-[15px] text-white group-hover:text-white/90 transition-colors">{model.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Industry */}
                    {step === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h1 className="text-3xl font-bold text-center tracking-tight">Which industry best describes your offer?</h1>

                            {/* Search */}
                            <div className="relative max-w-md mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                <Input
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-[#0f0f0f] border-[#1f1f1f] text-white pl-11 h-11 rounded-xl focus:border-[#333]"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-2">
                                {filteredIndustries.map((industry, index) => (
                                    <button
                                        key={industry.id}
                                        onClick={() => {
                                            updateField("industry", industry.id)
                                            setTimeout(() => setStep(4), 250)
                                        }}
                                        className={`group relative p-5 rounded-xl text-left border transform transition-all duration-200
                                            hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98]
                                            ${formData.industry === industry.id
                                                ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                                                : "border-[#1f1f1f] bg-[#0f0f0f] hover:bg-[#141414] hover:border-[#2a2a2a]"
                                            }`}
                                        style={{
                                            animationDelay: `${index * 30}ms`,
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            style={{
                                                background: `radial-gradient(ellipse at bottom, ${industry.bgColor}25, transparent 70%)`
                                            }}
                                        />

                                        <div className="relative z-10 space-y-3">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                                                style={{ backgroundColor: industry.bgColor }}
                                            >
                                                <industry.Icon className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6" style={{ color: industry.textColor }} />
                                            </div>
                                            <span className="block font-medium text-[15px] text-white group-hover:text-white/90 transition-colors">{industry.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Business Name */}
                    {step === 4 && (
                        <div className="space-y-8 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">Name your business</h1>
                                <p className="text-neutral-500">This can be changed later</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                            placeholder="Enter business name"
                                            value={formData.businessName}
                                            onChange={(e) => updateField("businessName", e.target.value)}
                                            className={`bg-[#0f0f0f] border-[#1f1f1f] text-white h-12 rounded-xl text-base pr-24 focus:border-[#333] transition-all ${formData.businessName && nameAvailable === true ? 'border-green-500/50' : ''
                                                } ${formData.businessName && nameAvailable === false ? 'border-red-500/50' : ''
                                                }`}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            {/* Availability indicator */}
                                            {formData.businessName && (
                                                <div className="flex items-center">
                                                    {isChecking ? (
                                                        <Loader2 className="w-4 h-4 text-neutral-500 animate-spin" />
                                                    ) : nameAvailable === true ? (
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    ) : nameAvailable === false ? (
                                                        <X className="w-4 h-4 text-red-500" />
                                                    ) : null}
                                                </div>
                                            )}
                                            {/* Generate button */}
                                            <button
                                                onClick={handleGenerateName}
                                                disabled={isGenerating}
                                                className="text-neutral-500 hover:text-purple-400 transition-colors hover:scale-110 active:scale-95 disabled:opacity-50"
                                                title="Generate random name"
                                            >
                                                {isGenerating ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <Sparkles className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {/* Availability message */}
                                    {formData.businessName && !isChecking && nameAvailable === false && (
                                        <p className="text-red-400 text-sm">Nama ini sudah dipakai. Coba nama lain atau klik ✨ untuk generate.</p>
                                    )}
                                    {formData.businessName && !isChecking && nameAvailable === true && (
                                        <p className="text-green-400 text-sm">Nama tersedia!</p>
                                    )}
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !formData.businessName.trim() || nameAvailable === false || isChecking}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-[#1a1a1a] disabled:text-neutral-600 h-12 rounded-xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Create business"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
