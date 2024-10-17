import { useState } from "react"
import TransactionModal from "../components/TransactionModal"
import TransactionTable from "../components/TransactionTable"


function Transaksi(){
    const [rows, setRows] = useState([
        {Nama : "Lena Anjana", NomorTelepon : "0895331472802", Alamat: "Desa Bojong Asih", Biaya : "10000", Status : "Process"},
        {Nama : "Zidan", NomorTelepon : "0895331472802", Alamat: "Desa Cigado", Biaya : "9000", Status : "Process"}
    ])

    const [rowToEdit, setrowToEdit] = useState (null)

    const handleDeleteRow = (targetIdx) =>{
        setRows(rows.filter((_,idx)=> idx !== targetIdx))
    }

    const handleEditRow = (idx) => {
        setrowToEdit(idx)
        
        
    }

    const handleSubmit = (newRow) => {
        setRows([...rows, newRow])
    }

    return(
        <>
        <TransactionModal
        onSubmit = {handleSubmit}
        />
        <TransactionTable rows = {rows} deleteRow = {handleDeleteRow} editRow = {handleEditRow}/>
        </>
    )
}

export default Transaksi