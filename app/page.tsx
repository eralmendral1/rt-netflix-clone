import React from 'react'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Navbar from './components/Navbar'
import Billboard from './components/Billboard'
import MovieList from './components/MovieList'

const Home = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect('/auth')
    }

    return (
        <div>
            <Navbar />
            <Billboard />

          
                <MovieList title="Trending Now" />
         
        </div>
    )
}

export default Home