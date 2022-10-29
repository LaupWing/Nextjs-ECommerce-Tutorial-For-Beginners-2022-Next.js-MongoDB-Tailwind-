import { useRouter } from "next/router"
import React from 'react'
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import { Store } from "../utils/Store"

const PaymentPage = () => {
   const [selectedPaymentMethod, setSelectPaymentMethod] = useState("paypal")
   const router = useRouter()

   const { state, dispatch } = useContext(Store)
   const { cart } = state
   const { shippingAddress, paymentMethod } = cart

   const submitHandler = (e) => {
      e.preventDefault()
      if(!selectedPaymentMethod){
         return toast.error("Payment method is required")
      }
      dispatch({
         type: "SAVE_PAYMENT_METHOD",
         payload: selectedPaymentMethod
      })
   }

   useEffect(()=>{
      if(!shippingAddress.address){
         return router.push("/shipping")
      }
      selectedPaymentMethod(paymentMethod || "")
   },[paymentMethod, router.asPath, shippingAddress.address])

   return (
      <Layout title={"Payment Method"}>
         <CheckoutWizard activeStep={2} />
         <form
            className="mx-auto max-w-screen-md"
            onSubmit={submitHandler}
         >
            <h1 className="mb-4 text-xl">Payment Method</h1>
            {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => {
               <div
                  className="mb-4"
                  key={payment}
               >
                  <input
                     type="radio"
                     id={payment}
                     checked={selectedPaymentMethod === payment}
                     onChange={() => setSelectPaymentMethod(payment)}
                     className="p-2 outline-none focus:ring-0"
                  />
                  <label
                     htmlFor={payment}
                     className="p-2"
                  >
                     {payment}
                  </label>
               </div>
            })}
            <div className="mb-4 flex justify-between">
               <button
                  className="default-button"
                  type="button"
                  onClick={() => router.push("/shipping")}
               >
                  back
               </button>
               <button
                  className="primary-button"

               >
                  next
               </button>
            </div>
         </form>
      </Layout>
   )
}

export default PaymentPage