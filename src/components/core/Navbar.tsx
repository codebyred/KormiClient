"use client"

import Link from "next/link";
import Image from "next/image";

import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button"
import {store} from "@/lib/redux/store"
import { useState } from "react";

export const Navbar = ({className}:{className: string})=>{

    const [logedIn, setLogedIn] = useState(false);

    store.subscribe(()=>{
        store.getState().authReducer.user !== null?setLogedIn(true):setLogedIn(false);
    });


    return (

        <nav className={className}
        >

            <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-900">
                    Kormi
                </Link>
            </div>


            <ul className="gap-4 hidden sm:block sm:flex">

                {NAV_LINKS.map((link)=> (

                    <Link 
                        href={link.href} key={link.key} 
                        className="text-xs transition-all hover:font-bold flex items-center"
                    >
                        {link.label}
                    </Link>

                ))}

            </ul>

            <div className="hidden sm:block">

                {
                    !logedIn?
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    :
                    <div>val</div>
                }


            </div>

            <Image
                src="menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block sm:hidden"
            />

        </nav>
    );
}