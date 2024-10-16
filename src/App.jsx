import {Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SidebarComp from "./components/Sidebar"
import Transaksi from "./pages/TransactionPage"



function App() {
  return (
    <>
    <div className="flex"> 
    <SidebarComp/>
      <div className="flex-1 bg-white rounded-3xl">
    <Routes>
        <Route element = {<Dashboard/>} path="/"/>
        <Route element = {<Transaksi/>} path="/transaksi"/>
    </Routes>
      </div>
    </div>
    </>
  )
}

export default App
