import Head from "next/head"
import Link from "next/link"
import React from "react"

const Layout = ({ children, title }) => {
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