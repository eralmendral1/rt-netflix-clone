'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ProfileCard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <div onClick={() => router.push('/')}>
            { children }
        </div>
    )
}

export default ProfileCard