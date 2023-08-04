
import { NextApiRequest, NextApiResponse } from 'next'

import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {
        const { currentUser } = await serverAuth(request)
        return NextResponse.json(currentUser, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json('User not found', { status: 400})
    }
}