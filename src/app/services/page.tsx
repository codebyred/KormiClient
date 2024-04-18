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

export default function Services(){
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
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className="bg-blue-800 hover:bg-blue-500" type="button">
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