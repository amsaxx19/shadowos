"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
    onToggle?: () => void
    className?: string
}

export function AccordionItem({ title, children, isOpen, onToggle, className }: AccordionItemProps) {
    return (
        <div className={cn("border-b border-white/10 last:border-0", className)}>
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-4 font-medium transition-all hover:text-blue-500 text-left text-sm text-white"
            >
                {title}
                <ChevronDown
                    className={cn("h-4 w-4 shrink-0 transition-transform duration-200 text-neutral-400", isOpen && "rotate-180")}
                />
            </button>
            <div
                className={cn(
                    "overflow-hidden text-sm transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                )}
            >
                {children}
            </div>
        </div>
    )
}

interface AccordionProps {
    items: {
        id: string
        title: string
        content: React.ReactNode
    }[]
    className?: string
}

export function Accordion({ items, className }: AccordionProps) {
    const [openId, setOpenId] = React.useState<string | null>(items[0]?.id || null)

    return (
        <div className={cn("w-full", className)}>
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    title={item.title}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    )
}
