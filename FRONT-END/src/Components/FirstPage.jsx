import React from "react";
import logo from '../assets/logo.svg'
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <img src={logo} alt="ComX Logo" className="mb-8" />
      
      <div className="space-y-12 w-full max-w-md">
        <div className="bg-white p-6 rounded-sm text-center">
          <h2 className="text-2xl font-semibold">Sign in to ComX</h2>
          <p className="text-gray-500 mb-7 text-sm mt-1">Welcome to ComX</p>
          <Link to='/login'><button className="w-full bg-[#52965E] text-white py-3 rounded-xs text-sm cursor-pointer">Sign in</button></Link>
        </div>

        <div className="bg-white p-6 rounded-sm text-center">
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <p className="text-gray-500 mb-7 text-sm mt-1">Join the Family</p>
          <Link to='/register'><button className="w-full bg-black text-white py-3 rounded-xs text-sm cursor-pointer">Register</button></Link>
          
        </div>
      </div>
      
      <button className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg flex items-center">
        <div className="absolute right-15 border border-red-500 -bottom-2 w-40 mb-2 bg-white text-red-500 text-sm p-2 rounded-2xl shadow-lg">
          <h1 className="font-bold text-black">Hi, I’m Adanna</h1>
          <span className="text-gray-500">How may I help you?</span>
        </div>
        <FaRegCommentDots size={24} />
      </button>
    </div>
  );
};

export default FirstPage;

