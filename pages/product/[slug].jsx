import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from 'react'
import Layout from "../../components/Layout"
import data from "../../utils/data"

const ProductPage = () => {
   const { query } = useRouter()
   const { slug } = query
   const product = data.products.find(x => x.slug === slug)

   if (!product) {
      return <div>Product Not Found</div>
   }
   return (
      <Layout title={product.name}>
         <div className="py-2">
            <Link href={"/"}>back to products</Link>
         </div>
         <div className="grid md:grid-cols-4 md:gap-3">
            <div className="md:col-span-2">
               <Image
                  src={product.image}
                  alt={product.name}
                  width={640}
                  height={540}
                  layout="responive"
               />
            </div>
            <div>
               <ul>
                  <li></li>
               </ul>
            </div>
         </div>
      </Layout>
   )
}

export default ProductPage