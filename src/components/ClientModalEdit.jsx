import { Button, Divider, Input} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { boolean, number, z } from "zod"
import { AxiosInstance } from "../../API/axios"
import { toast } from "sonner"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"

const ClientModalEdit = ({closeModal, fetchCust}) => {
    const params = useParams()
    const [nameInput, SetNameInput] = useState("")
    const [phoneNumberInput, SetPhoneNumberInput] = useState("")
    const [addressInput, SetAddressInput] = useState("")
    const [initialdata, setinitialdata] = useState({
        id : params.id,
        name : "",
        phoneNumber : 0,
        address : ""
    })

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const GetCust = async (data) => {
        const response = await AxiosInstance.get("/api/v1/customers/" + params.id,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setinitialdata({...initialdata,
            name : response.data.data.name,
            phoneNumber : response.data.data.phoneNumber,
            address : response.data.data.address
        })
        console.log(response)
    }
    useEffect(()=>{GetCust()},[])

    const UpdateClient = async (data) => {
        try {
            const response = await AxiosInstance.put("/api/v1/customers", 
                {
                id : params.id,
                name : initialdata.name,
                phoneNumber : initialdata.phoneNumber,
                address : initialdata.address
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
                    type="text"
                    name="name"
                    label ="Masukkan Nama Pelanggan" 
                    className="w-96 m-3" 
                    value={initialdata.name}
                    onChange={(event)=>setinitialdata({...initialdata ,name : event.target.value})}
                />
                <Input
                    type="text"
                    name="phoneNumber"
                    label ="Masukkan Nomor Telepon" 
                    className="w-96 m-3" 
                    value={initialdata.phoneNumber}
                    onChange={(event)=>setinitialdata({...initialdata ,phoneNumber : event.target.value})}
                />
                <Input
                    type="text"
                    name="address"
                    label ="Masukkan Alamat Pelanggan" 
                    className="w-96 m-3" 
                    value={initialdata.address}
                    onChange={(event)=>setinitialdata({...initialdata ,address : event.target.value})}
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