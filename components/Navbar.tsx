import * as fcl from '@onflow/fcl'
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { faker } from "@faker-js/faker"
import { useEffect, useState } from 'react'

export default function Navbar() {
    const user = useCurrentUser()
    const [token, setToken] = useState(0);


    const LINKS = [
        { name: "Home", href: "/home" },
        { name: "Write News", href: "/new" }
    ]


    useEffect(() => {
        setToken(faker.number.int({ min: 0, max: 100 }))
    }, [])

    return (
        <div className='flex px-6 items-center justify-between gap-4 py-4 border-b-2 border-zinc-700'>
            <div className={clsx(
                user.addr ? "text-black" : "text-white"
            )}>
                Welcome, <span className='font-bold'>{user.addr}</span>
            </div>

            <div className='flex items-center gap-4 font-mono' >
                {
                    LINKS.map(link => {
                        return (
                            <Link href={link.href} key={link.name}>
                                <div className='hover:text-gray-700'>{link.name}</div>
                            </Link>
                        )
                    }).map((link, i) => {
                        return <div key={i} className='hover:text-gray-700 flex'>| {link} | </div>
                    })
                }
            </div>

            <div className='flex items-center gap-4'>
                <div className={clsx(
                    user.addr ? "block" : "hidden",
                )}>
                    🪙 {token}
                </div>
                <button className={clsx(
                    'px-4 py-1 rounded-md text-white',
                    user.addr ? 'bg-red-400 ' : 'bg-green-400 '
                )} onClick={
                    user.addr ? fcl.unauthenticate : fcl.authenticate
                }>
                    {
                        user.addr ? 'Log Out' : 'Log In'
                    }
                </button>
            </div>
        </div>
    )
}