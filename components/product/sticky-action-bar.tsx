"use client"

import { useState, useEffect } from "react"
import CheckoutButton from "./checkout-button"
import Image from "next/image"

interface StickyActionBarProps {
    product: any
    triggerId: string
}

export default function StickyActionBar({ product, triggerId }: StickyActionBarProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const triggerElement = document.getElementById(triggerId)
            if (triggerElement) {
                const rect = triggerElement.getBoundingClientRect()
                // Show if valid trigger AND not intersecting with viewport
                const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
                setIsVisible(!isInViewport)
            }
        }

        window.addEventListener("scroll", handleScroll)
        // Check initially
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [triggerId])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 py-4 px-6 bg-[#0a0a0a] border-t border-white/10 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Product Info (Desktop only usually) */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-10 w-10 relative rounded-lg overflow-hidden bg-neutral-800">
                            {product.image_url && <Image src={product.image_url} alt={product.title} fill className="object-cover" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{product.title}</h3>
                            <p className="text-neutral-400 text-xs">
                                Rp {Number(product.price).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                    {/* Mobile simplified view */}
                    <div className="md:hidden">
                        <p className="font-bold text-white text-sm">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                    </div>
                </div>

                <div className="min-w-[150px] md:min-w-[200px]">
                    <CheckoutButton product={product} />
                </div>
            </div>
        </div>
    )
}
