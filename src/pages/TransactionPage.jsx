import { useEffect, useState } from "react"
import { Button, Divider } from "@nextui-org/react"
import TransactionTable from "../components/TransactionTable"
import TransactionModal from "../components/TransactionModal"
import SidebarComp from "../components/Sidebar"
import Header from "../components/Header"
import { AxiosInstance } from "../../API/axios"

const TransactionPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [RowEdit, setRowEdit] = useState(null)
    const [rows, setRows] = useState([])

    const fetchTrans = async (idx) => {
        const response = await AxiosInstance.get("/api/v1/bills",
            {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }
        )
        setRows(response.data.data)   
        console.log(response.data.data)    
    }
    useEffect(()=>{fetchTrans()},[])

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
                <div className="flex p-3 items-center gap-10">
                    <h1 className="font-bold text-2xl">Transaksi</h1>
                    <Button color="primary" onClick={()=>{setModalOpen(true)}}>Tambah Transaksi</Button>
                </div>
                <Divider className="h-1"/>
                <TransactionTable rows = {rows} deleteRow = {handleDeleteRow} editRow = {handleEdit}/>
                {modalOpen && (<TransactionModal
                closeModal = {()=>{
                    setModalOpen(false)
                    setRowEdit(null)
                }} 
                onSubmit = {handleSubmit}
                fetchTrans = {fetchTrans}
                />)}
            </div>
        </div>
        </>
    )
}

export default TransactionPage