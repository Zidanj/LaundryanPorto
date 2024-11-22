import { Button, Divider, Input} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { AxiosInstance } from "../../API/axios"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"



const ProdukModalEdit = ({closeModal}) => {
    const params = useParams()
    const navigate = useNavigate()
    const [initialdata, setinitialdata] = useState({
        id : params.id,
        name : "",
        price : "",
        type : ""
    })

    const GetProduk = async (data) => {
        const response = await AxiosInstance.get("/api/v1/products/" + params.id,
            {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setinitialdata({...initialdata, 
            name : response.data.data.name,
            price : response.data.data.price,
            type : response.data.data.type
        })
        console.log(response.data.data)
    }
    useEffect(()=>{GetProduk()},[])

    const UpdateProduk = async(data) => {
        try {
            const response = await AxiosInstance.put("/api/v1/products/", 
                {
                    id : params.id,
                    name : initialdata.name,
                    price : parseInt(initialdata.price),
                    type : initialdata.type
                },
                {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            navigate("/produk")
            Swal.fire({
                title : "Sukses!",
                text : "Data berhasil diupdate",
                icon : "success"
            })
        } catch (error) {
            Swal.fire({
                title : "Gagal!",
                text : "Data gagal diUpdate, server error",
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
            <h1 className="text-center text-2xl font-bold">Edit Produk</h1>
            <Divider/>
            <div>
                <Input 
                type="text"
                name="name"
                label ="Masukkan nama produk" 
                className="w-96 m-3"
                value = {initialdata.name}
                onChange={(event)=>setinitialdata({...initialdata, name : event.target.value})}
                />
                <Input 
                type="number"
                name="price"
                label ="Masukkan harga produk" 
                className="w-96 m-3" 
                value = {initialdata.price}
                onChange={(event)=>setinitialdata({...initialdata, price : event.target.value})}
                />
                <Input
                type="text"
                name="type"
                label ="Masukkan Tipe" 
                className="w-96 m-3" 
                value = {initialdata.type}
                onChange={(event)=>setinitialdata({...initialdata, type : event.target.value})}
                />
            </div>
            <div className="flex justify-end w-96 gap-3 m-3">
                <Button color="danger" onClick={()=>{navigate("/produk")}}>Cancel</Button>
                <Button color="primary" onClick={UpdateProduk}>Submit</Button>
            </div>
        </div>
    </div>
    )
}

export default ProdukModalEdit