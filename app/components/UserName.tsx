'use client'

import useCurrentUser from '../hooks/useCurrentUser'

const UserName = () => {
    const { data: user } = useCurrentUser()
    return <>{user?.name}</>
}

export default UserName