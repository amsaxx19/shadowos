import { createProduct } from '../actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, DollarSign, Type, FileText, User } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function NewProductPage() {
    const supabase = await createClient()
    const { data: creators } = await supabase.from('users').select('id, full_name, email').eq('role', 'creator')

    return (
        <div className="min-h-screen bg-[#0055D4] relative font-sans -m-8 p-8">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/operator/products">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 text-white hover:text-blue-600">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Create New Product</h1>
                        <p className="text-blue-100">Start selling your digital assets in minutes.</p>
                    </div>
                </div>

                <form action={createProduct} className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        {/* Product Details Card */}
                        <Card className="border-none shadow-xl bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-950">
                                    <Type className="h-5 w-5 text-[#0055D4]" />
                                    Product Details
                                </CardTitle>
                                <CardDescription className="text-blue-500">Basic information about your product.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-blue-900">Product Name</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g. Ultimate Coding Guide 2024"
                                        className="!bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 focus:ring-[#0055D4] focus:border-[#0055D4]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-blue-900">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Describe what your customers will get..."
                                        className="min-h-[150px] !bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 focus:ring-[#0055D4] focus:border-[#0055D4]"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pricing Card */}
                        <Card className="border-none shadow-xl bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-950">
                                    <DollarSign className="h-5 w-5 text-emerald-600" />
                                    Pricing & Revenue Split
                                </CardTitle>
                                <CardDescription className="text-blue-500">Set your price and how you want to split earnings.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-blue-900">Price (IDR)</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-blue-500">Rp</span>
                                            <Input
                                                id="price"
                                                name="price"
                                                type="number"
                                                placeholder="100000"
                                                className="pl-10 !bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 focus:ring-[#0055D4] focus:border-[#0055D4]"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="creator_split" className="text-blue-900">Creator Split (%)</Label>
                                        <div className="relative">
                                            <Input
                                                id="creator_split"
                                                name="creator_split"
                                                type="number"
                                                placeholder="70"
                                                max="100"
                                                min="0"
                                                className="!bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 focus:ring-[#0055D4] focus:border-[#0055D4]"
                                                required
                                            />
                                            <span className="absolute right-3 top-2.5 text-blue-500">%</span>
                                        </div>
                                        <p className="text-xs text-blue-500">Operator gets the remaining percentage automatically.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Creator Assignment Card */}
                        <Card className="border-none shadow-xl bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-950">
                                    <User className="h-5 w-5 text-purple-600" />
                                    Assign Creator
                                </CardTitle>
                                <CardDescription className="text-blue-500">Who is this product for?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="creator_id" className="text-blue-900">Select Creator</Label>
                                    <Select name="creator_id" required>
                                        <SelectTrigger className="!bg-white border-blue-200 text-blue-900">
                                            <SelectValue placeholder="Select a creator" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-blue-100 text-blue-900">
                                            {creators?.map((creator) => (
                                                <SelectItem key={creator.id} value={creator.id} className="focus:bg-blue-50 focus:text-blue-900">
                                                    {creator.full_name} ({creator.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {/* Media/Upload Card (Mock) */}
                        <Card className="border-none shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Upload className="h-5 w-5 text-blue-200" />
                                    Product File
                                </CardTitle>
                                <CardDescription className="text-blue-100">Upload the digital asset.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/30 bg-white/5 p-8 text-center hover:bg-white/10 transition-colors cursor-pointer group">
                                    <FileText className="h-10 w-10 text-blue-200 mb-4 group-hover:scale-110 transition-transform" />
                                    <p className="text-sm font-medium text-white">Drop your file here</p>
                                    <p className="text-xs text-blue-200 mt-1">PDF, ZIP, or MP4 (Max 500MB)</p>
                                </div>
                                <Input type="hidden" name="file_url" value="https://example.com/mock-file.pdf" />
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="sticky top-8">
                            <Button type="submit" size="lg" className="w-full bg-white text-[#0055D4] hover:bg-blue-50 font-bold shadow-lg transition-all hover:scale-[1.02]">
                                Create Product
                            </Button>
                            <p className="text-xs text-center text-blue-200 mt-4">
                                By creating this product, you agree to the ShadowOS terms of service.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
