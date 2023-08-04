'use client'

import { useCallback, useState } from 'react'
import Input from './components/Input'

const AuthPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [mode, setMode] = useState('login')

    const toggleMode = useCallback(() => {
        setMode((currentMode: string) => currentMode === 'login' ? 'register' : 'login')
    }, [])

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
                            {mode === 'register' && <Input type="username" label="Username" id="username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />}
                            <Input type="email" label="Email" id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                            <Input type="password" label="Password" id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>

                        <button className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
                            {mode === 'register' ? 'Register' : 'Login'}
                        </button>

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