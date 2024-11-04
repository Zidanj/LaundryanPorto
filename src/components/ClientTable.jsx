import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { BiPencil, BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { AxiosInstance } from "../../API/axios"



const ClientTable = ({rows, fetchCust}) => {
    const navigate = useNavigate()
    const deleteCust = async (id) => {
        const confirmation = Swal.fire({
            title : "Apakah Yakin Akan Menghapus Item Ini?",
            showDenyButton : true,
            showConfirmButton : true,
            confirmButtonText : "Ya!",
            denyButtonText : "Tidak!"
        })
        if((await confirmation).isConfirmed){
            const response = await AxiosInstance.delete(`/api/v1/customers/${id}`,{
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            Swal.fire("Data dihapus", "", "success")
            fetchCust()
        } else {
            Swal.fire("Data tidak dihapus", "", "error")
        }
    }
    return (
        <Table aria-label="ClientTable" align="center">
            <TableHeader>
                <TableColumn>Id Pelanggan</TableColumn>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>Total Pembelian</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(rows)&&rows.map ((row,idx) => {
                        return <TableRow key = {idx}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>
                                <Button color="secondary" className="mr-3 text-2xl" onClick={()=>{navigate(`edit/${rows[idx]['id']}`)}}><BiPencil/></Button>
                                <Button color="danger" className="mr-3 text-2xl" onClick={()=> deleteCust(rows[idx]['id'])}><BiTrash/></Button>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default ClientTable