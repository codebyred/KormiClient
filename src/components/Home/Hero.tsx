import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Hero = ()=>{
    return (
        <section className="grid sm:grid-cols-2">

            <div className="flex flex-col justify-center items-center
                sm:items-start  
                lg:items-start"
            >

                <div>

                    <div className="my-2">
                        <p className="text-black-800 text-2xl 
                        sm:text-4xl
                        lg:text-6xl"
                        >
                            Welcome to
                        </p>
                        <p className="text-blue-800 text-4xl 
                        sm:text-4xl
                        lg:text-6xl"
                        >
                            Kormi
                        </p>
                    </div>

                    <div className="flex gap-2">

                        <Button asChild>
                            <Link href="/workers">Workers</Link>
                        </Button>

                        <Button asChild>
                            <Link href="/services">Services</Link>
                        </Button>
                    </div>

                </div>

            </div>

            <div>
                <Image
                    src="workers.svg"
                    alt="workers"
                    width={640}
                    height={640}
                />
            </div>

        </section>
    )
}