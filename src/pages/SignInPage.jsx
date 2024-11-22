import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {boolean, z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosInstance } from "../../API/axios";


const SignUpSchema = z.object({
    username : z.string().min(1),
    password : z.string().min(1),
})


function SignInPage(){
    const form = useForm({
        defaultValues: {
            username : "",
            password : "",
        },
        resolver : zodResolver(SignUpSchema)
    })
    const navigate = useNavigate()

        const fetchMe = async (data) => {
            try {
                const response = await AxiosInstance.post("api/v1/auth/login",{
                    username : data.username,
                    password : data.password,
                })    
                localStorage.setItem("token", response.data.data.token)
                sessionStorage.setItem("username", data.username)
                navigate("/transaksi")
                toast.success("Sign In Berhasil")
                
            } catch (error) {
                toast.error("Server Error")
            }
        }

    return(
        <div  className="flex h-screen items-center justify-center">
            <Card className="w-[300px] bg-white shadow-2xl">
                <CardHeader className="font-semibold text-lg">
                    Sign In!
                </CardHeader>
                <Divider/>
                <CardBody >
                    <form onSubmit={form.handleSubmit(fetchMe)}  className="flex flex-col gap-4">
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
                    <Button type="submit" color="primary">Sign In!</Button>
                    <Divider />
                    <Button className="bg-green-500 text-white" onClick={e=>{navigate("/register")}}>Register Now!</Button>
                    </form>
                </CardBody>
                <CardFooter className="flex justify-center">
                <h3>© 2024. Enigma Laundry</h3>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignInPage