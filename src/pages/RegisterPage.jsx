import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {boolean, z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosInstance } from "../../API/axios";


const SignUpSchema = z.object({
    name : z.string().min(4),
    email : z.string().includes("@"),
    username : z.string().min(4),
    password : z.string().min(6),
    role : z.string().min(1)
})


function RegisterPage(){
    const form = useForm({
        defaultValues: {
            name : "",
            email : "",
            username : "",
            password : "",
            role : ""
        },
        resolver : zodResolver(SignUpSchema)
    })
    const navigate = useNavigate()

        const fetchMe = async (data) =>{
            try {
                const response = await AxiosInstance.post("api/v1/auth/register",{
                    name : data.name,
                    email : data.email,
                    username : data.username,
                    password : data.password,
                    role : data.role
                })
                navigate("/")
                toast.success("Registrasi berhasil, kembali ke login page") 

            } catch (error) {
                toast.warning("error username salah")
            }
            
        }

    return(
        <div  className="flex h-screen items-center justify-center">
            <Card className="w-[300px] bg-white shadow-2xl">
                <CardHeader className="font-semibold text-lg">
                    Register Account
                </CardHeader>
                <Divider/>
                <CardBody >
                    <form onSubmit={form.handleSubmit(fetchMe)}  className="flex flex-col gap-4">
                    <Controller
                    name="name"
                    control={form.control}
                    render={({field, fieldState})=>(<Input {...field} 
                    label = "Name" 
                    isInvalid={Boolean(fieldState.error)} 
                    errorMessage={fieldState.error?.message}/>)}
                    />
                    <Controller
                    name="email"
                    control={form.control}
                    render={({field, fieldState})=>(<Input {...field} 
                    label = "Email"
                    type="email" 
                    isInvalid={Boolean(fieldState.error)} 
                    errorMessage={fieldState.error?.message}/>)}
                    />
                    <Controller
                    name="username"
                    control={form.control}
                    render={({field, fieldState})=>(<Input {...field} 
                    label = "Username" 
                    isInvalid={Boolean(fieldState.error)} 
                    errorMessage={fieldState.error?.message}/>)}
                    />
                    <Controller
                    name="password"
                    control={form.control}
                    render={({field,fieldState})=>(<Input {...field} 
                    type= "password" 
                    label = "Password" 
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    />)}
                    />
                    <Controller
                    name="role"
                    control={form.control}
                    render={({field,fieldState})=>(<Input {...field} 
                    label = "Role" 
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    />)}
                    />
                    <Button className="bg-green-500 text-white"type="submit" >Register Now!</Button>
                    </form>
                </CardBody>
                <CardFooter className="flex justify-center">
                <h3>© 2024. Enigma Laundry</h3>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage