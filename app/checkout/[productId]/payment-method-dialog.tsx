"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ChevronRight, CreditCard, Wallet, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentMethodDialogProps {
    onSelect: (method: string) => void
    selectedMethod?: string
}

export function PaymentMethodDialog({ onSelect, selectedMethod }: PaymentMethodDialogProps) {
    const [open, setOpen] = useState(false)
    const [tempSelected, setTempSelected] = useState(selectedMethod || "qris")

    const handleConfirm = () => {
        onSelect(tempSelected)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                            {selectedMethod ? (
                                <span className="text-[10px] font-bold text-gray-600 uppercase">{selectedMethod}</span>
                            ) : (
                                <span className="text-xs font-bold text-gray-500">PAY</span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900 text-sm">
                                {selectedMethod ? getMethodLabel(selectedMethod) : "Select Payment Method"}
                            </span>
                            {selectedMethod && <span className="text-xs text-gray-500">Change method</span>}
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-4 border-b border-gray-100">
                    <DialogTitle>Select Payment Method</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    <RadioGroup value={tempSelected} onValueChange={setTempSelected} className="space-y-6">
                        {/* Instant Payment */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Instant Payment</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <PaymentOption value="shopeepay" label="ShopeePay" icon={<Wallet className="h-4 w-4 text-orange-500" />} />
                                <PaymentOption value="ovo" label="OVO" icon={<Wallet className="h-4 w-4 text-purple-600" />} />
                                <PaymentOption value="qris" label="QRIS" icon={<div className="font-bold text-xs">QRIS</div>} />
                                <PaymentOption value="dana" label="DANA" icon={<Wallet className="h-4 w-4 text-blue-500" />} />
                            </div>
                        </div>

                        {/* Virtual Account */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Virtual Account</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <PaymentOption value="bca_va" label="BCA" icon={<Building2 className="h-4 w-4 text-blue-700" />} />
                                <PaymentOption value="mandiri_va" label="Mandiri" icon={<Building2 className="h-4 w-4 text-yellow-600" />} />
                                <PaymentOption value="briva" label="BRI" icon={<Building2 className="h-4 w-4 text-blue-600" />} />
                                <PaymentOption value="bni_va" label="BNI" icon={<Building2 className="h-4 w-4 text-orange-600" />} />
                            </div>
                        </div>

                        {/* Credit Card */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Credit Card</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <PaymentOption value="cc" label="Credit / Debit Card" icon={<CreditCard className="h-4 w-4 text-gray-600" />} />
                            </div>
                        </div>
                    </RadioGroup>
                </div>

                <div className="p-4 border-t border-gray-100 bg-white">
                    <Button
                        className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg shadow-green-100"
                        onClick={handleConfirm}
                    >
                        Confirm Method
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function PaymentOption({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
    return (
        <Label
            htmlFor={value}
            className={cn(
                "flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all [&:has(:checked)]:border-green-500 [&:has(:checked)]:bg-green-50",
            )}
        >
            <RadioGroupItem value={value} id={value} className="sr-only" />
            <div className="h-8 w-10 bg-white rounded border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                {icon}
            </div>
            <span className="font-medium text-sm text-gray-700 flex-1">{label}</span>
            <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center group-has-[:checked]:border-green-500 group-has-[:checked]:bg-green-500">
                <div className="h-2 w-2 rounded-full bg-white opacity-0 group-has-[:checked]:opacity-100" />
            </div>
        </Label>
    )
}

function getMethodLabel(value: string) {
    const labels: Record<string, string> = {
        shopeepay: "ShopeePay",
        ovo: "OVO",
        qris: "QRIS",
        dana: "DANA",
        bca_va: "BCA Virtual Account",
        mandiri_va: "Mandiri Virtual Account",
        briva: "BRI Virtual Account",
        bni_va: "BNI Virtual Account",
        cc: "Credit Card"
    }
    return labels[value] || value
}
