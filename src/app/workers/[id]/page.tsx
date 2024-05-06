"use client"

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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


import { workers } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import { store } from "@/lib/redux/store";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";

import { BookingWorkerSchema, TBookingWorker } from "@/lib/schemas/booking.schema"
import { useForm } from "react-hook-form"

import { useSearchParams, useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { workerBooking } from "@/lib/types"


export default function Worker({params}:{params:{id:string}}) {

    const router = useRouter();

    const worker = workers.find((worker)=> worker.id === Number(params.id));

    const user = store.getState().authReducer.user;

    const [disabledDays, setDisabledDays]= useState<Date[] | object[]>([
        {before:new Date()}
    ]);
    //const disabledDays = [];

    const form = useForm<TBookingWorker>({
        resolver: zodResolver(BookingWorkerSchema),
        defaultValues:{
            workerId: 0,
            clientId: 0,
            address:'',
            city: '',
            postcode: '',   
            schedule: new Date() 
        }
    });

    async function pay(formData: TBookingWorker){

        if(user === null) return router.push("/login");
        if(worker === null) return router.push("/workers");

        formData.workerId = Number(worker?.id);
        formData.clientId = Number(user?.id);

        const apiResponse = await fetch(`http://localhost:3020/api/booking/worker`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(
                formData
            )
        });

        const apiData = await apiResponse.json();
        
        return router.push(apiData.url);

    }

    useEffect(()=>{
        (async()=>{
            const apiResponse = await fetch(`http://localhost:3020/api/booking/worker/history/${worker?.id}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            });

            const apiData = await apiResponse.json();

            apiData.history.forEach((booking)=>{
                setDisabledDays((prevData) => [...prevData, new Date(booking.schedule)])
            })

        })();
    },[]);


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
                        </DialogHeader>
                        <DialogDescription>
                            Clicking payment will redirect you to payment options
                        </DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(pay)}>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>address</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>city</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postcode"
                                    render={({ field }) => (
                                        <FormItem className="mb-2">
                                            <FormLabel>Postcode</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="schedule"
                                    render={({ field }) => (
                                        <FormItem className="mb-2">
                                            <FormLabel>Schedule</FormLabel>
                                            <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={disabledDays}
                                                    initialFocus
                                                />
                                                </PopoverContent>
                                            </Popover>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-flow-col">

                                    <Button className="mr-2 bg-blue-800 hover:bg-blue-500" type="submit">Pay</Button>                               
                                    
                                    <DialogClose asChild>
                                        <Button className="ml-2 bg-red-800 hover:bg-red-500" type="button">Cancel</Button>   
                                    </DialogClose>

                                </div>

                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
       
        </div>
    )

}