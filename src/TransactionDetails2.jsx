import { Button, Divider, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { json, useNavigate, useParams } from "react-router-dom"
import { AxiosInstance } from "../../API/axios"
import { useCallback, useEffect, useState } from "react"
import SidebarComp from "./Sidebar"
import Header from "./Header"
import { BiDetail, BiPencil } from "react-icons/bi"


const DetailTrans = () => {
    const [initialdata, setInitialData] = useState(null);
    const { id } = useParams()
    const fetchTrans = useCallback(async (data) => {
        const response = await AxiosInstance.get(`/api/v1/bills/${id}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
        setInitialData(response.data.data)
        console.log(response.data.data)
    }, [id])


    useEffect(() => {
        // PENGECEKAN IYEU BERGUNA SUPAYA PEMANGGILAN API NA BAKAL JALAN LAMUN SI DETAIL DATA NA KOSONG MUNGKUL, LAMUN GEUS AYA MAH MANEHNA MOAL MANGGIL API CO
        if (!initialdata) {
            fetchTrans()
        }

    }, [initialdata])

    return (
        <div className="flex p-3">
            <SidebarComp />
            <div className="flex-1 bg-white rounded-lg">
                <Header />
                <div className="p-3">
                    <div className="flex items-center gap-10">
                        <h1 className="font-bold text-2xl">Transaksi</h1>
                        <Button color="primary">Tambah Transaksi</Button>
                        <div>
                            <Divider className="h-1" />
                        </div>
                    </div>
                    {initialdata && (
                        <div className="my-5">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Customer name</td>
                                        <td className="px-3">:</td>
                                        <td>{initialdata.customer.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Transaction date</td>
                                        <td className="px-3">:</td>
                                        <td>{new Date(initialdata.createdAt).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>


                <Table aria-label="ClientTable" align="center">
                    <TableHeader>
                        <TableColumn>Product Name</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Type</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {initialdata && initialdata.billDetails.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.product.type}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default DetailTrans