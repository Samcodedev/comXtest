import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import logo from '../assets/logo.svg'
import avatar from '../assets/success.png'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import axios from 'axios';
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

const CheckIn = () => {
  const [step, setStep] = useState(1);
  // const [user, setUser] = useState('Corporate')
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false)

  const [accountType, setAccountType] = useState('corporate')
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [companyName, setCompanyName] = useState()
  const [businessType, setBusinessType] = useState()
  const [dateOfIncorporation, setDateOfIncorporation] = useState()

  const [otp, setOtp] = useState()
  const [response, setResponse] = useState({
    state: null,
    data: null,
  });
  // const [errorResponse, setErrorResponse] = useState({
  //   state: null,
  //   data: null,
  // });


  

  

      
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2Fields()) {
      setError(true);
      return;
    }

    try {
      const RegisterResponse = await axios.post('/api/user/register', {
        accountType,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        companyName,
        businessType,
        dateOfIncorporation,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setResponse({
        state: RegisterResponse.status,
        data: RegisterResponse.data,
      });

      if (RegisterResponse.status < 300) {
        setTimeout(() => {
          setStep(step + 1);
        }, 1000);
      }

    } catch (error) {
      console.log("Registration error:", error);
      
      setResponse({
        state: error.response?.status || 500,
        data: error.response?.data || { message: "Registration failed. Please try again." },
      });
    }
  };
  
      
  const verifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError(true);
      return;
    }

    try {
      const OTPResponse = await axios.post('/api/user/verify', 
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse({
        state: OTPResponse.status,
        data: OTPResponse.data,
      });

      if (OTPResponse.status < 300) {
        setTimeout(() => {
          setStep(step + 1);
        }, 1000);
      }

    } catch (error) {
      console.log("OTP verification error:", error);
      
      setResponse({
        state: error.response?.status || 500,
        data: error.response?.data || { message: "OTP verification failed. Please try again." },
      });
    }
  };
  
      
  const resendOTP = async (e) => {
    e.preventDefault();

    try {
      const OTPResponse = await axios.post('http://localhost:3001/api/user/resend-otp', 
        { email }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setResponse({
        state: OTPResponse.status,
        data: OTPResponse.data,
      });

    } catch (error) {
      console.log("Resend OTP error:", error);
      
      setResponse({
        state: error.response?.status || 500,
        data: error.response?.data || { message: "Failed to resend OTP. Please try again." },
      });
    }
  }

  const phoneCheck = (phoneNumber) => {
    return /^\+\d{3}\d{10,}$/.test(phoneNumber);
  };

  // Helper function to validate fields for step 2
  const validateStep2Fields = () => {
    if (accountType === 'corporate') {
      return email && password;
    } else {
      return password && phoneCheck(phoneNumber);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFB]">
      <img src={logo} alt="ComX Logo" className="mx-auto mb-4" />

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
          <p>{response.data.message || "Operation successful"}</p>
          <MdOutlineClose 
            className='cursor-pointer' 
            onClick={() => setResponse({ state: null, data: null })} 
          />
        </div>
      )}


      {accountType === 'corporate'? 

        <div className="bg-white p-10 rounded-lg shadow-sm max-w-lg w-full h-[570px]">
          {
            step<4?
            <>
              <h2 className="text-3xl font-medium text-center">{step===3? 'Account details' : 'Register new account'}</h2>
              <p className="text-center text-gray-500 mb-6 mt-3 text-sm">Sign up for an account and start trading today</p>
            </> : ''
          }
          
          {step === 1 && (
            <div className="mt-10">
              <label className="block text-gray-700 mb-2 text-sm font-semibold">Select select the category that best describes you</label>
              <div className="flex gap-4 mb-4">
                <button className={`${accountType==='individual'? 'bg-black border-black text-white' : 'text-black bg-white border-[#E8ECEF]'} border  py-2 px-10 rounded-xs text-sm cursor-pointer`} onClick={()=> setAccountType('individual')}>Individual</button>
                <button className={`${accountType==='corporate'? 'bg-black border-black text-white' : 'text-black bg-white border-[#E8ECEF]'} border  py-2 px-10 rounded-xs text-sm cursor-pointer`} onClick={()=> setAccountType('corporate')}>Corporate</button>
              </div>
              <label className="block text-gray-700 mb-2 text-sm font-medium mt-5">Company Name</label>
              <input type="text" placeholder="Enter company name" onChange={(e)=> setCompanyName(e.target.value)} className={`w-full p-3 border ${error && !companyName? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm rounded`} />
              <p className={`${error && !companyName? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>This field is required.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Type of Business</label>
                  <select onChange={(e)=>setBusinessType(e.target.value)} className={`p-3 border ${error && !businessType? 'border-[#D71E0E]': 'border-[#E8ECEF]'} rounded text-sm w-full text-[#98A9BC]`}>
                    <option value='Select Type of Business'>Select Type of Business</option>
                    <option value='Trading Firm'>Trading Firm</option>
                    <option value='Information and technology'>Information and technology</option>
                    <option value='Stock Managers'>Stock Managers</option>
                  </select>
                  <p className={`${error && !businessType? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>This field is required.</p>
                </div>
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Date of Incorporation</label>
                  <input type="date" onChange={(e)=> setDateOfIncorporation(e.target.value)} className={`p-3 text-sm border ${error && !dateOfIncorporation? 'border-[#D71E0E]': 'border-[#E8ECEF]'} text-[#98A9BC] rounded w-full`} />
                  <p className={`${error && !dateOfIncorporation? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>This field is required.</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-gray-700 mb-2">Company Email</label>
              <input type="email" onChange={(e)=> setEmail(e.target.value)} placeholder="Enter company email" className={`w-full p-3 border rounded ${error && !email? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm`} />
              <p className={`${error && !email? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Email field is required.</p>

              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" className={`w-full p-3 border rounded ${error && !password? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm`} />
              <p className={`${error && !password? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Password field is required.</p>

              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input type="password" placeholder="Confirm password" className="w-full p-3 border rounded mb-4 border-[#E8ECEF] text-sm" />
            </div>
          )}

          {step === 3 && (
            <div className="mt-8">
              <label className="block text-gray-700 mb-2 text-sm font-semibold">Enter the 4-digit code that was sent to {email}</label>
              <input type="text" onChange={(e)=> setOtp(e.target.value)} placeholder="Enter code" className={`w-full p-3 border ${error && !otp? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-3'} text-sm rounded mt-3`} />
              <p className={`${error && !otp? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Input the OTP code sent to {email}.</p>

              <p onClick={resendOTP} className="text-[#98A9BCCC] text-xs mb-1.5 cursor-pointer">Resend Code</p>
              <p className="text-[#98A9BCCC] text-xs mb-1.5 cursor-pointer">Verify via Phone Call</p>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center gap-5">
              <img src={avatar} alt="success" />
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-medium text-center">Registration Complete</h1>
                <p className="text-center text-gray-500 mb-6 mt-3 text-sm px-10">Dear [fName]. Your registration is now complete.
                You  may proceed to your dashboard and start trading commodities.</p>
              </div>
            </div>
          )}
          
          <div>
            {
              step===1?
              <div className="flex justify-center mt-3">
                <button onClick={() => step === 1 && companyName && businessType && dateOfIncorporation ? setStep(step + 1) && setError(false) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                  NEXT STEP
                </button>
              </div>

              :step===2?
              <div className="flex justify-center mt-3">
                <button onClick={(e) => step === 2 && email && password ? handleSubmit(e) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                  NEXT STEP
                </button>
              </div>

              :step===3? 
              <div className="flex justify-between mt-45 w-full">
                <button onClick={() => setStep(step === 3 ? step - 1 : step)} className="w-fit bg-white text-[#252631] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm">
                  BACK
                </button> 
                <button onClick={(e) => step < 4 && otp ? verifyOTP(e) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm">
                  FINISH
                </button> 
              </div>
              :
              <div className="flex justify-center -m-3">
                <button onClick={() => setStep(step < 5 ? step + 1 : step)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                  GO TO DASHBOARD
                </button>
              </div>
            }
            
          </div>
        </div>
        
        :

        <div className="bg-white p-10 rounded-lg shadow-sm max-w-lg w-full h-[570px]">
          {
            step<4?
            <>
              <h2 className="text-3xl font-medium text-center">{step===3? 'Account details' : 'Register new account'}</h2>
              <p className="text-center text-gray-500 mb-6 mt-3 text-sm">Sign up for an account and start trading today</p>
            </> : ''
          }
          
          {step === 1 && (accountType === 'individual') && (
            <div className="mt-10">
              <label className="block text-gray-700 mb-2 text-sm font-semibold">Select select the category that best describes you</label>
              <div className="flex gap-4 mb-4">
                <button className={`${accountType==='individual'? 'bg-black border-black text-white' : 'text-black bg-white border-[#E8ECEF]'} border  py-2 px-10 rounded-xs text-sm cursor-pointer`} onClick={()=> setAccountType('individual')}>Individual</button>
                <button className={`${accountType==='corporate'? 'bg-black border-black text-white' : 'text-black bg-white border-[#E8ECEF]'} border  py-2 px-10 rounded-xs text-sm cursor-pointer`} onClick={()=> setAccountType('corporate')}>Corporate</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Your First Name</label>
                  <input type="text" onChange={(e)=> setFirstName(e.target.value)} className={`p-3 text-sm border ${error && !firstName? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm text-[#98A9BC] rounded w-full`} placeholder='Enter your First Name' />
                  <p className={`${error && !firstName? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>This field is required.</p>
                </div>
                <div className="mt-2">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Your Last Name</label>
                  <input type="text" onChange={(e)=> setLastName(e.target.value)} className={`p-3 text-sm border ${error && !lastName? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm text-[#98A9BC] rounded w-full`} placeholder='Enter your Last Name' />
                  <p className={`${error && !lastName? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Last Name is required.</p>
                </div>
              </div>
              <label className="block text-gray-700 mb-2 text-sm font-medium mt-5">Your Email</label>
              <input type="mail" onChange={(e)=> setEmail(e.target.value) } placeholder="Enter your Email" className={`p-3 text-sm border ${error && !email? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4.5'} text-sm text-[#98A9BC] rounded w-full`} />
              <p className={`${error && !email? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Email is required.</p>
            </div>
          )}

          {step === 2 && (accountType === 'individual') && (
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" className={`w-full p-3 border rounded ${error && !password? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-4'} text-sm`} />
              <p className={`${error && !password? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Password is required.</p>

              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input type="password" placeholder="Confirm password" className="w-full p-3 border rounded mb-4 border-[#E8ECEF] text-sm" />
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <PhoneInput
                defaultCountry="ng"
                value={phone}
                style={{width: '600px !important'}}
                onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
              <p className={`${error && !phoneCheck(phoneNumber) ? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>
                Invalid phone number. It must have at least 10 more digits.
              </p>
            {/* <input type="password" placeholder="Enter your phone number" className="w-full p-3 border rounded mb-4 border-[#E8ECEF] text-sm" /> */}
            </div>
          )}

          {step === 3 && (accountType === 'individual') && (
            <div className="mt-8">
              <label className="block text-gray-700 mb-2 text-sm font-semibold">Enter the 4-digit code that was sent to {phoneNumber} and {email}</label>
              <input type="text" onChange={(e)=> setOtp(e.target.value)} placeholder="Enter code" className={`w-full p-3 border ${error && !otp? 'border-[#D71E0E] mb-0': 'border-[#E8ECEF] mb-3'} text-sm rounded mt-3`} />
              <p className={`${error && !otp? 'block' : 'hidden'} text-xs mb-4.5 text-[#D71E0E]`}>Input the OTP code sent to {email}.</p>

              <p onClick={(e) => resendOTP(e)} className="text-[#98A9BCCC] text-xs mb-1.5 cursor-pointer text-center">Resend Code</p>
            </div>
          )}

          {step === 4 && (accountType === 'individual') && (
            <div className="flex flex-col items-center gap-5">
              <img src={avatar} alt="success" />
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-medium text-center">Registration Complete</h1>
                <p className="text-center text-gray-500 mb-6 mt-3 text-sm px-10">Dear [fName]. Your registration is now complete.
                You  may proceed to your dashboard and start trading commodities.</p>
              </div>
            </div>
          )}
          
          <div>
            {
              step===1?
                <div className="flex justify-center mt-3">
                  <button onClick={() => step ===1 && firstName && lastName && email ? setStep(step + 1) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                    NEXT STEP
                  </button>
                </div>

                :step===2 && accountType==='individual'?
                <div className="flex justify-center -m-3">
                  <button onClick={(e) => step === 2 && password && phoneCheck(phoneNumber) ?  handleSubmit(e)  : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                    VERIFY ACCOUNT
                  </button>
                </div>

                :step===3? 
                <div className="flex justify-between mt-45 w-full">
                  <button onClick={() => setStep(step === 3 ? step - 1 : step)} className="w-fit bg-white text-[#252631] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm">
                    BACK
                  </button> 
                  <button onClick={(e) => step < 4 && otp ? verifyOTP(e) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-0 rounded mt-10 cursor-pointer text-sm">
                    FINISH
                  </button> 
                </div>
              
                :
                <div className="flex justify-center -m-3">
                  <Link to='/login'>
                    <button onClick={() => step ===4 ? setStep(step + 1) : setError(true)} className="w-fit bg-white text-[#D71E0E] font-medium py-2 px-6 rounded mt-10 cursor-pointer text-sm">
                      GO TO DASHBOARD
                    </button>
                  </Link>
                  
                </div>
            }
            
          </div>
        </div>

      }
        

      <p className="mt-16">{step}/4</p>
      <div className="flex items-center justify-center mt-3">
        <div className="h-2 w-2 bg-[#D71E0E] rounded-full" />

        <div className="h-1 w-28 bg-[#D71E0E] -m-0.5" />
        <div className={`h-2 w-2 ${step>1? "bg-[#D71E0E]" : "bg-gray-300"}  rounded-full z-10`} />

        <div className={`h-1 w-28 -m-0.5 ${step > 1 ? "bg-[#D71E0E]" : "bg-gray-300"}`} />
        <div className={`h-2 w-2 z-10  ${step > 2 ? "bg-[#D71E0E]" : "bg-gray-300"} rounded-full`} />

        <div className={`h-1 w-28 -m-0.5 ${step > 2 ? "bg-[#D71E0E]" : "bg-gray-300"}`} />
        <div className={`h-2 w-2 z-10  ${step > 3 ? "bg-[#D71E0E]" : "bg-gray-300"} rounded-full`} />
      </div>
      {/* <button className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
        <FaRegCommentDots size={24} />
      </button> */}
    </div>
  );
};

export default CheckIn;
