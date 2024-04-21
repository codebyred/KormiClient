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
                !workersBookedByClient?.length
                ?<div>You have no history of booking any worker</div>
                :<Table className="mb-8">
                    <TableCaption>Worker Booking History</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Booking id</TableHead>
                        <TableHead>Client id</TableHead>
                        <TableHead>Worker id</TableHead>
                        <TableHead className="text-right">Booking Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            workersBookedByClient.map((booking, index)=>(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{booking.id}</TableCell>
                                    <TableCell>{booking.clientId}</TableCell>
                                    <TableCell>{booking.workerId}</TableCell>
                                    <TableCell className="text-right">{booking.status}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }

            {
                !servicesBookedByClient?.length
                ?<div>You have no history of booking any service</div>
                :<Table>
                    <TableCaption>Service Booking History</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Booking id</TableHead>
                        <TableHead>Client id</TableHead>
                        <TableHead>Service id</TableHead>
                        <TableHead className="text-right">Booking Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            servicesBookedByClient.map((booking, index)=>(
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{booking.id}</TableCell>
                                    <TableCell>{booking.clientId}</TableCell>
                                    <TableCell>{booking.serviceId}</TableCell>
                                    <TableCell className="text-right">{booking.status}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }
 
        </div>
    )
}