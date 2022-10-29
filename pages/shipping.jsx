import { useRouter } from "next/router"
import React from 'react'
import { useEffect } from "react"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"

const ShippingPage = () => {
   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue
   } = useForm()
   const { dispatch, state } = useContext(Store)
   const { cart: {shippingAddress} } = state
   const router = useRouter()

   const submitHandler = ({ fullName, address, city, postalCode, country }) => {
      dispatch({
         type: "SAVE_SHIPPING_ADDRESS",
         payload:{
            fullName, address, city, postalCode, country
         }
      })  
      router.push("/payment")
   }

   useEffect(()=>{
      setValue("fullName", shippingAddress.fullName)
      setValue("address", shippingAddress.address)
      setValue("city", shippingAddress.city)
      setValue("postalCode", shippingAddress.postalCode)
      setValue("country", shippingAddress.country)
   },[setValue, shippingAddress])

   return (
      <Layout title={"Shipping Address"}>
         <CheckoutWizard activeStep={1} />
         <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
         >
            <h1 className="mb-4 text-xl">Shipping Address</h1>
            <div className="mb-4">
               <label htmlFor="fullName">Full Name</label>
               <input
                  type="text"
                  id="fullName"
                  autoFocus
                  {...register("fullName", {
                     required: "Please enter full name"
                  })}
               />
               {errors.fullName && (
                  <div className="text-red-500">{errors.fullName.message}</div>
               )}
            </div>
            <div className="mb-4">
               <label htmlFor="address">Address</label>
               <input
                  type="text"
                  id="address"
                  autoFocus
                  {...register("address", {
                     required: "Please enter address",
                     minLength: {
                        value: 3,
                        message: "Address is more than 2 chars"
                     }
                  })}
               />
               {errors.address && (
                  <div className="text-red-500">{errors.address.message}</div>
               )}
            </div>
            <div className="mb-4">
               <label htmlFor="city">City</label>
               <input
                  type="text"
                  id="city"
                  autoFocus
                  {...register("city", {
                     required: "Please enter city"
                  })}
               />
               {errors.city && (
                  <div className="text-red-500">{errors.city.message}</div>
               )}
            </div>
            <div className="mb-4">
               <label htmlFor="postalCode">Postal Code</label>
               <input
                  type="text"
                  id="postalCode"
                  autoFocus
                  {...register("postalCode", {
                     required: "Please enter postal code"
                  })}
               />
               {errors.postalCode && (
                  <div className="text-red-500">{errors.postalCode.message}</div>
               )}
            </div>
            <div className="mb-4">
               <label htmlFor="country">Country</label>
               <input
                  type="text"
                  id="country"
                  autoFocus
                  {...register("country", {
                     required: "Please enter country"
                  })}
               />
               {errors.country && (
                  <div className="text-red-500">{errors.country.message}</div>
               )}
            </div>
            <div className="mb-4 flex justify-between">
               <button className="primary-button">Next</button>
            </div>
         </form>
      </Layout>
   )
}

ShippingPage.auth = true
export default ShippingPage