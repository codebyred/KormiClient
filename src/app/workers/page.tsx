"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
Command,
CommandDialog,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
CommandList,
CommandSeparator,
CommandShortcut,
} from "@/components/ui/command"

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
  

export default function Workers() {
    const [search, setSearch] = useState("");

    const workers = [
        {
            name:"Abdullah Ahmed",
            job:"Electrician",
            location:"Dhaka"
        },

        {
            name:"Konka",
            job:"Maid",
            location:"Dhaka"
        },

    ]

    return (
        <div className="lg:px-16">

            <Input
                className="my-2"
                value={search}
                placeholder="Search for categories"
                onChange={(e)=> setSearch(e.target.value)}
            />
            <Table>

                <TableBody>
                    
                    {
                        workers.map((worker)=>(

                            <TableRow className="flex items-center justify-between bg-[#F5F7F8]">

                                <TableCell>

                                    <div>
                                        <h1 className='font-semibold text-ellipsis whitespace-nowrap overflow-hidden'>
                                            {worker.name}
                                        </h1>
                                        <h2 className='text-xs text-muted-foreground text-ellipsis whitespace-nowrap overflow-hidden'>
                                            {worker.job}
                                        </h2>
                                    </div>

                                </TableCell>

                                <TableCell>{worker.location}</TableCell>

                                <TableCell>

                                    <Button className="bg-blue-600 hover:bg-blue-500">
                                        <Link href="/">Details</Link>
                                    </Button>

                                </TableCell>

                            </TableRow>

                        ))
                    }
    
                </TableBody>

            </Table>
            
        </div>
    );
  }