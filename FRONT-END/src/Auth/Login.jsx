import React, { useState } from "react";
import logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { MdOutlineClose } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [response, setResponse] = useState({
    state: null,
    data: null,
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post('/api/user/login', {
        email,
        password,
        staySignedIn
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setResponse({
        state: loginResponse.status,
        data: loginResponse.data,
      });

      // If login successful, redirect to dashboard after 1 second
      if (loginResponse.status < 300) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }

    } catch (error) {
      console.log("Login error:", error);
      
      setResponse({
        state: error.response?.status || 500,
        data: error.response?.data || { message: "Something went wrong" },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <img src={logo} alt="ComX Logo" />

      {/* Error/Success Messages */}
      {response.state && response.state > 299 && response.data && (
        <div className='flex justify-between items-center text-[#EF4444] border border-[#EF4444] bg-[#FEF2F2] py-3 w-96 px-5 rounded-lg my-8'>
          <p>{response.data.message || response.data?.error || "Something went wrong"}</p>
          <MdOutlineClose className='cursor-pointer' onClick={() => setResponse({ state: null, data: null })} />
        </div>
      )}

      {response.state && response.state < 300 && response.data && (
        <div className='flex justify-between items-center text-[#0d810d] border border-[#0d810d] bg-[#f4fef2] py-3 w-96 px-5 rounded-lg my-8'>
          <p>{response.data.message || "Login successful"}</p>
          <MdOutlineClose className='cursor-pointer' onClick={() => setResponse({ state: null, data: null })} />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full h-[570px]">
        {/* <div className="flex justify-center mb-6">
        </div> */}
        <h2 className="text-3xl font-medium text-center mt-4">Sign in to ComX</h2>
        <p className="text-center text-gray-500 mb-10 mt-3 text-sm">Enter your login credentials below.</p>
        <form onSubmit={handleLogin}>
          <label className="block text-gray-700 mb-2">Your Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 text-sm border border-[#E8ECEF] text-[#98A9BC] rounded w-full"
          />
          <label className="block text-gray-700 mb-2 mt-4">Your Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-sm border border-[#E8ECEF] text-[#98A9BC] rounded w-full"
          />
          <div className="flex items-center justify-between mb-4 mt-8">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 cursor-pointer"
                checked={staySignedIn}
                onChange={(e) => setStaySignedIn(e.target.checked)}
              /> Stay Signed in
            </label>
            <Link to='/Reset-password'><p className="text-red-500 text-sm">Forgot Password?</p></Link>
          </div>
          <button 
            type="submit"
            className="w-full bg-[#52965E] text-white py-3 rounded-xs text-sm mt-3 cursor-pointer"
          >
            Sign in
          </button>
          <Link to='/'>
            <button className="w-full bg-[#F8FAFB] text-black py-3 rounded-xs text-sm mt-5 cursor-pointer">
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
