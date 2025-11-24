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
            <DialogContent className="max-w-md max-h-[90vh] flex flex-col p-0 gap-0 bg-white text-gray-900">
                <DialogHeader className="p-4 border-b border-gray-100 flex flex-row items-center justify-between">
                    <DialogTitle className="text-gray-900">Select Payment Method</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4 bg-white">
                    <RadioGroup value={tempSelected} onValueChange={setTempSelected} className="space-y-6">
                        {/* Instant Payment */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Instant Payment</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <PaymentOption value="shopeepay" label="ShopeePay" icon={<Wallet className="h-4 w-4 text-orange-500" />} />
                                <PaymentOption value="ovo" label="OVO" icon={<span className="font-bold text-purple-600 text-xs">OVO</span>} />
                                <PaymentOption value="qris" label="QRIS" icon={<span className="font-bold text-gray-900 text-xs">QRIS</span>} />
                                <PaymentOption value="dana" label="DANA" icon={<span className="font-bold text-blue-500 text-xs">DANA</span>} />
                            </div>
                        </div>

                        {/* Virtual Account */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Virtual Account</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <PaymentOption value="bca_va" label="BCA" icon={<span className="font-bold text-blue-700 text-xs">BCA</span>} />
                                <PaymentOption value="mandiri_va" label="Mandiri" icon={<span className="font-bold text-yellow-600 text-xs">MANDIRI</span>} />
                                <PaymentOption value="briva" label="BRI" icon={<span className="font-bold text-blue-600 text-xs">BRI</span>} />
                                <PaymentOption value="bni_va" label="BNI" icon={<span className="font-bold text-orange-600 text-xs">BNI</span>} />
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
                        className="w-full h-12 bg-[#0055D4] hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-100 rounded-xl"
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
        <div className="relative">
            <RadioGroupItem value={value} id={value} className="peer sr-only" />
            <Label
                htmlFor={value}
                className={cn(
                    "flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-all",
                    "peer-data-[state=checked]:border-[#0055D4] peer-data-[state=checked]:bg-blue-50",
                    "peer-data-[state=checked]:[&_.inner-circle]:opacity-100",
                    "peer-data-[state=checked]:[&_.outer-circle]:border-[#0055D4] peer-data-[state=checked]:[&_.outer-circle]:bg-transparent"
                )}
            >
                <div className="h-8 w-10 bg-white rounded border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                    {icon}
                </div>
                <span className="font-medium text-sm text-gray-700 flex-1">{label}</span>
                <div className="outer-circle h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center transition-colors">
                    <div className="inner-circle h-2.5 w-2.5 rounded-full bg-[#0055D4] opacity-0 transition-opacity" />
                </div>
            </Label>
        </div>
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
