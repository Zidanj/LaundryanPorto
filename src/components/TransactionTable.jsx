import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { BiDetail, BiPencil, BiTrash } from "react-icons/bi"
import { useNavigate } from "react-router-dom"



const TransactionTable = ({rows, editRow}) => {
    const navigate = useNavigate()
    return (
        <Table aria-label="ClientTable" align="center">
            <TableHeader>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>Alamat</TableColumn>
                <TableColumn>No. Telepon</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    Array.isArray(rows) && rows.map ((row,idx) => {
                        return <TableRow key = {idx}>
                            <TableCell>{row.customer.name}</TableCell>
                            <TableCell>{row.customer.address}</TableCell>
                            <TableCell>{row.customer.phoneNumber}</TableCell>
                            <TableCell>
                                <Button color="secondary" className="mr-3 text-2xl" onClick={()=>editRow(idx)}><BiPencil/></Button>
                                <Button color="danger" className="mr-3 text-2xl" onClick={()=>{navigate(`detail/${rows[idx]['id']}`)}}><BiDetail/></Button>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default TransactionTable