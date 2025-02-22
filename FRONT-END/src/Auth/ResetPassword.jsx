import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

function ResetPassword() {
    // const notify = () => toast("Wow so easy!");
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState({
        state: null,
        data: null,
    });
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setResponse({
                state: 400,
                data: { message: "Please enter your email address" }
            });
            return;
        }

        try {
            const resetResponse = await axios.post('http://localhost:3001/api/user/forgetPassword',
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setResponse({
                state: resetResponse.status,
                data: resetResponse.data,
            });

            // If successful, redirect to login after 2 seconds
            if (resetResponse.status < 300) {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

        } catch (error) {
            console.log("Password reset error:", error);
            
            setResponse({
                state: error.response?.status || 500,
                data: error.response?.data || { message: "Failed to send reset email. Please try again." }
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
                    <MdOutlineClose 
                        className='cursor-pointer' 
                        onClick={() => setResponse({ state: null, data: null })} 
                    />
                </div>
            )}

            {response.state && response.state < 300 && response.data && (
                <div className='flex justify-between items-center text-[#0d810d] border border-[#0d810d] bg-[#f4fef2] py-3 w-96 px-5 rounded-lg my-8'>
                    <p>{response.data.message || "Reset email sent successfully"}</p>
                    <MdOutlineClose 
                        className='cursor-pointer' 
                        onClick={() => setResponse({ state: null, data: null })} 
                    />
                </div>
            )}

            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full h-[570px]">
                <h2 className="text-3xl font-medium text-center mt-4">Password Reset</h2>
                <p className="text-center text-gray-500 mb-10 mt-3 text-sm">Reset your password to continue trading on ComX</p>
                <form onSubmit={handleResetPassword} className='flex flex-col items-center'>
                    <label className="block text-gray-700 mb-2 mt-4 text-left w-full">
                        Enter the Email Address you registered with
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 text-sm border border-[#E8ECEF] text-[#98A9BC] rounded w-full"
                    />
                    <p className='text-xs text-[#98A9BCCC] text-center mt-4'>
                        Note that you'll be sent an OTP to the email address provided
                    </p>

                    <div className="flex justify-between mt-8 w-full">
                        <Link to='/login'>
                            <button 
                                type="button"
                                className="w-fit bg-white text-[#252631] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm"
                            >
                                BACK
                            </button> 
                        </Link>
                        
                        <button 
                            type='submit'
                            className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm"
                        >
                            RESET PASSWORD
                        </button> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword