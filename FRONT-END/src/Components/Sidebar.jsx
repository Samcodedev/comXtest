import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import trendingUp from '../assets/icon/trending-up.svg'
import book from '../assets/icon/book.svg'
import time from '../assets/icon/time.svg'
import eye from '../assets/icon/eye.svg'
import mark from '../assets/icon/mark.svg'
import close from '../assets/icon/close.svg'

const menuItems = [
  { name: "Product View", icon: trendingUp },
  { name: "Order Book", icon: book, active: true },
  { name: "Price History", icon: time },
  { name: "Open Orders", icon: eye },
  { name: "Closed Trades", icon: mark },
  { name: "Cancelled Trades", icon: close }
];

export default function Sidebar() {
  const [active, setActive] = useState("Order Book");

  return (
    <div className="w-72 h-fit bg-white p-3">
      <div className="relative mb-4">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-2 py-2 border border-[#D6D6D6] bg-[#F8FAFB] rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-3 py-4 px-8 cursor-pointer text-gray-700 hover:bg-gray-100 ${
              active === item.name ? "bg-gray-100 text-red-500 font-semibold" : ""
            }`}
          >
            <img src={item.icon} alt="icons" />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
