"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";

import { workers } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Worker({params}:{params:{id:string}}) {

    const [hire, setHire] = useState(true);
    const [bookingStatus, setBookingStatus] = useState("");


    useEffect(()=>{
        
    },[]);

    function hireWorker(){
        if(hire){
            setHire(false);
        }else{
            setHire(true);
        }
        
    }

    const worker = workers.find((worker)=> worker.id === params.id);

    return (
        <div className=" bg-slate-50 flex px-8 py-8">

            <div>

                <Image className="mr-8" alt="woker-image" src={`/workers/id-${worker?.id}.jpg`} width="200" height="400"></Image>

            </div>

            <div className="flex lg:flex-col">
                <div>
                    
                    <h1>{worker?.name}</h1>
                    <h2>{worker?.job}</h2>
                    <p>Address: {worker?.location}</p>
                    <h2>Experience: {worker?.experience}</h2>           
                    <p>charge: {worker?.charge}</p>

                </div>
                <div>
                    {bookingStatus}
                </div>
                <Button 
                    className={`mt-2 ${hire?"bg-blue-800":"bg-red-800"} 
                        ${hire?"hover:bg-blue-600":"hover:bg-red-600"}`}
                    
                    onClick={hireWorker}>
                    {hire && "Hire"}
                    {!hire && "Cancel"}
                </Button>
            </div>
       
        </div>
    )

}