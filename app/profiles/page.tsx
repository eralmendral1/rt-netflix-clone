import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import UserName from '../components/UserName'
import ProfileCard from '../components/ProfileCard'

const ProfilePage = async () => {
    const session = getServerSession(authOptions)
    if (!session) return redirect('/auths')

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>

                <div className='flex items-center justify-center gap-8 mt-10'>
                    <ProfileCard>
                    <div className="group flex-row w-44 mx-auto">
                            <div className="
                                w-44 h-44 rounded-md 
                                flex items-center justify-center 
                                border-2 border-transparent 
                                group-hover:cursor-pointer
                                group-hover:border-white
                                overflow-hdden
                            ">
                                <img src="/images/default-blue.png" alt="Profiles" />
                            </div>

                            <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                                <UserName />
                            </div>
                        </div>
                        </ProfileCard>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage