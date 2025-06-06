"use client";

import { useState } from "react";

import Image from "next/image";
import logo from "../../assets/logo.png"; 



export default function OTPverification() {
  
    const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Verifying OTP:", enteredOtp);

  };


//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); 


//   const handleSubmit = async () => {
//   const enteredOtp = otp.join("");
//   setMessage(""); 

//   try {
//     const response = await fetch("/api/verify-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ otp: enteredOtp }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage("✅ OTP Verified Successfully!");
//       setMessageType("success");
//     } else {
//       setMessage("❌ OTP Verification Failed: " + data.message);
//       setMessageType("error");
//     }
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     setMessage("⚠️ Something went wrong!");
//     setMessageType("error");
//   }
// };



  return (
    <div className="background min-h-screen flex justify-center items-center drop-shadow-lg">
      <form  className="bg-white w-[540px] h-[445px] rounded-[12px] pt-[15px] pb-[50px] flex flex-col items-center space-y-[15px]">
        <div className='w-[200px] relative text-center'>
            <Image src={logo} alt='Logo' />
        </div>
        <h2 className="font-extra-large mb-10 font-bold">OTP verification</h2>

      

        <label className="justify-center  text-sm font-medium mb-5">Enter OTP</label>
        
    <div className="h-15 flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-10 h-10 text-center text-lg border border-purple-400 rounded-md border-[#818181] focus:outline-none focus:border-[#822BE2] "
            />
          ))}
    </div>

    {/* {message && (
        <p className={`text-sm mt-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
        </p>
    )} */}
   

    <div className=" flex flex-col gap-4 items-center">
        <button
          onClick={handleSubmit}
          className="w-[226px] h-[43px] rounded-[8px] btn-color text-white font-medium"
        >
          Verify OTP
        </button>

        <button
          onClick={() => window.history.back()}
          className="w-[226px] h-[43px] border border-purple-500 text-purple-600 py-2 rounded-md font-medium hover:bg-purple-50 transition"
        >
          Back
        </button>
    </div>


      </form>
    </div>
  );
}

