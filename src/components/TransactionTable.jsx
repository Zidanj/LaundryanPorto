import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { BiDetail, BiPencil, BiTrash } from "react-icons/bi"



const TransactionTable = ({rows, deleteRow, editRow}) => {
    return (
        <Table aria-label="ClientTable" align="center">
            <TableHeader>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>Nama Pelanggan</TableColumn>
                <TableColumn>No. Telepon</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    rows.map ((rows,idx) => {
                        return <TableRow key = {idx}>
                            <TableCell>{rows.customer.name}</TableCell>
                            <TableCell>{rows.customer.address}</TableCell>
                            <TableCell>{rows.customer.phoneNumber}</TableCell>
                            <TableCell>
                                <Button color="secondary" className="mr-3 text-2xl" onClick={()=>editRow(idx)}><BiPencil/></Button>
                                <Button color="danger" className="mr-3 text-2xl"><BiDetail/></Button>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    )
}

export default TransactionTable