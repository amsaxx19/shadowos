"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Sparkles, Image as ImageIcon, Video, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { createProduct } from "../actions"

export default function CreateProductPage() {
    const [visibility, setVisibility] = useState(true)
    const [faqs, setFaqs] = useState([{ question: "", answer: "" }])

    const addFaq = () => {
        setFaqs([...faqs, { question: "", answer: "" }])
    }

    const removeFaq = (index: number) => {
        setFaqs(faqs.filter((_, i) => i !== index))
    }

    const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
        const newFaqs = [...faqs]
        newFaqs[index][field] = value
        setFaqs(newFaqs)
    }

    return (
        <form action={createProduct} className="flex h-full bg-[#0e0e0e] text-white overflow-hidden">
            <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />

            {/* Left Column: Form (Scrollable) */}
            <div className="w-full max-w-[600px] flex flex-col border-r border-[#222] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-[#222] flex items-center gap-4 sticky top-0 bg-[#0e0e0e] z-10">
                    <Link href="/dashboard/products">
                        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <span>Produk</span>
                        <span>/</span>
                        <span className="text-white font-medium">Buat produk</span>
                    </div>
                </div>

                <div className="p-6 space-y-8 pb-32">
                    {/* Product Type */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Tipe Produk</h3>
                        <div className="p-4 rounded-lg border border-[#222] bg-[#161616]">
                            <Select defaultValue="coaching" name="type">
                                <SelectTrigger className="bg-transparent border-none text-white focus:ring-0 px-0 h-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                            <Sparkles className="h-4 w-4" />
                                        </div>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-[#161616] border-[#222] text-white">
                                    <SelectItem value="coaching">Coaching dan kursus</SelectItem>
                                    <SelectItem value="community">Komunitas</SelectItem>
                                    <SelectItem value="software">Software</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-neutral-400">Kategori</h3>
                        <Select defaultValue="clipping" name="category">
                            <SelectTrigger className="bg-[#161616] border-[#222] text-white h-12">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 rounded bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">
                                        📺
                                    </div>
                                    <SelectValue placeholder="Pilih kategori" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#161616] border-[#222] text-white">
                                <SelectItem value="clipping">Clipping</SelectItem>
                                <SelectItem value="trading">Trading</SelectItem>
                                <SelectItem value="ecom">Ecommerce</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6 pt-4 border-t border-[#222]">
                        <h3 className="text-lg font-bold">Detail Produk</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Nama</label>
                            <div className="relative">
                                <Input
                                    name="name"
                                    defaultValue="Akses Dasar"
                                    className="bg-[#161616] border-[#222] text-white h-12 pr-10"
                                    required
                                />
                                <div className="absolute right-3 top-3 h-6 w-6 rounded bg-[#222] border border-[#333] flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-purple-500" />
                                </div>
                            </div>
                            <div className="text-right text-xs text-neutral-600">0 / 30</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Headline</label>
                            <div className="relative">
                                <Input
                                    name="headline"
                                    defaultValue="Cara Membangun Aplikasi Viral: $0 sampai $100k/bln"
                                    className="bg-[#161616] border-[#222] text-white h-12 pr-10"
                                />
                                <div className="absolute right-3 top-3 h-6 w-6 rounded bg-[#222] border border-[#333] flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-purple-500" />
                                </div>
                            </div>
                            <div className="text-right text-xs text-neutral-600">0 / 80</div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Deskripsi</label>
                            <Textarea
                                name="description"
                                placeholder="Jelaskan penawaran Anda secara detail..."
                                className="bg-[#161616] border-[#222] text-white min-h-[120px] resize-none"
                            />
                            <div className="text-right text-xs text-neutral-600">0 / 1500</div>
                        </div>
                    </div>

                    {/* Product Media */}
                    <div className="space-y-4 pt-4 border-t border-[#222]">
                        <h3 className="text-lg font-bold">Media Produk</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-900 to-purple-900 border border-[#222] flex items-center justify-center relative group cursor-pointer">
                                <div className="text-center">
                                    <p className="text-xs font-medium text-white/80">Elevate Academy: Coaching & Courses</p>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                                    <span className="h-2 w-2 bg-white rounded-full" /> Edit
                                </div>
                            </div>
                            <div className="aspect-video rounded-lg border border-dashed border-[#333] bg-[#161616] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#222] transition-colors">
                                <div className="flex gap-2">
                                    <Video className="h-5 w-5 text-neutral-500" />
                                    <ImageIcon className="h-5 w-5 text-neutral-500" />
                                </div>
                                <span className="text-sm font-medium text-neutral-400">Tambah video dan foto</span>
                                <span className="text-xs text-neutral-600">Atau drag and drop</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4 pt-4 border-t border-[#222]">
                        <h3 className="text-lg font-bold">Harga</h3>
                        <div className="text-sm text-neutral-400 mb-2">$100.00 sekali bayar</div>

                        <div className="p-4 rounded-lg border border-[#222] bg-[#161616] space-y-4">
                            <Tabs defaultValue="one-time" className="w-full">
                                <TabsList className="w-full bg-[#0e0e0e] border border-[#222]">
                                    <TabsTrigger value="free" className="flex-1 data-[state=active]:bg-[#222] data-[state=active]:text-white">Gratis</TabsTrigger>
                                    <TabsTrigger value="one-time" className="flex-1 data-[state=active]:bg-[#222] data-[state=active]:text-white">Sekali Bayar</TabsTrigger>
                                    <TabsTrigger value="recurring" className="flex-1 data-[state=active]:bg-[#222] data-[state=active]:text-white">Berlangganan</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-3 text-neutral-500">$</span>
                                    <Input
                                        name="price"
                                        defaultValue="100"
                                        className="bg-[#0e0e0e] border-[#222] text-white h-12 pl-8"
                                        required
                                    />
                                </div>
                                <div className="w-[100px]">
                                    <Select defaultValue="usd">
                                        <SelectTrigger className="bg-[#0e0e0e] border-[#222] text-white h-12">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#161616] border-[#222] text-white">
                                            <SelectItem value="usd">USD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-[#222] rounded text-xs text-neutral-400">$50</div>
                                <div className="px-2 py-1 bg-[#222] rounded text-xs text-neutral-400">$100</div>
                                <div className="px-2 py-1 bg-[#222] rounded text-xs text-neutral-400">$250</div>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full border-[#222] bg-[#161616] text-blue-500 hover:bg-[#222] hover:text-blue-400">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah opsi harga lain
                        </Button>
                    </div>

                    {/* Features & FAQs */}
                    <div className="space-y-4 pt-4 border-t border-[#222]">
                        <h3 className="text-lg font-bold">Fitur</h3>
                        <Button variant="outline" className="w-full justify-start border-[#222] bg-[#161616] text-blue-500 hover:bg-[#222] hover:text-blue-400">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah fitur
                        </Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-[#222]">
                        <h3 className="text-lg font-bold">FAQ (Tanya Jawab)</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="space-y-2 p-4 rounded-lg bg-[#161616] border border-[#222] relative group">
                                    <Input
                                        placeholder="Pertanyaan (Contoh: Apakah ini cocok untuk pemula?)"
                                        value={faq.question}
                                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                        className="bg-[#0e0e0e] border-[#333] text-white mb-2"
                                    />
                                    <Textarea
                                        placeholder="Jawaban"
                                        value={faq.answer}
                                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                        className="bg-[#0e0e0e] border-[#333] text-white min-h-[80px]"
                                    />
                                    {faqs.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFaq(index)}
                                            className="absolute top-2 right-2 text-neutral-500 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            onClick={addFaq}
                            variant="outline"
                            className="w-full justify-start border-[#222] bg-[#161616] text-blue-500 hover:bg-[#222] hover:text-blue-400"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah item FAQ...
                        </Button>
                    </div>

                    {/* Advanced: Visibility */}
                    <div className="space-y-4 pt-4 border-t border-[#222]">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-[#222] bg-[#161616]">
                            <div className="flex gap-3">
                                <Eye className="h-5 w-5 text-neutral-400 mt-1" />
                                <div>
                                    <div className="font-medium text-white">Terlihat di halaman toko</div>
                                    <div className="text-sm text-neutral-500 max-w-[300px]">
                                        Secara default, produk ini akan terlihat oleh publik di halaman toko Anda.
                                    </div>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "w-12 h-7 rounded-full p-1 cursor-pointer transition-colors",
                                    visibility ? "bg-blue-600" : "bg-[#333]"
                                )}
                                onClick={() => setVisibility(!visibility)}
                            >
                                <div className={cn(
                                    "h-5 w-5 rounded-full bg-white transition-transform",
                                    visibility ? "translate-x-5" : "translate-x-0"
                                )} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="p-4 border-t border-[#222] bg-[#0e0e0e] sticky bottom-0 z-10">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium">
                        Simpan
                    </Button>
                </div>
            </div>

            {/* Right Column: Preview */}
            <div className="flex-1 bg-[#000] p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl space-y-4">
                    <h2 className="text-lg font-medium text-white">Preview halaman produk</h2>

                    {/* Browser Mockup */}
                    <div className="rounded-xl border border-[#222] bg-[#0e0e0e] overflow-hidden shadow-2xl">
                        {/* Browser Bar */}
                        <div className="h-10 bg-[#161616] border-b border-[#222] flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-[#333]" />
                                <div className="h-3 w-3 rounded-full bg-[#333]" />
                                <div className="h-3 w-3 rounded-full bg-[#333]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="bg-[#0e0e0e] px-4 py-1 rounded text-xs text-neutral-500 border border-[#222]">
                                    whop.com/elevate-academy-coaching-courses-3103
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8 min-h-[500px]">
                            {/* Hero Card */}
                            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
                                <div className="text-center z-10">
                                    <h1 className="text-2xl font-bold text-white">Elevate Academy: Coaching & Courses</h1>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            </div>

                            {/* Pricing Card */}
                            <div className="rounded-xl border border-[#222] bg-[#161616] p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-white">$100.00 sekali</span>
                                </div>
                                <Button className="w-full bg-[#222] hover:bg-[#333] text-white h-12 font-medium border border-[#333]">
                                    Gabung
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
