"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { completeOnboarding } from "./actions"

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        birthMonth: "",
        birthDay: "",
        birthYear: "",
        avatarUrl: "",
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        if (step === 1 && !formData.fullName) {
            toast.error("Nama harus diisi")
            return
        }
        if (step === 2 && !formData.username) {
            toast.error("Username harus diisi")
            return
        }
        if (step === 3 && (!formData.birthMonth || !formData.birthDay || !formData.birthYear)) {
            toast.error("Tanggal lahir harus diisi")
            return
        }

        if (step < 4) {
            setStep(step + 1)
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File terlalu besar. Maksimal 2MB")
            return
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.error("File harus berupa gambar")
            return
        }

        // Convert to base64 for preview (in production, upload to storage)
        const reader = new FileReader()
        reader.onloadend = () => {
            updateField("avatarUrl", reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const result = await completeOnboarding({
                full_name: formData.fullName,
                username: formData.username,
                birthday: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
                avatar_url: formData.avatarUrl || "", // Can be empty (uses initials)
            })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Profil berhasil dibuat!")
                router.push(result.redirectUrl || "/dashboard")
            }
        } catch (error) {
            toast.error("Terjadi kesalahan")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    // Get initials for avatar fallback
    const getInitials = () => {
        if (!formData.fullName) return "?"
        const names = formData.fullName.trim().split(' ')
        if (names.length === 1) return names[0].charAt(0).toUpperCase()
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 text-white">
            {/* Logo */}
            <div className="absolute top-8">
                <Link href="/" className="text-orange-500 text-2xl">⚡</Link>
            </div>

            {/* Help Icon */}
            <div className="absolute top-8 right-8">
                <button className="text-neutral-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-md">
                {/* Step 1: Name */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">What's your name?</h1>
                            <p className="text-neutral-400">This will show on your profile and help others know who you are 🎯</p>
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="John Appleseed"
                                value={formData.fullName}
                                onChange={(e) => updateField("fullName", e.target.value)}
                                className="bg-[#1a1a1a] border-[#333] text-white placeholder:text-neutral-600 h-12 rounded-xl text-lg px-4"
                            />
                            <Button
                                onClick={handleNext}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-base font-semibold"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Username */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">Pick your username</h1>
                            <p className="text-neutral-400">It's like claiming your Instagram handle in 2012 ⚡</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative flex items-center bg-[#1a1a1a] border border-[#333] rounded-xl h-12 overflow-hidden focus-within:border-blue-500">
                                <span className="text-neutral-500 pl-4 pr-1 text-base whitespace-nowrap">
                                    cuanboss.com/@
                                </span>
                                <input
                                    type="text"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={(e) => updateField("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                    className="flex-1 bg-transparent text-white placeholder:text-neutral-600 h-full text-base px-1 outline-none"
                                />
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-base font-semibold"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Birthday */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">What is your birthday?</h1>
                            <p className="text-neutral-400">In order to give you the best experience on CUANBOSS, please enter your birthday.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-2 justify-center">
                                <Select value={formData.birthMonth} onValueChange={(val) => updateField("birthMonth", val)}>
                                    <SelectTrigger className="bg-[#1a1a1a] border-[#333] h-11 rounded-lg w-auto min-w-[120px]">
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] border-[#333]">
                                        {months.map((month, idx) => (
                                            <SelectItem key={month} value={String(idx + 1).padStart(2, '0')}>{month}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={formData.birthDay} onValueChange={(val) => updateField("birthDay", val)}>
                                    <SelectTrigger className="bg-[#1a1a1a] border-[#333] h-11 rounded-lg w-auto min-w-[70px]">
                                        <SelectValue placeholder="Day" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] border-[#333]">
                                        {days.map(day => (
                                            <SelectItem key={day} value={String(day).padStart(2, '0')}>{day}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={formData.birthYear} onValueChange={(val) => updateField("birthYear", val)}>
                                    <SelectTrigger className="bg-[#1a1a1a] border-[#333] h-11 rounded-lg w-auto min-w-[90px]">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1a1a] border-[#333]">
                                        {years.map(year => (
                                            <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-base font-semibold"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Profile Picture */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold">Choose your profile picture</h1>
                            <p className="text-neutral-400">Upload an image or use your initials</p>
                        </div>

                        <div className="space-y-6">
                            {/* Avatar Preview */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold overflow-hidden">
                                    {formData.avatarUrl ? (
                                        <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        getInitials()
                                    )}
                                </div>

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />

                                <Button
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-[#1a1a1a] border-[#333] hover:bg-[#222] gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload image
                                </Button>
                                <p className="text-xs text-neutral-500">Max 2MB • JPG, PNG, GIF</p>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl text-base font-semibold"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full text-neutral-400 hover:text-white h-10"
                                >
                                    Skip for now
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
