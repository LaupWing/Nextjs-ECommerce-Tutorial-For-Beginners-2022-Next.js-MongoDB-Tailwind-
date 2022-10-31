import { useRouter } from "next/router"
import { useContext } from "react"
import { toast } from "react-toastify"
import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import Product from "../models/Product"
import data from "../utils/data"
import db, { convertDocToObj } from "../utils/db"
import { Store } from "../utils/Store"

export default function Home({ products }) {
   const {state, dispatch} = useContext(Store)
   const router = useRouter()

   const addToCartHandler = async (product) => {
      dispatch({
         type: "CART_ADD_ITEM",
         payload: {
            ...product,
            quantity: 1
         }
      })
      router.push("/cart")
      toast.success("Product added to the cart")
   }

   return (
      <Layout title={"Home Page"}>
         <h1 className="text-3xl font-bold">Next Tailwind Amazona</h1>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
               <ProductItem
                  product={product}
                  key={product.slug}
                  addToCartHandler={addToCartHandler}
               />
            ))}
         </div>
      </Layout>
   )
}

export async function getServerSideProps() {
   await db.connect()
   const products = await Product.find().lean()
   return {
      props: {
         products: products.map(convertDocToObj)
      }
   }
}