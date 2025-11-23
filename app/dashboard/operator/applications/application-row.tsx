"use client"

import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink, Instagram } from "lucide-react"
import { TikTok } from "@/components/icons/tiktok"
import { approveApplication, rejectApplication } from "./actions"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

interface ApplicationRowProps {
    application: any
}

export function ApplicationRow({ application }: ApplicationRowProps) {
    const [loading, setLoading] = useState(false)

    const handleApprove = async () => {
        setLoading(true)
        try {
            await approveApplication(application.id, application.email, application.full_name)
            toast.success("Application approved and user created")
        } catch (error) {
            toast.error("Failed to approve application")
        } finally {
            setLoading(false)
        }
    }

    const handleReject = async () => {
        setLoading(true)
        try {
            await rejectApplication(application.id)
            toast.success("Application rejected")
        } catch (error) {
            toast.error("Failed to reject application")
        } finally {
            setLoading(false)
        }
    }

    if (application.status !== 'pending') {
        return (
            <tr className="hover:bg-blue-50/30 transition-colors opacity-60">
                <td className="px-6 py-4 font-bold text-blue-950">{application.full_name}</td>
                <td className="px-6 py-4 text-blue-600">{application.email}</td>
                <td className="px-6 py-4 text-blue-600">
                    <div className="flex flex-col gap-1">
                        {application.instagram_link && (
                            <Link href={application.instagram_link} target="_blank" className="flex items-center gap-1 hover:underline text-xs">
                                <Instagram className="h-3 w-3" /> Instagram
                            </Link>
                        )}
                        {application.tiktok_link && (
                            <Link href={application.tiktok_link} target="_blank" className="flex items-center gap-1 hover:underline text-xs">
                                <TikTok className="h-3 w-3" /> TikTok
                            </Link>
                        )}
                        {!application.instagram_link && !application.tiktok_link && "-"}
                    </div>
                </td>
                <td className="px-6 py-4 text-blue-900">{application.follower_count}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide
                        ${application.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {application.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    -
                </td>
            </tr>
        )
    }

    return (
        <tr className="hover:bg-blue-50/30 transition-colors">
            <td className="px-6 py-4 font-bold text-blue-950">{application.full_name}</td>
            <td className="px-6 py-4 text-blue-600">{application.email}</td>
            <td className="px-6 py-4 text-blue-600">
                {application.social_link ? (
                    <Link href={application.social_link} target="_blank" className="flex items-center gap-1 hover:underline">
                        Link <ExternalLink className="h-3 w-3" />
                    </Link>
                ) : "-"}
            </td>
            <td className="px-6 py-4 text-blue-900">{application.follower_count}</td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-700">
                    Pending
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="sm"
                        className="h-8 bg-green-600 hover:bg-green-700 text-white"
                        onClick={handleApprove}
                        disabled={loading}
                    >
                        <Check className="h-4 w-4 mr-1" /> Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                        onClick={handleReject}
                        disabled={loading}
                    >
                        <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                </div>
            </td>
        </tr>
    )
}
