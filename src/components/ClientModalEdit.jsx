import { Button, Divider, Input} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { boolean, number, z } from "zod"
import { AxiosInstance } from "../../API/axios"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"

const ClientSchema = z.object({
    name : z.string().min(1,"Masukkan Nama Produk"),
    phoneNumber : z.string().min(1,"Masukkan Harga Produk"),
    address : z.string().min(1,"Masukkan Satuan Produk")
})

const ClientModalEdit = ({closeModal, fetchCust}) => {

    const [nameInput, SetNameInput] = useState("")
    const [phoneNumberInput, SetPhoneNumberInput] = useState("")
    const [addressInput, SetAddressInput] = useState("")

    const token = localStorage.getItem("token")
    const params = useParams()
    const navigate = useNavigate()

    const GetCust = async (data) => {
        const response = await AxiosInstance.get("/api/v1/customers" + params.id,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
    }

    const UpdateClient = async (data) => {
        try {
            const response = await AxiosInstance.put("/api/v1/customers", 
                {
                id : params.id,
                name : nameInput,
                phoneNumber : phoneNumberInput,
                address : addressInput
                },  
                {
                    headers : {
                        Authorization : localStorage.getItem("token")
                }
                })
                Swal.fire({
                    title : "Sukses!",
                    text : "Data berhasil diupdate",
                    icon : "success"
                })
                navigate("/customer")
            } catch (error) {
                Swal.fire({
                    title : "Gagal!",
                    text : "Data gagal diUpdate, server error",
                    icon : "error"
                })  
            }}

    return (
        <div className="fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center"
        onClick={(e)=>{
            if(e.target.className === "fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center")closeModal()
        }}>
        <div className="animate-appearance-in bg-white shadow-blue-300 w-auto pt-5">
            <h1 className="text-center text-2xl font-bold">Add Produk</h1>
            <Divider/>
            <div>
                <Input
                readOnly
                    type="text"
                    name="name"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    value={params.id}
                />
                <Input
                    type="text"
                    name="name"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    value={nameInput}
                    onChange={(event)=>{SetNameInput(event.target.value)}}
                />
                <Input
                    type="text"
                    name="phoneNumber"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    value={phoneNumberInput}
                    onChange={(event)=>{SetPhoneNumberInput(event.target.value)}}
                />
                <Input
                    type="text"
                    name="address"
                    label ="Masukkan kode produk" 
                    className="w-96 m-3" 
                    value={addressInput}
                    onChange={(event)=>{SetAddressInput(event.target.value)}}
                />  
            </div>
            <div className="flex justify-end w-96 gap-3 m-3">
                <Button color="danger" onClick={()=>{navigate("/customer")}}>Cancel</Button>
                <Button color="primary" onClick={UpdateClient}>Submit</Button>
            </div>
        </div>
    </div>
    )
}

export default ClientModalEdit