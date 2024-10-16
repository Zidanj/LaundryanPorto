import { BiCloset, BiHome, BiMale, BiMaleFemale, BiQr, BiSolidWasher } from "react-icons/bi";


function SidebarComp () {
  return (
    <div className = "h-screen text-xl">
      <div className="flex text-2xl mt-4">
      <img src="src/assets/Logolaundry.png" className="justify-between mb-14 rounded-full max-w-8"/>
        <h2 className="flex gap-4 ml-2 mb-4 max-w-32">Enigma Laundry</h2>
      </div>
      <div className="mt-4">
        <a href="#" className="flex gap-3 mb-20 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiHome/>
          Dashboard
        </a>
        <a href="#" className="flex gap-3 mb-20 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiQr/>
          Transaksi
        </a>
        <a href="#" className="flex gap-4 mb-20 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiCloset/>
          Produk
        </a>
        <a href="#" className="flex gap-4 mb-20 hover:bg-blue-950 rounded-lg p-2 hover:text-white">
          <BiMaleFemale/>
          Client
        </a>
      </div>

    </div>
  );
};

export default SidebarComp