import { Button, Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import SidebarComp from "../components/Sidebar"
import Header from "../components/Header"
import UserModal from "../components/UserModal"
import UserTable from "../components/UserTable"
import { AxiosInstance } from "../../API/axios"


const UserPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [rows, setRows] = useState([])

    const fetchUser = async (data) => {
        const response = await AxiosInstance.get("/api/v1/users",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setRows(response.data.data)
    }

    useEffect(()=>{fetchUser()},[])

    return (
        <>
        <div className="flex p-3">
            <SidebarComp/>
            <div className="flex-1 bg-white rounded-lg">
                <Header/>
                <div className="flex p-3 items-center gap-10">
                    <h1 className="font-bold text-2xl">Pengguna</h1>
                    <Button color="primary" onClick={()=>{setModalOpen(true)}}>Tambah Pengguna</Button>
                </div>
                <Divider className="h-1"/>
        <UserTable rows = {rows} fetchUser = {fetchUser}/>
        {modalOpen && (<UserModal
        closeModal = {()=> {
            setModalOpen(false)
        }}
        fetchUser = {fetchUser}
        />)}
        </div>
        </div>
        </>
    )
}

export default UserPage