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

import {useForm} from "react-hook-form"
import { TLogin, LoginSchema } from "@/lib/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { setCredentials } from "@/lib/redux/features/auth.slice";
import { useDispatch } from "react-redux";
import { AppDispatch, store } from "@/lib/redux/store";

export default function Login() {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<TLogin>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email:"",
          password:""
        }
    });

    const onSubmit = async (formValues: TLogin)=>{

        try{

            const res = await fetch("http://localhost:3020/api/auth/login",{
                method:"POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(formValues)
            })
    
            const data = await res.json();

            if(!data.success)
                throw new Error(data.msg);


            dispatch(setCredentials({
                user:data.user,
                accessToken: data.accessToken
            }));

            router.push("/");

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
                                <FormLabel>password</FormLabel>
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
                        
                        <Link href="/register">Register</Link>     
                    </div>

                </form>
                </Form>

        </div>
      
    );
}