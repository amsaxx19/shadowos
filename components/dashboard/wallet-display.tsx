"use client"

import { useEffect, useState } from "react"

export function WalletDisplay({ userId }: { userId: string }) {
    const [balance, setBalance] = useState<number | null>(null)

    const fetchBalance = async () => {
        const res = await fetch(`/api/wallet?userId=${userId}`)
        const data = await res.json()
        setBalance(data.balance)
    }

    useEffect(() => {
        fetchBalance()

        const handleUpdate = () => fetchBalance()
        window.addEventListener('wallet-update', handleUpdate)
        return () => window.removeEventListener('wallet-update', handleUpdate)
    }, [userId])

    if (balance === null) return <div>Loading...</div>

    return (
        <div className="text-2xl font-bold">
            Rp {balance.toLocaleString('id-ID')}
        </div>
    )
}
