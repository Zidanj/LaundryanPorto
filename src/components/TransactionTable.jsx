import { Button, Table, TableBody, TableCell, TableColumn, TableHeader,TableRow } from "@nextui-org/react"
import { BiDetail, BiPaperclip, BiPencil, BiTrash } from "react-icons/bi"


function TransactionTable ({rows, deleteRow}){
    return (
        <>
        <Table align="center" aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Nama</TableColumn>
                <TableColumn>Nomor Telepon</TableColumn>
                <TableColumn>Alamat</TableColumn>
                <TableColumn>Biaya</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    rows.map((row,idx)=>{
                        return <TableRow key={idx}>
                            <TableCell>{row.Nama}</TableCell>
                            <TableCell>{row.NomorTelepon}</TableCell>
                            <TableCell>{row.Alamat}</TableCell>
                            <TableCell>{row.Biaya}</TableCell>
                            <TableCell>{row.Status}</TableCell>
                            <TableCell>
                                <Button className="mr-4 text-xl flex-col items-center" color="primary"><BiDetail/></Button>
                                <Button className="mr-4 text-xl flex-col items-center"><BiPencil/></Button>
                                <Button className = "mr-4 text-xl flex-col items-center" color="danger" onClick={()=>deleteRow(idx)}><BiTrash/></Button>
                            </TableCell>
                        </TableRow>
                    })
                    
                }
            </TableBody>
        </Table>
        </>
    )
}

export default TransactionTable