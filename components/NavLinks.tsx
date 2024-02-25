"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import Login from './dialogs/Login';
import { IAdmin } from '@/lib/models/admin.models';

interface NavLinksProps{
    user:IAdmin
}

const NavLinks = ({user}:NavLinksProps) => {
    const pathname = usePathname();

    return (
        <>
            <>
                {user ? (
                    <>
                        {pathname !== "/dashboard" ? (
                            <Link href="/dashboard" className="text-white font-semibold px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
                                Dashboard
                            </Link>
                        ) : null}
                    </>
                ) : (
                    <Login />
                )}
                {pathname === "/" ? (
                    <Link href="/user" className="text-white font-semibold px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
                        Main
                    </Link>
                ) : (
                    <Link href="/" className="text-white font-semibold px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
                        Home
                    </Link>
                )}
            </>
        </>
    )
}

export default NavLinks
