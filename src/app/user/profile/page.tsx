"use client"

import {
    Button 
} from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  
import { Input } from "@/components/ui/input"

import { useState } from "react";


import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { UseDispatch } from "react-redux";

import { logout } from "@/lib/redux/features/auth.slice";
import { useDispatch } from "react-redux";
import { store, AppDispatch} from "@/lib/redux/store";

export default function Profile(){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();
    const user= store.getState().authReducer.user;
    

    const router = useRouter();

    async function updateUser(){

        const res = await fetch(`http://localhost:3020/api/user/${user?.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                firstName,
                lastName,
                email:user?.email
            })
        });

        if(res.ok){
            window.localStorage.removeItem("credentials");
            dispatch(logout({
                user:null,
                accessToken:null
            }));
            return router.push("/login")
        }

    }


    return (
        <div>
            <Card>
            <CardHeader>
                <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <h1 className="font-medium">FirstName: </h1>
                <p>{user?.firstName}</p>
                <h1 className="font-medium">LastName: </h1>
                <p>{user?.lastName}</p>
                <h1 className="font-medium">Email: </h1>
                <p>{user?.email}</p>
            </CardContent>
            <CardFooter>
                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                FirstName
                            </Label>
                            <Input
                            id="name"
                            defaultValue={user?.firstName}
                            className="col-span-3"
                            onChange={(e)=>setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                LastName
                            </Label>
                            <Input
                            id="username"
                            defaultValue={user?.lastName}
                            className="col-span-3"
                            onChange={(e)=>setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex flex-col">
                            <div>You have to login again after saving changes</div>
                            <Button type="submit" onClick={updateUser}>Save changes</Button>
                            <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                        </div>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </CardFooter>
            </Card>
        </div>
    )
}