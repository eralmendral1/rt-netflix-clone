'use client'

import { signOut } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import useCurrentUser from '../hooks/useCurrentUser'

const menus = ['Home', 'Series', 'Films', 'Popular', 'My List', 'Browser by categories']
const TOP_OFFSET = 60


type NavbarItemProps = {
    label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => (
    <div className="text-white cursor-pointer hover:text-gray-300 transition text-base">
        {label}
    </div>
)

type MenuProps = {
    visible?: boolean
}

const MobileMenu: React.FC<MenuProps> = ({ visible }) => {
    if (!visible) return null

    return (
        <div className="flex flex-col bg-black w-56 absolute top-8 left-0 py-5 border-2 border-gray-800">
            <div className="flex flex-col gap-4">
                {menus.map((menu: string) => (<div key={menu} className='px-3 text-center text-white hover:underline text-sm'>
                    {menu}
                </div>))}
            </div>
        </div>
    )
}

const AccountMenu: React.FC<MenuProps> = ({ visible }) => {
    const { data: user } = useCurrentUser()

    if (!visible) return null

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="Account" />
                    <p className="text-white text-s group-hover/item:underline">
                        {user?.name}
                    </p>
                </div>

                <hr className='bg-gray-600 border-0 h-px my-4' />

                <div onClick={() => signOut()} className="px-3 text-center text-white  text-sm hover:underline">
                    Sign out
                </div>
            </div>
        </div>
    )
}

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
    const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false)
    const [showBackground, setShowBackground] = useState<boolean>(false)

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu(value => !value)
    }, [setShowMobileMenu])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu(value => !value)
    }, [setShowAccountMenu])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[setShowBackground])

    return (
        <nav className="w-full fixed z-40">
            <div className={`
           
           ${showBackground ? 'bg-zinc-800 bg-opacity-90' : ''}
            px-4 md:px-16 py-6
            flex flex-row items-center 
            transition duration-500 
            `}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />

                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    {menus.map((menu: string) => (<NavbarItem key={menu} label={menu} />))}
                </div>

                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>

                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 text-base hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 text-base hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>

                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="Profile" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar