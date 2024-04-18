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

import { workers } from "@/lib/constants";

export default function Workers() {

    const [query, setQuery] = useState("");

    const handleFilter = (e: ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value.toLocaleLowerCase());
    }

    return (
        <div className="
        sm:w-[30rem]
        lg:w-[50rem]">

            <Input
                className="my-2"
                placeholder="Search for categories or location"
                onChange={handleFilter}
            />
            <Table>

                <TableBody>
                    
                    { 
                        workers.
                        filter((worker)=> worker.job.toLowerCase().includes(query) || worker.location.toLowerCase().includes(query))
                        .map((worker)=>(

                            <TableRow key={worker.id} className="flex items-center justify-between bg-[#F5F7F8] mb-2">

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

                                    <Button className="bg-blue-600 hover:bg-blue-500" asChild>
                                        <Link href={`workers/${worker.id}`}>Details</Link>
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