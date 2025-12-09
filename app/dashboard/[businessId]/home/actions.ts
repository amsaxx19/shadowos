"use server"

import { createClient } from "@/lib/supabase/server"

export interface SalesStats {
    totalRevenue: number
    todayRevenue: number
    yesterdayRevenue: number
    percentageChange: number
    totalOrders: number
    currency: string
    businessName: string
}

export async function getSalesStats(businessId: string): Promise<SalesStats> {
    const supabase = await createClient()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    // Get business info (for name and currency)
    const { data: business } = await supabase
        .from('businesses')
        .select('name, currency, owner_id')
        .eq('id', businessId)
        .single()

    // Try to get products by business_id first, then by operator_id (owner_id)
    let products = null

    // First try with business_id column if it exists
    const { data: productsByBiz } = await supabase
        .from('products')
        .select('id')
        .eq('business_id', businessId)

    if (productsByBiz && productsByBiz.length > 0) {
        products = productsByBiz
    } else if (business?.owner_id) {
        // Fallback: get products by operator_id (the business owner)
        const { data: productsByOp } = await supabase
            .from('products')
            .select('id')
            .eq('operator_id', business.owner_id)
        products = productsByOp
    }

    const productIds = products?.map(p => p.id) || []

    if (productIds.length === 0) {
        return {
            totalRevenue: 0,
            todayRevenue: 0,
            yesterdayRevenue: 0,
            percentageChange: 0,
            totalOrders: 0,
            currency: business?.currency || 'IDR',
            businessName: business?.name || 'Your Business'
        }
    }

    // Get all paid/completed orders (check for 'paid', 'completed', 'success')
    const { data: allOrders } = await supabase
        .from('orders')
        .select('id, amount, created_at, status')
        .in('product_id', productIds)
        .in('status', ['paid', 'completed', 'success'])

    // Calculate stats
    let totalRevenue = 0
    let todayRevenue = 0
    let yesterdayRevenue = 0

    allOrders?.forEach(order => {
        totalRevenue += Number(order.amount)

        const orderDate = new Date(order.created_at)
        if (orderDate >= today) {
            todayRevenue += Number(order.amount)
        } else if (orderDate >= yesterday && orderDate < today) {
            yesterdayRevenue += Number(order.amount)
        }
    })

    // Calculate percentage change
    let percentageChange = 0
    if (yesterdayRevenue > 0) {
        percentageChange = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100
    } else if (todayRevenue > 0) {
        percentageChange = 100
    }

    return {
        totalRevenue,
        todayRevenue,
        yesterdayRevenue,
        percentageChange,
        totalOrders: allOrders?.length || 0,
        currency: business?.currency || 'IDR',
        businessName: business?.name || 'Your Business'
    }
}

