"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    Settings,
    Link as LinkIcon,
    Shield,
    CreditCard,
    Wallet,
    ShoppingBag,
    AlertTriangle,
    LogOut,
    Pencil,
    Loader2,
    Check
} from "lucide-react"
import { cn } from "@/lib/utils"
import { updateProfile } from "@/app/actions/profile"
import { signOutAction } from "@/app/actions/auth"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProfileFormProps {
    user: {
        id: string
        email: string
        full_name: string | null
        username: string | null
        bio: string | null
        phone: string | null
    }
}

const COUNTRY_CODES = [
    { code: "ID", dial: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
    { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "MY", dial: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
    { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
    { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
]

export default function ProfileForm({ user }: ProfileFormProps) {
    const [activeTab, setActiveTab] = useState("general")
    const [isPending, startTransition] = useTransition()
    const [isLogoutPending, startLogoutTransition] = useTransition()

    // Parse initial phone number to split code and number if possible
    // This is a simple heuristic, assuming the phone starts with the dial code
    const initialDialCode = COUNTRY_CODES.find(c => user.phone?.startsWith(c.dial))?.dial || "+62"
    const initialPhoneNumber = user.phone ? user.phone.replace(initialDialCode, "") : ""

    const [countryCode, setCountryCode] = useState(initialDialCode)
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)

    const [visibility, setVisibility] = useState({
        joinedWhops: true,
        ownedWhops: true,
        location: true
    })

    const sidebarItems = [
        { id: "general", label: "General", icon: Settings },
        { id: "connected", label: "Connected accounts", icon: LinkIcon },
        { id: "security", label: "Security & Privacy", icon: Shield },
        { id: "payment", label: "Payment methods", icon: CreditCard, external: true },
        { id: "balance", label: "Balance", icon: Wallet },
        { id: "orders", label: "Orders", icon: ShoppingBag },
        { id: "resolution", label: "Resolution center", icon: AlertTriangle },
        { id: "danger", label: "Danger zone", icon: AlertTriangle },
    ]

    async function handleSubmit(formData: FormData) {
        // Combine phone number
        const fullPhone = `${countryCode}${phoneNumber}`
        formData.set("phone", fullPhone)

        startTransition(async () => {
            const result = await updateProfile(formData)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Profile updated successfully")
            }
        })
    }

    async function handleLogout() {
        startLogoutTransition(async () => {
            await signOutAction()
        })
    }

    return (
        <div className="flex h-full bg-[#0a0a0a] text-white">
            {/* Inner Sidebar */}
            <div className="w-64 border-r border-[#222] flex flex-col h-full">
                <div className="p-6 pb-2">
                    <h1 className="text-xl font-bold mb-6">Account settings</h1>

                    {/* User Profile Summary */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 font-bold text-lg">
                            {user.full_name ? user.full_name.substring(0, 2).toUpperCase() : "U"}
                        </div>
                        <div>
                            <div className="font-bold truncate max-w-[140px]">{user.full_name || "User"}</div>
                            <div className="text-xs text-neutral-500 truncate max-w-[140px]">@{user.username || "username"}</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                activeTab === item.id
                                    ? "bg-[#1c1c1c] text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-[#161616]"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#222]">
                    <button
                        onClick={handleLogout}
                        disabled={isLogoutPending}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                        {isLogoutPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto p-8 space-y-8">

                    {activeTab === "general" ? (
                        <form action={handleSubmit} className="space-y-8">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label className="text-neutral-400">Name</Label>
                                <Input
                                    name="full_name"
                                    defaultValue={user.full_name || ""}
                                    className="bg-[#111] border-[#222] text-white focus:border-blue-600 transition-colors"
                                />
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <Label className="text-neutral-400">Bio</Label>
                                <Textarea
                                    name="bio"
                                    defaultValue={user.bio || ""}
                                    placeholder="No bio"
                                    className="bg-[#111] border-[#222] text-white focus:border-blue-600 transition-colors min-h-[100px] resize-none"
                                />
                            </div>

                            {/* Username */}
                            <div className="space-y-2">
                                <Label className="text-neutral-400">Username</Label>
                                <Input
                                    name="username"
                                    defaultValue={user.username || ""}
                                    className="bg-[#111] border-[#222] text-white focus:border-blue-600 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label className="text-neutral-400">Email</Label>
                                <div className="relative">
                                    <Input
                                        defaultValue={user.email}
                                        className="bg-[#111] border-[#222] text-neutral-400 focus:border-blue-600 transition-colors pr-10"
                                        readOnly
                                        disabled
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 cursor-not-allowed">
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <Label className="text-neutral-400">Phone number</Label>
                                <div className="flex gap-2">
                                    <Select value={countryCode} onValueChange={setCountryCode}>
                                        <SelectTrigger className="w-[110px] !h-10 bg-[#111] border-[#222] text-white focus:ring-blue-600">
                                            <SelectValue placeholder="Code" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#111] border-[#222] text-white">
                                            {COUNTRY_CODES.map((country) => (
                                                <SelectItem key={country.code} value={country.dial} className="focus:bg-[#222] focus:text-white">
                                                    <span className="mr-2">{country.flag}</span>
                                                    {country.dial}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="relative flex-1">
                                        <Input
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="81234567890"
                                            className="!h-10 py-2 text-sm bg-[#111] border-[#222] text-white focus:border-blue-600 transition-colors pr-10"
                                        />
                                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Visibility Settings */}
                            <div className="pt-6 border-t border-[#222] space-y-6">
                                <div>
                                    <h3 className="font-bold text-white mb-1">What can people see in your profile?</h3>
                                    <p className="text-sm text-neutral-500">Anything you hide here won't be visible to others—and you won't see it on their profiles either.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-neutral-300 font-normal">Joined whops</Label>
                                        <Switch
                                            checked={visibility.joinedWhops}
                                            onCheckedChange={(c) => setVisibility({ ...visibility, joinedWhops: c })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-neutral-300 font-normal">Owned whops</Label>
                                        <Switch
                                            checked={visibility.ownedWhops}
                                            onCheckedChange={(c) => setVisibility({ ...visibility, ownedWhops: c })}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label className="text-neutral-300 font-normal">Approximate location</Label>
                                        <Switch
                                            checked={visibility.location}
                                            onCheckedChange={(c) => setVisibility({ ...visibility, location: c })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[60vh] text-neutral-500">
                            <Settings className="h-12 w-12 mb-4 opacity-20" />
                            <h3 className="text-lg font-medium text-neutral-400">Coming Soon</h3>
                            <p className="text-sm">This section is under development.</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
