import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await serverAuth()

        const movieId = params.id

        const movie = await prismadb.movie.findUnique({
            where: { id: movieId }
        })

        if (!movie) throw new Error("Movie not found.  ")

        return NextResponse.json(movie, { status: 200 })
    } catch (error: any) {
        console.error(error)
        throw new Error("Problem encountered getting movie.")
    }
}