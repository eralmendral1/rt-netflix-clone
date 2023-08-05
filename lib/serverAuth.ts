import prismadb from '@/lib/prismadb'
import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

const serverAuth = async() => {
    try{
        const session = await getServerSession(authOptions)
    
        if(!session?.user?.email) {
            throw new Error('Not signed in')
        }
    
        const currentUser = await prismadb.user.findUnique({ where: {
            email: session?.user?.email || ''
        }})
    
        if(!currentUser) {
            throw new Error('Not signed in')
        }
    
        return { currentUser }
    } catch(error) {
        console.error(`Error getting server session:`,error)
        throw new Error(JSON.stringify(error))
    }
}

export default serverAuth
