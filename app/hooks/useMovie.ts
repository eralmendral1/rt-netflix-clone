import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

const useMovie = (id?: string) => {
    const { data, isLoading, error } = useSWR(`/api/movies/${id}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return { data, isLoading, error }
}

export default useMovie