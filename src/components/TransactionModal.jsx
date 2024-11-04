import { Input, Button, Divider, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { AxiosInstance } from "../../API/axios"
import Swal from "sweetalert2"

const TransactionModal = ({closeModal, fetchTrans}) => {
    const [product, setProduct] = useState([])
    const [cust, setCust] = useState([])
    const [selCus, setSelCust] = useState("")
    const [selProd, setSelProd] = useState("")
    const [qty, setQty] = useState("")
    const [total, setTotal] = useState("")
    const [productPrice, setProductPrice] = useState(0)

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
        try {const response = await AxiosInstance.post("api/v1/bills",
            {
                customerId : selCus.id,
                billDetails : [
                    {product : {
                        id : selProd.id
                    },
                    qty : parseInt(qty)
                }
                ]
            },
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
        )
        closeModal(true)
        Swal.fire({
            title : "Sukses!",
            text : "Data Berhasil Ditambahkan",
            icon : "success"
        })
        fetchTrans()
            
        } catch (error) {
            Swal.fire({
                title : "Gagal!",
                text : "Server Error!",
                icon : "error"
            })            
        }
    }

        useEffect(()=>{fetchCust()},[])
        useEffect(()=>{fetchProduk()},[])

    const handleProductChange = (e)=>{
        const prodId = e.target.value
        setSelProd(prodId)
        const produk = product.find((prod)=>prod.id === prodId)
        if(produk){
            setSelProd(produk)
            setProductPrice(produk.price)
        }
    }

    const handleCustChange = (e)=>{
        const custId = e.target.value
        setSelCust(custId)
        const customer = cust.find((cust)=>cust.id === custId)
        if(customer){
            setSelCust(customer)
        }
    }

    const handleQtyChange = (e) => {
        const quantity = e.target.value
        setQty(quantity)
        setTotal(quantity*productPrice)
    }

    return (
        <div className="fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center">
        <div className="animate-appearance-in bg-white shadow-blue-300 w-auto pt-5">
            <h1 className="text-center text-2xl font-bold">Add Produk</h1>
            <Divider/>
            <div className="flex-row w-96">
                <Select
                label = "Nama Pelanggan"
                value={selCus.id}
                onChange={handleCustChange}
                className="m-3">
                    {
                        Array.isArray(cust) && cust.map((item)=>{
                            return <SelectItem key={item.id}>
                                {item.name}
                            </SelectItem>
                        })
                    }
                </Select>
                <Select
                label = "Pilih Produk"
                value={selProd.id}
                onChange={handleProductChange}
                className="m-3">
                    {
                        Array.isArray(product) && product.map((item)=>{
                            return <SelectItem 
                            key={item.id}>
                                {item.name}
                            </SelectItem>
                        })
                    }
                </Select>
                <Input
                label ="Jumlah Item" 
                className="m-3"
                value={qty}
                onChange={handleQtyChange}
                />
                <Input
                readOnly
                type="number"
                label ="Harga Produk" 
                className="m-3" 
                value={selProd.price}
                />
                <Input
                type="number"
                label ="Total Harga" 
                className="m-3" 
                value={total}
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