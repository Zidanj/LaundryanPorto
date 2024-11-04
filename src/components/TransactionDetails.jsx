import { Button, Divider, Input } from "@nextui-org/react"
import { useParams } from "react-router-dom"


const DetailTrans = () => {
    const params = useParams()
    return(
        <div className="fixed inset-0  bg-slate-500 bg-opacity-45 backdrop-blur-sm flex justify-center items-center">
        <div className="animate-appearance-in bg-white shadow-blue-300 w-auto pt-5">
            <h1 className="text-center text-2xl font-bold">Add Produk</h1>
            <Divider/>
            <div>
                <Input 
                type="text"
                name="id"
                label ="Bill Id" 
                className="w-96 m-3"
                value={params.id}
                />
                <Input 
                type="text"
                name="NamaPelanggan"
                label ="Produk" 
                className="w-96 m-3" 
                />
                <Input
                type="text"
                name="TotalPembelian"
                label ="Harga" 
                className="w-96 m-3" 
                />
                <Input
                type="text"
                name="TotalPembelian"
                label ="Qty" 
                className="w-96 m-3" 
                />
            </div>
            <div className="flex justify-end w-96 gap-3 m-3">
                <Button color="danger">Cancel</Button>
                <Button color="primary">Submit</Button>
            </div>
        </div>
    </div>
    )
}

export default DetailTrans