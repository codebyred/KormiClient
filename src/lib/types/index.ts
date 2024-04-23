export type workerBooking = {
    id: number,
    clientId:number,
    workerId:number,
    status:string,
    paid:boolean
    createdAt: string,
    updatedAt: string
}

export type serviceBooking = {
    id:number,
    clientId:number,
    serviceId:number,
    status:string,
    paid:boolean,
    createdAt: string,
    updatedAt: string
}

