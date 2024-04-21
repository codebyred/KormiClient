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
import { store } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

export default function Worker({params}:{params:{id:string}}) {

    const [hire, setHire] = useState(true);
    const [bookingStatus, setBookingStatus] = useState("");

    const router = useRouter();

    useEffect(()=>{
        
    },[]);

    async function hireWorker(){

        if(store.getState().authReducer.user === null) return router.push("/login");

        const user = store.getState().authReducer.user;

        const res = await fetch("http://localhost:3020/api/booking/worker",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                clientId:user?.id,
                workerId:params.id
            })
        });
        const data = await res.json();
        console.log(data);
        
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

                <Dialog>
                    <DialogTrigger asChild> 
                        <Button 
                            className={`mt-2 bg-blue-800
                            hover:bg-blue-600`}
                        >
                            hire
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Confirm Hire?</DialogTitle>
                        <DialogDescription>
                            You will be charged with 100taka.
                        </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button className="bg-blue-800 hover:bg-blue-500" type="button"
                                onClick={hireWorker}>
                                    Confirm
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="bg-red-800 hover:bg-red-500" type="button">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
       
        </div>
    )

}