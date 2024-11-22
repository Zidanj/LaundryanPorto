import { Sidebar } from "react-pro-sidebar"
import ProdukModal from "./ProdukModal"
import ProdukTable from "./ProdukTable"
import SidebarComp from "./Sidebar"
import { Button, Divider, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { AxiosInstance } from "../../API/axios"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"



const UserModalEdit = ({closeModal}) => {
    const params = useParams()
    const navigate = useNavigate()
    const [initialdata, setinitialdata] = useState({
        id : params.id,
        name : "",
        email : "",
        username : "",
        role : ""
    })
    
    const GetUser = async (data) => {
        const response = await AxiosInstance.get("/api/v1/users/" + params.id, 
            {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }
        )
        setinitialdata({...initialdata,
            name : response.data.data.name,
            email : response.data.data.email,
            username : response.data.data.username,
            role : response.data.data.role
        })
        console.log(initialdata)
    }
    useEffect(()=>{GetUser()},[])


    const updateUser = async (data) => {
        const response = await AxiosInstance.put("/api/v1/users/",
            {
                id : params.id,
                name : initialdata.name,
                email : initialdata.email,
                username : initialdata.username,
                role : initialdata.role
            },
            {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }
        )
        Swal.fire("Sukses", "Data telah dirubah", "success")
        navigate("/user")
    }
    // useEffect(()=>{updateUser()},[])

    return(
        <div className="fixed inset-0  bg-slate-600 bg-opacity-45 backdrop-blur-sm flex justify-center items-center">
            <div className="rounded-xl animate-appearance-in bg-white shadow w-auto pt-5">
                <h1 className="text-center text-2xl mb-3 font-bold font-sans">Tambah Pengguna</h1>
                <Divider/>
                <Input
                type="text"
                name="name" 
                className="w-96 m-3"
                label = "Masukkan Nama Pengguna"
                value={initialdata.name}
                onChange={(event)=>setinitialdata({...initialdata, name : event.target.value})}
                />
                <Input 
                name="Email"
                className="w-96 m-3"
                label = "Masukkan Alamat Email Pengguna"
                value={initialdata.email}
                onChange={(event)=>setinitialdata({...initialdata, email : event.target.value})}
                />
                <Input 
                name="Username"
                className="w-96 m-3"
                label = "Masukkan Username"
                value={initialdata.username}
                onChange={(event)=>setinitialdata({...initialdata, username : event.target.value})}
                />
                <Input 
                name="role"
                className="w-96 m-3"
                label = "Masukkan Peran Pengguna"
                value={initialdata.role}
                onChange={(event)=>setinitialdata({...initialdata, role : event.target.value})}
                />
                <div className="flex justify-end gap-3 m-3">
                    <Button onClick={(e)=>navigate("/user")} color="danger">Cancel</Button>
                    <Button color="primary" onClick={()=>{updateUser()}}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UserModalEdit