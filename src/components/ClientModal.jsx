import { Button, Divider, Input} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { boolean, number, z } from "zod"
import { AxiosInstance } from "../../API/axios"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from "sweetalert2"

const ClientSchema = z.object({
    name : z.string().min(1,"Masukkan Nama Produk"),
    phoneNumber : z.string().min(1,"Masukkan Harga Produk"),
    address : z.string().min(1,"Masukkan Satuan Produk")
})

const ClientModal = ({closeModal, fetchCust}) => {
    const token = localStorage.getItem("token")
    const form = useForm({
        defaultValues : {
            name : "",
            phoneNumber : "",
            address : ""
        },
        resolver : zodResolver(ClientSchema)
    })
    const AddClient = async (data) => {
        try {
            const response = await AxiosInstance.post("api/v1/customers", 
                {
                name : data.name,
                phoneNumber : data.phoneNumber,
                address : data.address
            },  
                {
                    headers : {
                        Authorization : `Bearer ${token}`
                }
                })
                closeModal(true)
                fetchCust()
                Swal.fire({
                    title : "Sukses!",
                    text : "Produk Berhasil Ditambahkan",
                    icon : "success"
                })
        } catch (error) {
            Swal.fire({
                title : "Gagal",
                text : "Server error",
                icon : "error"
            })
        }
    }

    return (
        <div className="fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center"
        onClick={(e)=>{
            if(e.target.className === "fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center")closeModal()
        }}>
        <div className="animate-appearance-in bg-white shadow-blue-300 w-auto pt-5">
            <h1 className="text-center text-2xl font-bold">Add Produk</h1>
            <Divider/>
            <form onSubmit={form.handleSubmit(AddClient)}>
            <div>
                <Controller
                name = "name"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    type="text"
                    name="name"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    />)}
                />
                <Controller
                name = "phoneNumber"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    type="text"
                    name="phoneNumber"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    />)}
                />
                <Controller
                name = "address"
                control={form.control}
                render={({field, fieldState})=>(<Input {...field}
                    type="text"
                    name="address"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    />)}
                />
                
            </div>
            <div className="flex justify-end w-96 gap-3 m-3">
                <Button color="danger" onClick={closeModal}>Cancel</Button>
                <Button color="primary" type="submit">Submit</Button>
            </div>
            </form>
        </div>
    </div>
    )
}

export default ClientModal