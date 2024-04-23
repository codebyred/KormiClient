import { z } from "zod"

export const BookingWorkerSchema = z.object({
    workerId: z.number(),
    clientId: z.number(),
    address: z.string(),
    city: z.string(),
    postcode: z.string(),
});

export const BookingServiceSchema = z.object({
    serviceId: z.number(),
    clientId: z.number(),
    address: z.string(),
    city: z.string(),
    postcode: z.string(),
});


export type TBookingWorker = z.infer<typeof BookingWorkerSchema>
export type TBookingService = z.infer<typeof BookingServiceSchema>