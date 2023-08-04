import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    try {   
        await serverAuth()
        const movies = await prismadb.movie.findMany()
        return NextResponse.json(movies, { status: 200})
    } catch (error: any) {
        console.error(error)
        throw new Error("Error encountered getting movies.")
    }
}