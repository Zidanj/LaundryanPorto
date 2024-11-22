import { Table, TableColumn, TableRow,TableHeader, TableCell, TableBody, Button } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { BiDetail, BiPencil, BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { AxiosInstance } from "../../API/axios"
import Swal from "sweetalert2"


const ProdukTable = ({rows, FetchProduk}) => {
const navigate = useNavigate()

const deleteProduk = async (id) => {
    const confirmation = Swal.fire({
        title : "Apakah Yakin Akan Menghapus Item Ini?",
        showDenyButton : true,
        showConfirmButton : true,
        confirmButtonText : "Ya!",
        denyButtonText : "Tidak!",
        icon : "warning"
    })
    if((await confirmation).isConfirmed){
        const response = await AxiosInstance.delete(`/api/v1/products/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        FetchProduk()
        Swal.fire("Data dihapus", "", "success")
    } else {
        Swal.fire("Data tidak dihapus", "", "error")
    }
}



    return (
        <div>
            <Table align="center" aria-label="Produk Table">
                <TableHeader>
                    <TableColumn>Nama Produk</TableColumn>
                    <TableColumn>Harga</TableColumn>
                    <TableColumn>Tipe</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        Array.isArray(rows) && rows.map((row, idx)=> {
                            return <TableRow key={idx}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>
                                    <Button className="text-2xl mr-3" color="secondary" onClick={()=>{navigate(`edit/${rows[idx]['id']}`)}}><BiPencil/></Button>
                                    <Button className="text-2xl" color="danger" onClick={()=>deleteProduk(rows[idx]['id'])}><BiTrash/></Button>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ProdukTable