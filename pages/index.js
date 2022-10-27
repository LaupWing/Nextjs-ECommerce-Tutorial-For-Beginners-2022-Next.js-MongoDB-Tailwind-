import Layout from "../components/Layout"
import ProductItem from "../components/ProductItem"
import data from "../utils/data"

export default function Home() {
   return (
      <Layout title={"Home Page"}>
         <h1 className="text-3xl font-bold">Next Tailwind Amazona</h1>
         <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map(product => (
               <ProductItem
                  product={product}
                  key={product.slug}
               />
            ))}
         </div>
      </Layout>
   )
}