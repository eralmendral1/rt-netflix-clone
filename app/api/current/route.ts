
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { currentUser } = await serverAuth()
        return NextResponse.json(currentUser, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json('User not found', { status: 400})
    }
}

export const dynamic = "force-dynamic"