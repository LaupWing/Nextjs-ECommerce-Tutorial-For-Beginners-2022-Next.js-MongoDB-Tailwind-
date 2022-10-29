import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { ToastContainer } from "react-toastify"
import { Store } from "../utils/Store"
import "react-toastify/dist/ReactToastify.css"
import { Menu } from "@headlessui/react"
import DropdownLink from "./DropdownLink"
import Cookies from "js-cookie"

const Layout = ({ children, title }) => {
   const { status, data: session } = useSession()
   const { state, dispatch } = useContext(Store)
   const { cart } = state
   const [cartItemsCount, setCartItemsCount] = useState(0)

   const logoutClickHandler = async ()=>{
      Cookies.remove("cart")
      signOut({
         callbackUrl: "/login"
      })
      dispatch({
         type: "CART_RESET"
      })
   }

   useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
   }, [cart.cartItems])

   return (
      <>
         <Head>
            <title>{title ? title + " - Amazona" : "Amazona"}</title>
            <meta name="description" content="Ecommerce website" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <ToastContainer position="bottom-center" limit={1} />
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
                     {status === "loading" ? "loading" : (
                        session?.user ?
                           <Menu as={"div"} className="relative inline-block">
                              <Menu.Button className="text-blue-600">
                                 {session.user.naem}
                              </Menu.Button>
                              <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-white">
                                 <Menu.Item>
                                    <DropdownLink 
                                       className="dropdown-link" 
                                       href="/profile"
                                    >
                                       Profile
                                    </DropdownLink>
                                 </Menu.Item>
                                 <Menu.Item>
                                    <DropdownLink 
                                       className="dropdown-link" 
                                       href="/order-history"
                                    >
                                       Order History
                                    </DropdownLink>
                                 </Menu.Item>
                                 <Menu.Item>
                                    <a 
                                       href="#"
                                       className="dropdown-link"
                                       onClick={logoutClickHandler}
                                    >
                                       Logout
                                    </a>
                                 </Menu.Item>
                              </Menu.Items>
                           </Menu> :
                           <Link className="p-2" href={"/login"}>Login</Link>
                     )}
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