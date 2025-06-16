"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import logo from '../../assets/logo.png'

// Validation Schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  zipCode: Yup.string()
    .matches(/^[0-9]{5}(-[0-9]{4})?$/, "Invalid zip code")
    .required("Zip code is required"),
  address: Yup.string()
    .min(5, "Address is too short")
    .required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions")
});

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.mobile,
        address: values.address,
        zipCode: values.zipCode
      }, {
        withCredentials: true
      })

      if (response.data.success) {
        toast.success("Account created successfully!")
        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Toaster position="top-center" />
      <div className="w-full max-w-[480px] bg-[#ffffff] rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className='w-[200px] mx-auto relative'>
            <Image 
              src={logo} 
              alt='Logo' 
              className="w-full h-auto"
              priority
            />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#000000] mt-4">Create an account</h2>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            zipCode: "",
            address: "",
            password: "",
            confirmPassword: "",
            terms: false
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5 sm:space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2.5">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#000000]">
                    First name
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.firstName && touched.firstName ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#000000]">
                    Last name
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.lastName && touched.lastName ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Mobile Number and Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2.5">
                  <label htmlFor="mobile" className="block text-sm font-medium text-[#000000]">
                    Mobile Number
                  </label>
                  <Field
                    id="mobile"
                    name="mobile"
                    type="tel"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.mobile && touched.mobile ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-[#000000]">
                    Zip code
                  </label>
                  <Field
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      errors.zipCode && touched.zipCode ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2.5">
                <label htmlFor="address" className="block text-sm font-medium text-[#000000]">
                  Address
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.address && touched.address ? "border-red-500" : "border-[#818181]"
                  } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#000000]">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.email && touched.email ? "border-red-500" : "border-[#818181]"
                  } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="space-y-2.5">
                <label htmlFor="password" className="block text-sm font-medium text-[#000000]">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${
                      errors.password && touched.password ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#818181] hover:text-[#5c5c5c] focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Re-enter Password */}
              <div className="space-y-2.5">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#000000]">
                  Re-enter Password
                </label>
                <div className="relative">
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${
                      errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-[#818181]"
                    } bg-[#ffffff] text-[#5c5c5c] focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#818181] hover:text-[#5c5c5c] focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 pt-3">
                <Field
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className={`mt-1 h-4 w-4 rounded border-[#818181] text-[#822be2] focus:ring-[#822be2] focus:ring-2 ${
                    errors.terms && touched.terms ? "border-red-500" : ""
                  }`}
                />
                <label htmlFor="terms" className="text-sm text-[#000000] leading-relaxed">
                  I agree to our{" "}
                  <Link href="#" className="text-[#274690] underline hover:no-underline">
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-[#274690] underline hover:no-underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#822be2] hover:bg-[#822be2]/90 text-white rounded-lg py-3.5 mt-8 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#822be2] focus:ring-offset-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Creating account..." : "Create an account"}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-[#5c5c5c] mt-6">
                Already have an Account?{" "}
                <Link href="/signin" className="text-[#274690] underline hover:no-underline">
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
