'use client'

import React from 'react'
import useMovie from '../../hooks/useMovie'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
const WatchPage = ({ params }: { params: { id: string } }) => {
    const movieId = params.id
    const { data } = useMovie(movieId)

    return (
        <div className="h-screen w-screen bg-black ">
            <nav className="
            fixed w-full p-4 z-10 flex flex-row items-center gap-8 
            bg-black bg-opacity-10">
                <Link href="/"> <AiOutlineArrowLeft onClick={() => { }} className="text-white cursor-pointer" size={40} /></Link>

                <p className="text-white text-md font-bold">
                    <span className='font-light'>Watching: </span>
                    {data?.title}
                </p>
            </nav>

            <video
                autoPlay
                controls
                className="h-full w-full"
                src={data?.videoUrl}></video>
        </div>
    )
}

export default WatchPage