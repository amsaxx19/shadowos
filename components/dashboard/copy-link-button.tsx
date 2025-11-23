"use client"

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CopyLinkButtonProps {
    url: string
    label?: string
    className?: string
}

export function CopyLinkButton({ url, label = "Salin Link", className }: CopyLinkButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success("Link berhasil disalin")
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error("Gagal menyalin link")
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className={`h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 ${className}`}
            onClick={handleCopy}
        >
            {copied ? <Check className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
            {copied ? "Disalin" : label}
        </Button>
    )
}
