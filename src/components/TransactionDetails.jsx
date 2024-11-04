import { Button, Divider, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { json, useNavigate, useParams } from "react-router-dom"
import { AxiosInstance } from "../../API/axios"
import { useEffect, useState } from "react"
import SidebarComp from "./Sidebar"
import Header from "./Header"
import { BiDetail, BiPencil } from "react-icons/bi"


const DetailTrans = () => {
    const [initialdata, setInitialData] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const fetchTrans = async (idx) => {
        const response = await AxiosInstance.get("/api/v1/bills/" + params.id,
            {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            }
        )
        setInitialData(response.data.data)
        console.log(initialdata)
    }
    useEffect(()=>{fetchTrans()},[params.id])
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
                            <TableCell>11</TableCell>
                            <TableCell>111</TableCell>
                            <TableCell>111</TableCell>
                            <TableCell>
                                <Button color="secondary" className="mr-3 text-2xl"><BiPencil/></Button>
                                <Button color="danger" className="mr-3 text-2xl"><BiDetail/></Button>
                            </TableCell>
                        </TableRow>
            </TableBody>
         </Table>
         </div>
        </div>
    )
}

export default DetailTrans