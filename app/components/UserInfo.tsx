'use client'

import useCurrentUser from '@/app/hooks/useCurrentUser'

const UserInfo = () => {
    const { data: user } = useCurrentUser()

  return (
    <div>
        <p>Logged in as : {user.email}</p>
    </div>
  )
}

export default UserInfo