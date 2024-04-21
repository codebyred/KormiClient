"use client"

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 

} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

import Link from "next/link";
import Image from "next/image";


import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button"


import { AppDispatch, store } from "@/lib/redux/store"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "@/lib/redux/features/auth.slice";


export const Navbar = ({className}:{className: string})=>{

    const [logedIn, setLogedIn] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    store.subscribe(()=>{
        store.getState().authReducer.user !== null?setLogedIn(true):setLogedIn(false);
        
    });

    useEffect(()=>{

        const credentials = store.getState().authReducer;

        if(store.getState().authReducer.accessToken !== null){
            window.localStorage.setItem("credentials",JSON.stringify(credentials));
            setLogedIn(true);
        }

        const locallySotredCredentials = JSON.parse(window.localStorage.getItem("credentials") as string);
        if(locallySotredCredentials){
            dispatch(setCredentials({
                user:locallySotredCredentials.user,
                accessToken: locallySotredCredentials.accessToken
            }));
        }
        
    })

    function onclickLogout(){
        window.localStorage.removeItem("credentials");
        dispatch(logout({user:null, accessToken:null}));
        setLogedIn(false);
    }

    return (

        <nav className={className}
        >

            <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-900">
                    Kormi
                </Link>
            </div>


            <ul className="gap-4 hidden  sm:flex">

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
                    <Avatar>
                        <AvatarImage src=""></AvatarImage>        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <AvatarFallback>Img</AvatarFallback>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Username
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={"/user/profile"}>User Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/booking/history"}>Booking History</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onclickLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                    </Avatar>
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