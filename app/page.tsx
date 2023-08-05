import React from 'react'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Navbar from './components/Navbar'
import Billboard from './components/Billboard'
import MovieList from './components/MovieList'
import InfoModal from './components/InfoModal'
import MovieFavorites from './components/MovieFavorites'

const Home = async () => {
    const session = await getServerSession(authOptions)

    if (!session)  return redirect('/auth')
       
    return (
        <div>
            <InfoModal/>
            <Navbar />
            <Billboard />

            <div className="pb-40">
                <MovieList title="Trending Now" />
                <MovieFavorites title="My List" />
            </div>
        </div>
    )
}

export default Home