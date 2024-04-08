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

import { Input } from "@/components/ui/input";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

  

export default function Workers() {
    type  Worker = {
        id:string,
        name:string,
        job:string,
        location:string
    }
    const [query, setQuery] = useState("");

    const workers: Worker[] = [
        {
            id:"2",
            name:"Abdullah Ahmed",
            job:"Electrician",
            location:"Dhaka"
        },

        {
            id:"1",
            name:"Konka",
            job:"Maid",
            location:"Dhaka"
        },

    ]

    const handleFilter = (e: ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value.toLocaleLowerCase());
    }

    return (
        <div className="lg:px-16">

            <Input
                className="my-2"
                placeholder="Search for categories"
                onChange={handleFilter}
            />
            <Table>

                <TableBody>
                    
                    { 
                        workers.
                        filter((worker)=> worker.job.toLowerCase().includes(query))
                        .map((worker)=>(

                            <TableRow key={worker.id} className="flex items-center justify-between bg-[#F5F7F8]">

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