import { Button } from "@/components/ui/button";
import { workers } from "@/lib/constants";
import Image from "next/image";

export default function Worker({params}:{params:{id:string}}) {

    const worker = workers.find((worker)=> worker.id === params.id);

    return (
        <div className=" bg-slate-50 flex px-8 py-8">

            <div >

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
                <Button className="mt-2 bg-blue-800 hover:bg-blue-600">
                    Hire
                </Button>
            </div>
       
        </div>
    )

}