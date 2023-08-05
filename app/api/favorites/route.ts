import { without } from 'lodash'
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { currentUser } = await serverAuth()
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds
                }
            }
        })

        return NextResponse.json(favoriteMovies, { status: 200 })
    } catch (error) {
        console.error(error)
        throw new Error("Error encountered getting favorites.")
    }
}

export async function POST(request: Request) {
    try {
        const { currentUser } = await serverAuth()
        const { movieId } = await request.json()
        console.log("🚀 ~ file: route.ts:29 ~ POST ~ movieId:", movieId)
        const movie = await prismadb.movie.findUnique({ where: { id: movieId } })
        if (!movie) throw new Error("Movie not found")

        const user = await prismadb.user.update({
            where: { email: currentUser.email || '' },
            data: {
                favoriteIds: {
                    push: movieId
                }
            }
        })

        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error(error)
        throw new Error('Error encountered updating favorites')
    }
}

export async function DELETE(request: Request) {
    try {
        const { currentUser } = await serverAuth()
        const { movieId } = await request.json()
        const movie = await prismadb.movie.findUnique({ where: { id: movieId } })
        if (!movie) throw new Error("Movie not found.")

        const updatedFavorites = without(currentUser.favoriteIds, movieId)
        const updatedUser = await prismadb.user.update({
            where: { email: currentUser.email || '' },
            data: {
                favoriteIds: updatedFavorites
            }
        })
        return NextResponse.json(updatedUser, { status: 200 })
    } catch (error) {
        console.error(error)
        throw new Error('Error encountered')
    }
}

