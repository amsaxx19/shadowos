"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Edit, CheckCircle2, Eye, Heart, RotateCcw, Reply, MoreVertical, Check, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'inbox' | 'unread' | 'requests'>('inbox')
    const [isNewMessageOpen, setIsNewMessageOpen] = useState(false)

    // Helper to toggle tabs
    const toggleTab = (tab: 'unread' | 'requests') => {
        if (activeTab === tab) {
            setActiveTab('inbox')
        } else {
            setActiveTab(tab)
        }
    }

    return (
        <div className="flex h-full w-full">
            {/* Left Sidebar: Conversation List (350px) */}
            <div className="w-[350px] border-r border-[#222] flex flex-col bg-[#0e0e0e]">
                {/* Header: Search & Edit */}
                <div className="p-4 border-b border-[#222] space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-[#1c1c1c] border-[#333] text-white placeholder:text-neutral-500 h-9 rounded-md focus:ring-0 focus:border-neutral-500"
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white"
                            onClick={() => setIsNewMessageOpen(true)}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => toggleTab('unread')}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                                activeTab === 'unread'
                                    ? "bg-blue-600 text-white"
                                    : "bg-[#222] text-white hover:bg-[#333]"
                            )}
                        >
                            {activeTab !== 'unread' && <div className="h-2 w-2 rounded-full bg-red-500" />}
                            Unread
                            <span className={cn("ml-1", activeTab === 'unread' ? "text-white" : "text-neutral-400")}>1</span>
                            {activeTab === 'unread' && <X className="h-3 w-3 ml-1" />}
                        </button>
                        <button
                            onClick={() => toggleTab('requests')}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
                                activeTab === 'requests'
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "border-[#333] text-neutral-400 hover:text-white hover:bg-[#222]"
                            )}
                        >
                            Requests
                            {activeTab === 'requests' && <X className="h-3 w-3 ml-1" />}
                        </button>
                    </div>
                </div>

                {/* Sidebar Content based on Tab */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'inbox' && (
                        /* Inbox List */
                        <div
                            onClick={() => setSelectedConversation('team-whop')}
                            className={cn(
                                "flex items-start gap-3 p-4 cursor-pointer transition-colors relative group",
                                selectedConversation === 'team-whop' ? "bg-[#161616]" : "hover:bg-[#161616]"
                            )}
                        >
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-opacity",
                                selectedConversation === 'team-whop' ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />

                            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-500 font-bold text-lg">⚡</span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-white text-sm">Team Whop</span>
                                        <CheckCircle2 className="h-3 w-3 text-red-500 fill-current" />
                                    </div>
                                    <span className="text-xs text-neutral-500">Thu</span>
                                </div>
                                <p className="text-sm text-neutral-400 truncate">
                                    Welcome to Whop! Thousands of internet entrepreneurs...
                                </p>
                            </div>

                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />
                        </div>
                    )}

                    {activeTab === 'unread' && (
                        /* Unread Empty State */
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                            <div className="h-16 w-16 rounded-full bg-[#222] flex items-center justify-center">
                                <div className="h-8 w-8 rounded-sm bg-[#333] rotate-12" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white font-medium">No unread messages</h3>
                                <p className="text-sm text-neutral-500">You are all caught up!</p>
                            </div>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                onClick={() => setIsNewMessageOpen(true)}
                            >
                                Search for a user
                            </Button>
                        </div>
                    )}

                    {activeTab === 'requests' && (
                        /* Requests Empty State */
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                            <div className="text-4xl">✌️</div>
                            <div className="space-y-2">
                                <h3 className="text-white font-medium">No message requests</h3>
                                <p className="text-sm text-neutral-500">No message requests yet.</p>
                            </div>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                onClick={() => setIsNewMessageOpen(true)}
                            >
                                Search for a user
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0e0e0e]">
                {!selectedConversation ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="bg-[#161616] border border-[#222] rounded-2xl p-8 text-center max-w-sm w-full mx-4">
                            <h2 className="text-lg font-semibold text-white mb-2">Select a message</h2>
                            <p className="text-sm text-neutral-400 mb-8">
                                Choose from your existing conversations, start a new one, or just keep swimming.
                            </p>
                            <div className="flex justify-center">
                                <div className="text-6xl">👀</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 border-b border-[#222] flex items-center justify-between px-6">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center">
                                    <span className="text-orange-500 font-bold text-sm">⚡</span>
                                </div>
                                <span className="font-bold text-white">Team Whop</span>
                                <CheckCircle2 className="h-4 w-4 text-red-500 fill-current" />
                            </div>
                            <Search className="h-5 w-5 text-neutral-500 hover:text-white cursor-pointer" />
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Date Separator */}
                            <div className="flex justify-center">
                                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide">
                                    Yesterday at 4:26 PM
                                </span>
                            </div>

                            {/* Message Group */}
                            <div className="flex items-start gap-4 group">
                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-orange-500 font-bold text-lg">⚡</span>
                                </div>

                                {/* Message Content */}
                                <div className="flex-1 max-w-3xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-white text-sm">Team Whop</span>
                                        <CheckCircle2 className="h-3 w-3 text-red-500 fill-current" />
                                        <span className="text-xs text-neutral-500">Yesterday at 4:26 PM</span>
                                    </div>

                                    <div className="bg-[#1c1c1c] rounded-r-xl rounded-bl-xl p-4 text-neutral-300 text-sm space-y-4 leading-relaxed relative">
                                        <p>Welcome to Whop!</p>
                                        <p>
                                            Thousands of internet entrepreneurs like you launch on Whop every day, and you're only 4 steps away from joining them:
                                        </p>
                                        <ol className="list-decimal list-inside space-y-1 ml-1">
                                            <li>Add apps to your whop</li>
                                            <li>Design your store page</li>
                                            <li>Set up Whop Payments</li>
                                            <li>Invite your first user</li>
                                        </ol>
                                        <p>
                                            To get started, head over to your Dashboard and complete the onboarding checklist we made for you:<br />
                                            <a href="#" className="text-white underline decoration-neutral-500 underline-offset-2 hover:decoration-white">https://whop.com/dashboard</a>
                                        </p>
                                        <p>
                                            If you've still got questions, head over to Whop University:<br />
                                            <a href="#" className="text-white underline decoration-neutral-500 underline-offset-2 hover:decoration-white">https://whop.com/whop/</a>. We run live sessions twice a day where you can drop in and ask anything.
                                        </p>
                                        <p>We're excited to see what you build!</p>

                                        {/* Hover Actions */}
                                        <div className="absolute -right-24 top-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0e0e0e] p-1 rounded-lg border border-[#222]">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-[#1c1c1c]">
                                                <Heart className="h-4 w-4 fill-current" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#1c1c1c]">
                                                <RotateCcw className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#1c1c1c]">
                                                <Reply className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-[#1c1c1c]">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Banner */}
                        <div className="p-4 bg-[#161616] border-t border-[#222]">
                            <div className="flex items-center gap-3 text-neutral-400 text-sm">
                                <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-3 w-3 text-white stroke-[3]" />
                                </div>
                                <div>
                                    <span className="font-medium text-white">This is the official Whop notification channel</span>
                                    <p className="text-xs text-neutral-500">Whop will always use verified accounts to communicate with you</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* New Message Modal */}
            <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                <DialogContent className="bg-[#161616] border-[#222] text-white p-0 gap-0 max-w-md">
                    <DialogHeader className="p-4 border-b border-[#222]">
                        <DialogTitle className="text-lg font-bold">New message</DialogTitle>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        <div className="flex items-center gap-2 bg-[#0e0e0e] border border-[#333] rounded-md px-3 py-2">
                            <span className="text-neutral-500 text-sm">To:</span>
                            <input
                                className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-neutral-600"
                                placeholder="Search users"
                            />
                        </div>

                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between p-2 hover:bg-[#222] rounded-md group">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#222] flex items-center justify-center border border-[#333] group-hover:border-neutral-500">
                                        <Users className="h-5 w-5 text-neutral-400" />
                                    </div>
                                    <span className="font-medium text-sm">Create a group chat</span>
                                </div>
                                <div className="text-neutral-500 text-lg">›</div>
                            </button>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Suggested</h4>
                            <button className="w-full flex items-center gap-3 p-2 hover:bg-[#222] rounded-md">
                                <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                                    <span className="text-orange-500 font-bold text-lg">⚡</span>
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium text-sm">Team Whop</span>
                                        <CheckCircle2 className="h-3 w-3 text-red-500 fill-current" />
                                    </div>
                                    <p className="text-xs text-neutral-500">@teamwhop</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
