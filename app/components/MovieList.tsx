'use client'

import React from 'react'
import useMovieList from '../hooks/useMovieList'
import { isEmpty } from 'lodash'
import MovieCard from './MovieCard'

type MovieListProps = {
    title: string,
}

const MovieList: React.FC<MovieListProps> = ({ title }) => {

    let { data } = useMovieList()

    if (isEmpty(data)) return null

    return (
        <div className='px-4 md:px-12 mt-4 space-y-8 pb-4'>
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold  mb-4">
                    {title}
                </p>

                <div className='grid grid-cols-4 gap-2'>
                    {data.map((movie: any) => <MovieCard key={movie.id} data={movie} />)}
                </div>
            </div>

        </div>
    )
}

export default MovieList