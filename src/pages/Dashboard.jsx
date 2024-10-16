import { Card, CardBody, CardHeader,Divider } from "@nextui-org/react";
import SidebarComp from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BiCustomize, BiGroup, BiMagnet, BiMaleFemale, BiMoney, BiQrScan, BiShoppingBag } from "react-icons/bi";


function Dashboard (){
    return (
        <>
        <div>
            <h1 className="mt-4 mr-4 ml-4 text-4xl">Dashboard</h1>
            <p className=" mr-4 ml-4 text-lg">Hi Lena, have a nice day! Welcome to Enigma Laundry Management System</p>
            <Divider className="h-2"/>
        </div>
        <div className="flex">
            <Card className="flex w-96 h-32 m-4 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl justify-around items-center">
                        <BiShoppingBag className="text-8xl"/>
                        <div>
                            <h1>Total Order Anda</h1>
                            <h1 className="text-center mt-3"><span>0</span> Order</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="flex w-96 h-32 m-4 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl justify-around items-center">
                        <BiMoney className="text-8xl"/>
                        <div>
                            <h1>Total Pemasukkan</h1>
                            <h1 className="text-center mt-3">Rp.<span>0</span></h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="flex w-96 h-32 m-4 bg-slate-700 text-white">
                <CardBody>
                    <div className="flex text-2xl justify-around items-center">
                        <BiGroup className="text-8xl"/>
                        <div>
                            <h1>Total Pelanggan Anda</h1>
                            <h1 className="text-center mt-3"><span>0</span> Pelanggan</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
        </>
    )
}

export default Dashboard