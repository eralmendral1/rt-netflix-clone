import React from 'react'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Navbar from './components/Navbar'

const Home = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect('/auth')
    }

    return (
        <div>
            <Navbar />
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>   <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>   <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
            <div className="h-96"></div>
        </div>
    )
}

export default Home