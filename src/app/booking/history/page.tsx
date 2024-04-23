"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
  

import { useEffect, useState } from "react";

import { workerBooking, serviceBooking } from "@/lib/types";
import { store } from "@/lib/redux/store";

export default function History(){

    const [workersBookedByClient, setWorkersBookedByClient] = useState<workerBooking[]>([]);
    const [servicesBookedByClient, setServicesBookedByClient] = useState<serviceBooking[]>([])

    useEffect(()=>{
        (async()=>{
            const user = store.getState().authReducer.user;

            const res = await fetch(`http://localhost:3020/api/booking/history?clientId=${user?.id || 0}`);
            const data = await res.json();
            setServicesBookedByClient(data.servicesBookedByClient);
            setWorkersBookedByClient(data.workersBookedByClient);
        })();

    },[]);

    return (
        <div className="flex flex-col items-center justify-center">
            {
                !workersBookedByClient?.length && !servicesBookedByClient?.length
                ?<div>You have no booking History</div>
                :<Table className="mb-8">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">SI</TableHead>
                        <TableHead>Item Type</TableHead>
                        <TableHead>Item Id</TableHead>
                        <TableHead className="text-right">Booking Status</TableHead>
                        <TableHead className="text-right">Payment Status</TableHead>
                        <TableHead >Booked At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            workersBookedByClient.map((booking, index)=>(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index+1}</TableCell>
                                    <TableCell>Worker</TableCell>
                                    <TableCell>{booking.workerId}</TableCell>                               
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>{booking.paid?"paid":"not paid"}</TableCell>
                                    <TableCell>{booking.createdAt}</TableCell>
                                </TableRow>
                            ))
                        }{
                            
                            servicesBookedByClient.map((booking, index)=>(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index+1}</TableCell>
                                    <TableCell>Service</TableCell>
                                    <TableCell>{booking.serviceId}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>{booking.paid?"paid":"not paid"}</TableCell>
                                    <TableCell>{booking.createdAt}</TableCell>
                                </TableRow>
                            ))
                            
                        }
                    </TableBody>
                </Table>
            }
 
        </div>
    )
}