import Head from "next/head"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Store } from "../utils/Store"

const Layout = ({ children, title }) => {
   const { state } = useContext(Store)
   const { cart } = state
   const [cartItemsCount, setCartItemsCount] = useState(0)

   useEffect(()=>{
      setCartItemsCount(cart.cartItems.reduce((a, c)=> a + c.quantity, 0))
   },[cart.cartItems])

   return (
      <>
         <Head>
            <title>{title ? title + " - Amazona" : "Amazona"}</title>
            <meta name="description" content="Ecommerce website" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className="flex flex-col min-h-screen justify-between">
            <header>
               <nav className="flex h-12 items-center px-4 justify-between shadow-md">
                  <Link className="text-lg font-bold" href={"/"}>
                     amazona
                  </Link>
                  <div>
                     <Link className="p-2" href={"/cart"}>
                        Cart
                        {cartItemsCount > 0 && (
                           <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                              {cartItemsCount}
                           </span>
                        )}
                     </Link>
                     <Link className="p-2" href={"/login"}>
                        Login
                     </Link>
                  </div>
               </nav>
            </header>
            <main className="container m-auto">
               {children}
            </main>
            <footer className="h-10 shadow-inner flex justify-center items-center">
               Copyright 2022 Amazona
            </footer>
         </div>
      </>
   )
}

export default Layout