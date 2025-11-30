import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, MessageCircle, Share2, MoreHorizontal, Search, Send } from 'lucide-react'

export default async function HomePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Mock Feed Data (Set to empty to show Empty State as requested)
    const posts: any[] = []
    /* 
    // Uncomment to see populated feed
    const posts = [
        {
            id: 1,
            creator: {
                name: "Tyler",
                handle: "@tcartiii",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tyler",
                verified: true
            },
            timestamp: "Nov 28 at 7:14 AM",
            title: "NEON x Telegram",
            content: `💸 Payout Structure:
• $1 per 1,000 views (CPM-based)
• Minimum payout: $5
• Maximum payout: $300 per video

💰 Budget:
• Current budget: $9,000
• Increasing to $20,000 next week — so creators can make way more as the campaign scales.

🔗 Campaign Link: https://whop.com/cliphubde/cliphub-international/`,
            image: "/placeholder-neon.jpg",
            likes: 39,
            views: "7,740",
            community: "Whop Clips Clipping Deals"
        },
        {
            id: 2,
            creator: {
                name: "Tyler",
                handle: "@tcartiii",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tyler",
                verified: true
            },
            timestamp: "Nov 22 at 2:59 AM",
            title: "Jon Law Clipping",
            content: `RPM: $2.50 per 1k views
Budget: $5,000
Platforms: IG, TT, YT, X

Join Here: https://whop.com/jon-law-clipping/`,
            image: "/placeholder-jon.jpg",
            likes: 24,
            views: "5,200",
            community: "Whop Clips Clipping Deals"
        }
    ]
    */

    // Mock Chat Data
    const activeChats = [
        { name: "Whop Clips Chat", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=WC", active: true },
        { name: "Chat", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=C", active: false },
        { name: "Dawson Gant...", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DG", active: false },
        { name: "Free Chat", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=FC", active: false },
    ]

    return (
        <div className="flex h-full">
            {/* Main Feed Area */}
            <div className="flex-1 max-w-3xl mx-auto py-8 px-4 space-y-6">
                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8">
                        {/* Skeleton Card */}
                        <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-xl p-6 space-y-4 opacity-50 select-none pointer-events-none">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-[#222]" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-3 w-1/3 bg-[#222] rounded" />
                                    <div className="h-2 w-1/4 bg-[#222] rounded" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 w-full bg-[#222] rounded" />
                                <div className="h-3 w-full bg-[#222] rounded" />
                                <div className="h-3 w-2/3 bg-[#222] rounded" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white">Looks like there aren't any posts yet.</h3>
                            <p className="text-neutral-500 mt-1">Be the first one to make a post!</p>
                        </div>
                    </div>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="bg-[#111] border-[#222] overflow-hidden">
                            <div className="p-4 space-y-4">
                                {/* Header */}
                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <div className="h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center">
                                        <span className="text-[10px]">W</span>
                                    </div>
                                    <span>{post.community}</span>
                                    <span>•</span>
                                    <span>Whop</span>
                                </div>

                                {/* Author */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-neutral-800 overflow-hidden relative">
                                            <Image src={post.creator.avatar} alt={post.creator.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-white">{post.creator.name}</span>
                                                {post.creator.verified && <span className="text-orange-500 text-xs">🔥</span>}
                                            </div>
                                            <p className="text-xs text-neutral-500">{post.creator.handle} • {post.timestamp}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="font-bold text-white">{post.title}</h3>
                                    <p className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                                        {post.content}
                                    </p>
                                </div>

                                {/* Image Placeholder (Gradient) */}
                                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="text-4xl font-black text-white/20 uppercase tracking-tighter text-center px-4">
                                            {post.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-2 border-t border-[#222]">
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white gap-2 px-2">
                                            <Heart className="h-4 w-4" />
                                            <span>{post.likes}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white gap-2 px-2">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>Comment</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white gap-2 px-2">
                                            <Share2 className="h-4 w-4" />
                                            <span>Share</span>
                                        </Button>
                                    </div>
                                    <div className="text-xs text-neutral-600 font-medium flex items-center gap-1">
                                        <span className="text-neutral-500">ılı</span> {post.views}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Right Sidebar (Chat) */}
            <div className="w-80 border-l border-[#222] bg-[#0e0e0e] hidden xl:flex flex-col">
                <div className="p-4 border-b border-[#222]">
                    <h2 className="font-bold text-neutral-400 mb-4">Chatting now</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {activeChats.map((chat, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer group">
                                <div className={`h-12 w-12 rounded-xl overflow-hidden relative border-2 ${chat.active ? 'border-orange-500' : 'border-transparent group-hover:border-neutral-700'}`}>
                                    <Image src={chat.avatar} alt={chat.name} fill className="object-cover" />
                                </div>
                                <span className="text-[10px] text-neutral-500 truncate w-full text-center">{chat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="p-3 bg-[#161616] border-b border-[#222] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="font-bold text-sm text-white">Whop Clips Chat</span>
                            <span className="text-xs text-neutral-500 bg-[#222] px-1.5 py-0.5 rounded">80</span>
                        </div>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {/* Mock Messages */}
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                👹
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-neutral-300">Demon</span>
                                    <span className="text-[10px] text-neutral-600">10:28 PM</span>
                                </div>
                                <p className="text-sm text-neutral-400 bg-[#222] p-2 rounded-lg rounded-tl-none mt-1">
                                    professional clippers . If u good hit me up
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-neutral-700 shrink-0" />
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-neutral-300">Okx</span>
                                    <span className="text-[10px] text-neutral-600">10:28 PM</span>
                                </div>
                                <p className="text-sm text-neutral-400 bg-[#222] p-2 rounded-lg rounded-tl-none mt-1">
                                    Anyone has a good instagram page, i have a opportunity for you to make a bank out of it,Tier 1 audience,1-2 mil reach
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-[#222]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Message Whop Clips Chat..."
                                className="w-full bg-[#161616] border border-[#333] rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors pr-10"
                            />
                            <button className="absolute right-2 top-2 p-1 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors">
                                <Send className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
