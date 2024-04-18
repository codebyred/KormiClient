import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function Contact(){
    return(
        <Card>
            <CardHeader>

                <CardTitle>Get in contact with us</CardTitle>
                
            </CardHeader>
            <CardContent>

                <p>Phone: 01990262711</p>
                <p>Whatsapp: 01990262711</p>
                <p>facebook:<Link href="https://facebook.com"> https://facebook.com</Link></p>

            </CardContent>
        </Card>
    )
}