import {Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProdukPage from "./pages/ProdukPage"
import ClientPage from "./pages/ClientPage"
import TransactionPage from "./pages/TransactionPage"
import SignInPage from "./pages/SignInPage"
import { Toaster } from "sonner"
import RegisterPage from "./pages/RegisterPage"
import ProdukModalEdit from "./components/ProdukModalEdit"
import UserPage from "./pages/UserPage"
import ClientModalEdit from "./components/ClientModalEdit"
import UserModalEdit from "./components/UserModalEdit"
import DetailTrans from "./components/TransactionDetails"



function App() {
  return (
    <>
    <Toaster position="top-right" richColors expand={true}/>
    <Routes>
        <Route element = {<RegisterPage/>} path = "/register"/>
        <Route element = {<SignInPage/>} path="/"/>
        <Route element = {<Dashboard/>} path="/home"/>
        <Route element = {<TransactionPage/>} path = "/transaksi" />
        <Route element = {<ProdukPage/>} path = "/produk"/>
        <Route element = {<UserPage/>} path = "/user"/>
        <Route element = {<ClientPage/>} path="/customer"/>
        <Route element = {<ProdukModalEdit/>} path="/produk/edit/:id"/>
        <Route element = {<ClientModalEdit/>} path="/customer/edit/:id"/>
        <Route element = {<UserModalEdit/>} path="/user/edit/:id"/>
        <Route element = {<DetailTrans/>} path="/transaksi/detail/:id"/>
    </Routes>
    </>
  )
}

export default App
