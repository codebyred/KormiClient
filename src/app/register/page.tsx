"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {useForm} from "react-hook-form"
import { TRegister, RegisterSchema } from "@/lib/schemas/register.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {

    const router = useRouter();

    const form = useForm<TRegister>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          firstName: "",
          lastName:"",
          email:"",
          password:""
        }
    });

    const onSubmit = async (formValues: TRegister)=>{

        try{

            const res = await fetch("http://localhost:3020/api/auth/register",{
                method:"POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formValues)
            })
    
            const data = await res.json();
    
            router.push("/login");

        }catch(e){
            console.log(e);
        }

    }

    return (
     
        <div className="flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[30rem] lg:w-[50rem]">
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>FirstName</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LastName</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}  
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}  
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}  
                    />
                    <div className="flex flex-col items-center justify-center">
                        <Button type="submit">Submit</Button>
                    </div>
                    
                </form>
                </Form>

        </div>
      
    );
}