import { Card, CardBody, CardHeader,Divider } from "@nextui-org/react";
import SidebarComp from "../components/Sidebar";
import { BiCustomize, BiGroup, BiMagnet, BiMaleFemale, BiMoney, BiQrScan, BiShoppingBag } from "react-icons/bi";
import Header from "../components/Header";
import { useEffect } from "react";
import { AxiosInstance } from "../../API/axios";


function Dashboard (){

    return (
        <>
         <div className="flex p-3">
            <SidebarComp/>
            <div className="flex-1 bg-white rounded-lg">
                <div className="mb-3">
            <Header/>
                </div>
            <div className="flex-1 bg-white rounded-lg overflow-auto">
        <div>
            <h1 className="font-bold text-2xl ml-3">Dashboard</h1>
            <h3>{`halo ${sessionStorage.getItem("username")} have a nice day!`}</h3>
            <Divider className="h-2"/>
        </div>
        <div className="flex">
            <Card className="flex w-auto h-auto m-3 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl items-center">
                        <BiShoppingBag className="text-8xl"/>
                        <div>
                            <h1>Total Produk</h1>
                            <h1 className="text-center mt-3"><span>{sessionStorage.getItem("produk")}</span> Order</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="flex w-auto h-auto m-3 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl justify-around items-center">
                        <BiMoney className="text-8xl"/>
                        <div>
                            <h1>Total Transaksi</h1>
                            <h1 className="text-center mt-3">Rp.<span>0</span></h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="flex w-auto h-auto m-3 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl justify-around items-center">
                        <BiGroup className="text-8xl"/>
                        <div>
                            <h1>Total Pelanggan</h1>
                            <h1 className="text-center mt-3"><span>0</span> Pelanggan</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Dashboard