import { useEffect, useState } from "react"
import ClientTable from "../components/ClientTable"
import ClientModal from "../components/ClientModal"
import { Button, Divider } from "@nextui-org/react"
import SidebarComp from "../components/Sidebar"
import Header from "../components/Header"
import { AxiosInstance } from "../../API/axios"



const ClientPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [RowEdit, setRowEdit] = useState(null)
    const [rows, setRows] = useState([])

    const fetchCust = async (data) => {
        const response = await AxiosInstance.get("/api/v1/customers",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setRows(response.data.data)      
    }

    useEffect(()=>{fetchCust()},[])

    const handleEdit = (idx) => {
        setRowEdit (idx)

        setModalOpen(true)
    }

    const handleDeleteRow = (targetidx) => {
        setRows(rows.filter((_,idx) => idx !== targetidx))
    }

    const handleSubmit = (newRow) => {
        RowEdit === null ?
        setRows([...rows, newRow]) :
        setRows(rows.map((currRow, idx) => {
            if (idx !== RowEdit) return currRow

            return newRow
        }))
    }

    return (
        <>
        <div className="flex p-3">
            <SidebarComp/>
            <div className="flex-1 bg-white rounded-lg">
                <Header/>
                <div className="flex gap-10 p-3">
                    <h1 className="font-bold text-2xl ">Manajemen Pelanggan</h1>
                    <Button color="primary" onClick={()=>{setModalOpen(true)}}>Tambah Pelanggan</Button>
                </div>
                <Divider className="h-1"/>
            <ClientTable rows = {rows} fetchCust = {fetchCust} />
            {modalOpen && (<ClientModal
            closeModal = {()=>{
                setModalOpen(false)
            }} 
            fetchCust={fetchCust}
            />)}
            </div>
            </div>
        </>
    )
}

export default ClientPage