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
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/operator/products">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
                    <p className="text-zinc-400">Start selling your digital assets in minutes.</p>
                </div>
            </div>

            <form action={createProduct} className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    {/* Product Details Card */}
                    <Card className="border-zinc-800 bg-zinc-900 text-zinc-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-zinc-100">
                                <Type className="h-5 w-5 text-indigo-500" />
                                Product Details
                            </CardTitle>
                            <CardDescription className="text-zinc-400">Basic information about your product.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-zinc-200">Product Name</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Ultimate Coding Guide 2024"
                                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-zinc-200">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe what your customers will get..."
                                    className="min-h-[150px] bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing Card */}
                    <Card className="border-zinc-800 bg-zinc-900 text-zinc-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-zinc-100">
                                <DollarSign className="h-5 w-5 text-emerald-500" />
                                Pricing & Revenue Split
                            </CardTitle>
                            <CardDescription className="text-zinc-400">Set your price and how you want to split earnings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-zinc-200">Price (IDR)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-zinc-500">Rp</span>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="100000"
                                            className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="creator_split" className="text-zinc-200">Creator Split (%)</Label>
                                    <div className="relative">
                                        <Input
                                            id="creator_split"
                                            name="creator_split"
                                            type="number"
                                            placeholder="70"
                                            max="100"
                                            min="0"
                                            className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                        <span className="absolute right-3 top-2.5 text-zinc-500">%</span>
                                    </div>
                                    <p className="text-xs text-zinc-500">Operator gets the remaining percentage automatically.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Creator Assignment Card */}
                    <Card className="border-zinc-800 bg-zinc-900 text-zinc-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-zinc-100">
                                <User className="h-5 w-5 text-purple-500" />
                                Assign Creator
                            </CardTitle>
                            <CardDescription className="text-zinc-400">Who is this product for?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="creator_id" className="text-zinc-200">Select Creator</Label>
                                <Select name="creator_id" required>
                                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                        <SelectValue placeholder="Select a creator" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        {creators?.map((creator) => (
                                            <SelectItem key={creator.id} value={creator.id}>
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
                    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Upload className="h-5 w-5 text-blue-500" />
                                Product File
                            </CardTitle>
                            <CardDescription>Upload the digital asset.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-950/50 p-8 text-center hover:bg-zinc-900/50 transition-colors cursor-pointer">
                                <FileText className="h-10 w-10 text-zinc-600 mb-4" />
                                <p className="text-sm font-medium">Drop your file here</p>
                                <p className="text-xs text-zinc-500 mt-1">PDF, ZIP, or MP4 (Max 500MB)</p>
                            </div>
                            <Input type="hidden" name="file_url" value="https://example.com/mock-file.pdf" />
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="sticky top-8">
                        <Button type="submit" size="lg" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                            Create Product
                        </Button>
                        <p className="text-xs text-center text-zinc-500 mt-4">
                            By creating this product, you agree to the ShadowOS terms of service.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
