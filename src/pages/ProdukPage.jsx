import { Button, Divider } from "@nextui-org/react"
import ProdukModal from "../components/ProdukModal"
import ProdukTable from "../components/ProdukTable"
import { useEffect, useState } from "react"
import SidebarComp from "../components/Sidebar"
import Header from "../components/Header"
import { AxiosInstance } from "../../API/axios"
import { Navigate, useNavigate, useParams } from "react-router-dom"

const ProdukPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [rowEdit, setRowEdit] = useState(null)
    const [rows,setRows] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const FetchProduk = async (data) => {
        const response = await AxiosInstance.get("/api/v1/products" ,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        setRows(response.data.data)
        sessionStorage.setItem("produk", response.data.data.length) 
    }

    useEffect(()=>{FetchProduk()},[])

    return(
        <>
         <div className="flex p-3">
            <SidebarComp/>
            <div className="flex-1 bg-white rounded-lg">
            <Header/>
                <div className="flex p-3 items-center gap-10">
                    <h1 className="font-bold text-2xl">Produk</h1>
                    <Button color="primary" onClick={()=>{setModalOpen(true)}}>Tambah Produk</Button>
                </div>
                <Divider className="h-1"/>
        <ProdukTable rows={rows} FetchProduk= {FetchProduk} />
        {modalOpen&&
        (<ProdukModal  
            closeModal = {()=>{
                setModalOpen(false)
            }}
            FetchProduk= {FetchProduk} 
            />
            )}    
            </div>      
            </div>      
                  
        </>
    )
}

export default ProdukPage