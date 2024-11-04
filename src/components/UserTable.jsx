import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { BiPencil, BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { AxiosInstance } from "../../API/axios"
import { useEffect } from "react"
import Swal from "sweetalert2"

const UserTable = ({rows, fetchUser, editRow}) => {
    const navigate = useNavigate()

    const deleteUser = async (id) => {
        const confirmation = Swal.fire({
            title : "Apakah Yakin Akan Menghapus Item Ini?",
            showDenyButton : true,
            showConfirmButton : true,
            confirmButtonText : "Ya!",
            denyButtonText : "Tidak!"
        })
        if((await confirmation).isConfirmed){
            const response = await AxiosInstance.delete(`/api/v1/users/${id}`,
                {
                    headers : {
                        Authorization : localStorage.getItem("token")
                    }
                }
            )
            Swal.fire("Data dihapus", "", "success")
            fetchUser()
        } else {
            Swal.fire("Data tidak dihapus", "", "error")
        }
    }
    return(
        <Table aria-label="Service Table" align="center">
            <TableHeader>
                <TableColumn>Nama User</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Username</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(rows)&&rows.map((row,idx) => {
                        return <TableRow key={idx}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>
                                <Button color="secondary" className="mr-3 text-2xl" onClick={()=>{navigate(`edit/${rows[idx][`id`]}`)}}><BiPencil/></Button>
                                <Button color="danger" className="mr-3 text-2xl" onClick={()=> {deleteUser(rows[idx]['id'])}}><BiTrash/></Button>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default UserTable