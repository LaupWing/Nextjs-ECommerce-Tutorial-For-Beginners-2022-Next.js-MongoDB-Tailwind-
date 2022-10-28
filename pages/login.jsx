import Link from "next/link"
import React from 'react'
import { useForm } from "react-hook-form"
import Layout from "../components/Layout"

const LoginPage = () => {
   const {
      handleSubmit,
      register,
      formState: { errors }
   } = useForm()

   const submitHandler = ({ }) => {

   }

   return (
      <Layout title={"Login"}>
         <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit()}
         >
            <h1 className="mb-4 text-xl">Login</h1>
            <div className="mb-4">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  className="w-full"
                  id="email"
                  autoFocus
                  {...register("email", { 
                     required: "Please enter email",
                     pattern:{
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                        message: "Please enter valid email"
                     }
                   })}
               />
               {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
            </div>
            <div className="mb-4">
               <label htmlFor="password">Password</label>
               <input type="password" className="w-full" id="password" autoFocus />
            </div>
            <div className="mb-4">
               <button className="primary-button">Login</button>
            </div>
            <div className="mb-4">
               Don&apos;t have an account &nbsp;
               <Link href={"/register"}>
                  Register
               </Link>
            </div>
         </form>
      </Layout>
   )
}

export default LoginPage