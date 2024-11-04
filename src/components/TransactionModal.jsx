import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { AxiosInstance } from "../../API/axios"

const TransactionModal = ({closeModal}) => {
    const [product, setProduct] = useState([])
    const [cust, setCust] = useState([])
    const token = localStorage.getItem("token")
    const fetchProduk = async(data) => {
        const response = await AxiosInstance.get('/api/v1/products',
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        setProduct(response.data.data)
        console.log(response.data.data)
    }
    const fetchCust = async(data) => {
        const response = await AxiosInstance.get('/api/v1/customers',
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        setCust(response.data.data)
    }
    const addTrans = async(data) => {
        const response = await AxiosInstance.post("/api/v1/bills",
            {
                customerId : "cbead6e9-2a17-4d39-812c-c8a36923a89d",
                billDetails : [
                    {product : {
                        id : "58e0c367-af5e-4b9e-ae56-75f3b53a0096"
                    },
                    qty : 5
                }
                ]
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        console.log(response.data)
    }
    useEffect(()=>{fetchCust()},[])
    useEffect(()=>{fetchProduk()},[])

    return (
        <div className="fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center">
        <div className="animate-appearance-in bg-white shadow-blue-300 w-auto pt-5">
            <h1 className="text-center text-2xl font-bold">Add Produk</h1>
            <Divider/>
            <div className="flex-row">
                <Select
                label = "Nama Pelanggan"
                className="m-3 w-96">
                    {
                        cust.map((item)=>{
                            return <SelectItem key={item.id}>
                                {item.name}
                            </SelectItem>
                        })
                    }
                </Select>
                <Select
                label = "Pilih Produk"
                className="w-96 m-3">
                    {
                        product.map((item)=>{
                            return <SelectItem key={item.id}>
                                {item.name}
                            </SelectItem>
                        })
                    }
                </Select>
                <Input
                type="text"
                name="TotalPembelian"
                label ="Total Pembelian" 
                className="w-96 m-3" 
                />
            </div>
            <div className="flex justify-end w-96 gap-3 m-3">
                <Button color="danger" onClick={closeModal}>Cancel</Button>
                <Button color="primary" onClick={addTrans}>Submit</Button>
            </div>
        </div>
    </div>
    )
}

export default TransactionModal