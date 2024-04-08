import Link from "next/link";
import Image from "next/image";

import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button"

export const Navbar = ()=>{

    return (

        <nav className="flex align-middle justify-between px-2 mx-2 py-2 z-30
            sm:px-4 sm:mx-4
            lg:px-8 lg:mx-8"
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

                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>

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