import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt'

const handler = NextAuth({
    providers: [
        Credentials({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required.')
                }

                const user = await prismadb.user.findUnique({ where: { email: credentials.email } })

                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exists.')
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
                if (!isCorrectPassword) {
                    throw new Error('Incorrect Password')
                }

                return user
            }
        })
    ],
    pages: {
        signIn: '/auth'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }