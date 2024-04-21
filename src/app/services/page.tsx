"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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
  
  
import { services } from "@/lib/constants"

import { useEffect, useState } from "react";
import { store } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

export default function Services(){

    const router = useRouter();

    async function bookService(serviceId:number){

        if(store.getState().authReducer.user === null) return router.push("/login");

        const user = store.getState().authReducer.user;

        const res = await fetch("http://localhost:3020/api/booking/service",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                clientId:user?.id,
                serviceId
            })
        });
        const data = await res.json();
        console.log(data);
        
    }

    return (
        <div className="grid gap-2
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-3 lg:gap-4"
        >

            {
                services.map((service)=>(

                    <Card key={service.id}>
                        <CardHeader>
                            <CardTitle>{service.name}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Service Charge: {service.charge}</p>
                        </CardContent>
                        <CardFooter>
                            <Dialog>
                                <DialogTrigger asChild> 
                                    <Button className="bg-blue-800 hover:bg-blue-500">
                                        Book Service
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                    <DialogTitle>Confirm booking?</DialogTitle>
                                    <DialogDescription>
                                        You will be charged {service.charge}
                                    </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="bg-blue-800 hover:bg-blue-500" type="button"
                                                onClick={(e)=>bookService(service.id)}
                                            >
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
                        </CardFooter>
                    </Card>
    
                ))
            }

        </div>
    )
}