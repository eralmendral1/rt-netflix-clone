'use client'

import { useCallback, useState } from 'react'
import Input from './components/Input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const AuthPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [mode, setMode] = useState('login')

    const toggleMode = useCallback(() => {
        setMode((currentMode: string) => currentMode === 'login' ? 'register' : 'login')
    }, [])


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            })
        } catch (error) {
            console.error(error)
        }
    }, [email, password])

    const register = useCallback(async () => {
        if (!email || !name || !password) return

        try {
            axios.post('/api/auth/register', {
                email,
                name,
                password
            })

            login()

        } catch (error) {
            console.error(error)
        }
    }, [email, name, password, login])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12" />
                </nav>

                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-14 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {mode === 'login' ? 'Sign in' : 'Register'}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {mode === 'register' && <Input type="name" label="Name" id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />}
                            <Input type="email" label="Email" id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                            <Input type="password" label="Password" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>

                        <button onClick={mode === 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                            {mode === 'register' ? 'Register' : 'Login'}
                        </button>

                        <div className="flex items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>

                        <p className="text-neutral-500 mt-12">
                            {mode === 'register' ? 'Has account?' : 'First time using Netflix?'}

                            <span onClick={toggleMode} className="text-white ml-1 hover:underline cursor-pointer">
                                {mode === 'register' ? 'Sign in' : 'Create an account'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage