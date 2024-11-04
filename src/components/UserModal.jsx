import { Sidebar } from "react-pro-sidebar"
import ProdukModal from "./ProdukModal"
import ProdukTable from "./ProdukTable"
import SidebarComp from "./Sidebar"
import { Button, Divider, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosInstance } from "../../API/axios"
import Swal from "sweetalert2"


const UserSchema = z.object({
    name : z.string().min(1, "Masukkan nama yang Valid"),
    email : z.string().email("Masukkan email yang valid"),
    username : z.string().min(4,"Masukkan username yang valid"),
    role : z.string().min(1,"Masukkan role yang valid"),
})

const UserModal = ({closeModal, fetchUser}) => {
    const token = localStorage.getItem("token")
    const form = useForm({
        defaultValues: {
            name : "",
            email : "",
            username : "",
            role : "",
        },
        resolver : zodResolver(UserSchema)
    })

    const addUser = async(data)=>{
        try {
            const response = await AxiosInstance.post('/api/v1/users',
                {
                    name : data.name,
                    email : data.email,
                    username : data.username,
                    role : data.role
                },
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            fetchUser()
            closeModal(true)
            Swal.fire({
                title : "Sukses!",
                text : "Data Berhasil Ditambahkan",
                icon : "success"
            })
        } catch (error) {
            Swal.fire({
                title : "Gagal!",
                text: "Server Error!",
                icon : "error"
            })
        }
        
    }


    return(
        <div className="fixed inset-0  bg-slate-600 bg-opacity-45 backdrop-blur-sm flex justify-center items-center">
            <div className="rounded-xl animate-appearance-in bg-white shadow w-auto pt-5">
                <h1 className="text-center text-2xl mb-3 font-bold font-sans">Tambah Pengguna</h1>
                <Divider/>
                <form onSubmit={form.handleSubmit(addUser)}>
                <Controller
                name = "name"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    type="text"
                    name="name" 
                    className="w-96 m-3"
                    label = "Masukkan Nama User"
                    isInvalid = {Boolean(fieldState.error)}
                    errorMessage = {fieldState.error?.message}
                    />)}
                />
                <Controller
                name = "email"
                control={form.control}
                render = {({field, fieldState})=>(<Input {...field} 
                    name="email"
                    className="w-96 m-3"
                    label = "Masukkan Email User"
                    isInvalid = {Boolean(fieldState.error)}
                    errorMessage = {fieldState.error?.message}
                    />)}
                />
                <Controller
                name = "username"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    name="username"
                    className="w-96 m-3"
                    label = "Masukkan Username"
                    isInvalid = {Boolean(fieldState.error)}
                    errorMessage = {fieldState.error?.message}
                    />)}
                />
                <Controller
                name = "role"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    name="role"
                    className="w-96 m-3"
                    label = "Masukkan Role User"
                    isInvalid = {Boolean(fieldState.error)}
                    errorMessage = {fieldState.error?.message}
                    />)}
                />
                <div className="flex justify-end gap-3 m-3">
                    <Button onClick={closeModal} color="danger">Cancel</Button>
                    <Button color="primary" type="submit">Submit</Button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default UserModal