import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa6";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import dashboard from '../assets/icon/icon.svg'
import trade from '../assets/icon/icon-trade.svg'
import briefcase from '../assets/icon/briefcase.svg'
import community from '../assets/icon/Group 4.svg'
import report from '../assets/icon/Group 5.svg'
import setting from '../assets/icon/Group 3.svg'
import BuyTrade from '../Components/BuyTrade';
import SellTrade from '../Components/SellTrade';
import TradeLogTable from '../Components/TradeLogTable';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';


function Dashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [market, setMarket] = useState(false)
    const [select, setSelect] = useState('Overview')
    // const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  return (
    <div className='bg-[#f8fafa]'>
        {/* navbar */}
        <div className='flex border-b-1 border-b-[#D6D6D6] bg-white sticky top-0 z-10'>
            <div className='logo flex justify-between items-center pl-3 pr-18 w-7/12 h-17 border-r-1 border-r-[#EDEDED]'>
                <img src={logo} alt="" />
                <div className='flex gap-1 items-center bg-[#F4F4F6] w-fit p-2 rounded-3xl cursor-pointer' onClick={toggleDarkMode}>
                    {
                        isDarkMode?
                        <>
                            <p className='ml-2 text-xs font-semibold'>LIGHT</p>
                            <div className='p-1 rounded-full bg-white'>
                                <FiSun size={20} />
                            </div>
                        </>
                        :
                        <>
                            <div className='p-1 rounded-full bg-white'>
                                <FaRegMoon size={20} />
                            </div>
                            <p className='mr-2.5 text-xs font-semibold'>DARK</p>
                        </>
                    }
                </div>
            </div>
            <div className="top-price md:flex space-x-6 w-4/12 flex justify-evenly items-center gap-8 px-6 border-r-1 border-r-[#D6D6D6]">
                <MdKeyboardArrowRight size={25} className='cursor-pointer' />
                <div className="text-sm text-black font-medium">
                    <span className="block text-[#778CA2] text-xs text-center">CASH BALANCE</span>
                    <span className="block font-bold text-center text-lg">₦8,374,763</span>
                </div>
                <div className="text-sm text-black font-medium">
                    <span className="block text-[#778CA2] text-xs text-center">SECURITIES VALUE</span>
                    <span className="block font-bold text-center text-lg">₦8,374,763</span>
                </div>
                <div className="text-sm text-black font-medium">
                    <span className="block text-[#778CA2] text-xs text-center">LOAN BALANCE</span>
                    <span className="block font-bold text-center text-lg">₦7,542,246</span>
                </div>
            </div>
            <div className='demo w-1/12 flex justify-end pr-3 gap-2 items-center'>
                <button className='bg-black py-2 px-4 text-xs text-white cursor-pointer'>DEMO</button>
                <MdKeyboardArrowDown size={20} className='cursor-pointer' />
            </div>
        </div>

        {/* dashboard content */}
        <div className='flex gap-3 w-full'>
            <div className='flex flex-col gap-10 w-fit py-8 px-4 bg-white' >
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Overview')}>
                    <img src={dashboard} alt="" />
                    <p className={`font-medium text-xs ${select==='Overview'? 'text-[#D71E0E]' : 'text-black'}`}>Overview</p>
                </div>
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Market')}>
                    <img src={trade} alt="" />
                    <p className={`font-medium text-xs ${select==='Market'? 'text-[#D71E0E]' : 'text-black'} `}>Market</p>
                </div>
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Portfolio')}>
                    <img src={briefcase} alt="" />
                    <p className={`font-medium text-xs ${select==='Portfolio'? 'text-[#D71E0E]' : 'text-black'}`}>Portfolio</p>
                </div>
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Community')}>
                    <img src={community} alt="" />
                    <p className={`font-medium text-xs ${select==='Community'? 'text-[#D71E0E]' : 'text-black'}`}>Community</p>
                </div>
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Reports')}>
                    <img src={report} alt="" />
                    <p className={`font-medium text-xs ${select==='Reports'? 'text-[#D71E0E]' : 'text-black'}`}>Reports</p>
                </div>
                <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={()=> setSelect('Settings')}>
                    <img src={setting} alt="" />
                    <p className={`font-medium text-xs ${select==='Settings'? 'text-[#D71E0E]' : 'text-black'}`}>Settings</p>
                </div>
            </div>
            {select === 'Market'? 
                <div className='market mt-3'>
                    <Sidebar />
                </div>
                :
                ''
            }
            
            <div className='flex flex-col w-full pr-3'>
                <div className='bg-white mt-3 w-full overflow-hidden'>
                    <div className='flex items-center py-3 gap-3 overflow-x-scroll scrollbar-hide w-full'>
                        <button className='py-1.5 px-4 text-l font-medium rounded-3xl'>Board</button>
                        <button className='bg-[#D71E0E] text-white py-1.5 px-4 text-l font-medium rounded-3xl'>X-Traded</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>OTC</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>FI</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>Derivatives</button>
                    </div>
                    <div className='flex items-center py-3 gap-3 overflow-x-scroll scrollbar-hide w-full'>
                        <button className='py-1.5 px-4 text-l font-medium rounded-3xl'>Product</button>
                        <button className='bg-[#D71E0E] text-white py-1.5 px-4 text-l font-medium rounded-3xl'>All</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SMAZ</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SBBS</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SPRL</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SGNG</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SSGM</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>FETC</button>
                        <button className='bg-[#F4F4F6] py-1.5 px-4 text-l font-medium rounded-3xl'>SCOC</button>
                    </div>
                </div>
                <div className='buy-sell flex gap-3 w-full pt-3'>
                    <BuyTrade />
                    <SellTrade />
                </div>
                <div>
                    <TradeLogTable />
                </div>
            </div>
        </div>

        {/* footer */}
        <div className='w-full flex sticky bottom-0 shadow-2xl shadow-gray-500'>
            <button className='w-40 bg-black text-white cursor-pointer'>Live Market</button>
            <Footer />
        </div>
    </div>
  )
}

export default Dashboard