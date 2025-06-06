"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../assets/logo.png"; 



export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    zipCode: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
    ...formData,
    [name]: updatedValue,
  });

  if (name === "agree" && checked) {
    setAgreeError("");
  }

  if (name === "password" || name === "confirmPassword") {
    setPasswordError("");
  }


    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const [passwordError, setPasswordError] = useState("");
  const [agreeError, setAgreeError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Password does not match");
      return;
    }
    if (!formData.agree) {
      setAgreeError("You must agree to the terms and conditions");
      return;
    }


    try {
      const { confirmPassword, agree, ...submitData } = formData;
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      const result = await res.json();
      if (res.ok) {
        router.push("/login");
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  

  return (
    <div className="background min-h-screen flex justify-center items-center drop-shadow-lg">
      <form onSubmit={handleSubmit} className="bg-white w-[580px] h-[830px] rounded-[12px] pt-[15px] pb-[50px] flex flex-col items-center space-y-[15px]">
        <div className='w-[200px] relative text-center'>
            <Image src={logo} alt='Logo' />
        </div>
        
        <h2 className="font-extra-large mb-4 font-semibold">Create an Account</h2>

        <div className='w-full flex flex-col gap-3 pl-[45px] pr-[45px]'>


        <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium mb-1">First name</label>
            <input type="text" name="firstName" id="firstName" placeholder="Saru" value={formData.firstName} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2]" required />
        </div>
        <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium mb-1">Last name</label>
            <input type="text" name="lastName" id="lastName" placeholder="Satalan" value={formData.lastName} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2]" required />
        </div>
        </div>


        <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
            <label htmlFor="mobile" className="text-sm font-medium mb-1">Mobile Number</label>
            <input type="text" name="mobile" id="mobile" placeholder="0771191166" value={formData.mobile} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2]" required />
        </div>
        <div className="flex flex-col">
            <label htmlFor="zipCode" className="text-sm font-medium mb-1">Zip code</label>
            <input type="text" name="zipCode" id="zipCode" placeholder="50000" value={formData.zipCode} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2]" required />
        </div>
        </div>

        <div className="flex flex-col mt-4">
            <label htmlFor="address" className="text-sm font-medium mb-1">Address</label>
            <input type="text" name="address" id="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2] w-full" required />
        </div>

        <div className="flex flex-col mt-4">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" id="email" placeholder="demo@gmail.com" value={formData.email} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2] w-full" required />
        </div>

        <div className="flex flex-col mt-4">
            <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2] w-full" required />
        </div>
 

        <div className="flex flex-col mt-4">
            <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">Re-enter Password</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`border p-2 rounded-[5px]  border-[#818181] focus:outline-none focus:border-[#822BE2] w-full ${passwordError ? 'border-red-500' : ''}`}
                required
            />
            {passwordError && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
            <span className="mr-0">❗</span> {passwordError}
            </p>
         )}
        </div>


        <div className="flex flex-col mt-4">
            <label className="flex items-center">
            <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
            />
            <span className="text-sm">
                I agree to our <a href="#" className="text-blue-600">Terms of use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
            </span>
            </label>
            {agreeError && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
            <span className="mr-0">❗</span> {agreeError}
            </p>
            )}
        </div>




        <button type="submit" className="w-full h-[50px] rounded-[8px] btn-color text-white font-medium">Create an account</button>

        <p className="text-center text-sm mt-4">Already have an Account? <a href="/login" className="text-blue-600">Sign in</a></p>
        </div>
      </form>
    </div>
  );
}

