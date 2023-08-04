import bcrypt from 'bcrypt'
import prismadb from '@lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json()

        const existingUser = await prismadb.user.findUnique({ where: { email }})
        if (existingUser) {
            return NextResponse.json({ Error: "Email already taken." })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        })

        return NextResponse.json(user)
    } catch (err) {
        console.error(err)
    }
}