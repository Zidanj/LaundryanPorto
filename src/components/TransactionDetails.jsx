import { Button, Divider, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { json, useNavigate, useParams } from "react-router-dom"
import { AxiosInstance } from "../../API/axios"
import { useCallback, useEffect, useState } from "react"
import SidebarComp from "./Sidebar"
import Header from "./Header"
import { BiDetail, BiPencil } from "react-icons/bi"


const DetailTrans = () => {
    const [initialdata, setInitialData] = useState([])
    const {id} = useParams()
    const fetchTrans = useCallback(async (data) => {
        const response = await AxiosInstance.get(`/api/v1/bills/${id}`,
            {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }
        )
        setInitialData(response.data.data)
        console.log(initialdata)
    },[id])
    useEffect(()=>{fetchTrans()},[])
    return(
        <div className="flex p-3">
            <SidebarComp/>
            <div className="flex-1 bg-white rounded-lg">
                <Header/>
                <div className="flex p-3 items-center gap-10">
                    <h1 className="font-bold text-2xl">Transaksi</h1>
                    <Button color="primary">Tambah Transaksi</Button>
                <div>
                <Divider className="h-1"/>
                </div>
            </div>
            <Table aria-label="ClientTable" align="center">
            <TableHeader>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>No. Telepon</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                        <TableRow>
                        <TableCell>1111</TableCell>
                        <TableCell>1111</TableCell>
                        <TableCell>111111</TableCell>
                        <TableCell>111111</TableCell>
                    </TableRow>
            </TableBody>
         </Table>
         </div>
        </div>
    )
}

export default DetailTrans