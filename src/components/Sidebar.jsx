import { BiAt, BiBlanket, BiCloset, BiFastForward, BiHome, BiMale, BiMaleFemale, BiQr, BiSolidWasher, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";


function SidebarComp () {
  return (
    <div className = "h-screen overflow-visible text-xl">
      <div className="flex text-2xl mt-4">
      <img src="src/assets/Logolaundry.png" className="justify-between mb-14 rounded-full max-w-8"/>
        <h2 className="flex gap-4 ml-2 mb-4 max-w-32">Enigma Laundry</h2>
      </div>
      <div className="mt-4">
        <Link to="/transaksi" className="flex gap-3 mb-10 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiQr/>
          Transaksi
        </Link>
        <Link to = "/produk" className="flex gap-4 mb-10 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiCloset/>
          Produk
        </Link>
        <Link to="/user" className="flex gap-4 mb-10 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiUser/>
          Pengguna
        </Link>
        <Link to = "/customer" className="flex gap-4 mb-10 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiMaleFemale/>
          Customer
        </Link>
      </div>

    </div>
  );
};

export default SidebarComp