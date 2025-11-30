"use client"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface CartDrawerProps {
    product: {
        id: string
        title: string
        price: number
        imagePlaceholder: string
    }
}

export function CartDrawer({ product }: CartDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 border-blue-600 text-blue-600 hover:bg-blue-50 shrink-0 rounded-xl">
                    <ShoppingCart className="h-5 w-5" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <div className="mx-auto w-full max-w-md p-4 pb-8">
                    <DrawerHeader className="flex items-center justify-between px-0 pt-0 pb-4 border-b border-gray-100">
                        <DrawerTitle className="flex items-center gap-2 text-lg font-bold">
                            <ShoppingCart className="h-5 w-5" />
                            Cart (1)
                        </DrawerTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </DrawerHeader>

                    <div className="py-4 space-y-4">
                        {/* Product Item */}
                        <div className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="h-16 w-16 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                                {product.imagePlaceholder}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-2">{product.title}</h4>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-gray-500">Qty: 1</span>
                                    <span className="font-bold text-blue-600 text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-2 pt-2">
                            <h5 className="font-bold text-xs text-gray-500 uppercase tracking-wider">Order Summary</h5>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Total (1 Items)</span>
                                <span className="font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                                <span className="font-bold text-gray-900">Grand Total</span>
                                <span className="font-bold text-blue-600">Rp {product.price.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            <Button className="w-full bg-[#0055D4] hover:bg-blue-700 text-white font-bold h-12 rounded-xl" asChild>
                                <Link href={`/checkout/${product.id}/payment`}>
                                    Buy Now
                                </Link>
                            </Button>
                            <Button variant="outline" className="w-full border-blue-600 text-blue-600 font-bold h-12 rounded-xl" onClick={() => setIsOpen(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
