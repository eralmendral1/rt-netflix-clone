import React from 'react'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SignOutButton from './components/SignOutButton'
import UserInfo from './components/UserInfo'

const Home = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect('/auth')
    }

    return (
        <div className='text-2xl text-green-500'>
            <h1>Netflix</h1>
            <UserInfo />
            <SignOutButton />
        </div>
    )
}

export default Home