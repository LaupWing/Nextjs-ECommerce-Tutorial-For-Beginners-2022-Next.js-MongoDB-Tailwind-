import { createContext, useReducer } from "react"
import Cookies from "js-cookie"

export const Store = createContext()

const initialState = {
   cart: 
      Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : 
      {
         cartItems: []
      }
}

function reducer(state, action){
   switch(action.type){
      case "CART_ADD_ITEM": {
         const newItem = action.payload
         const existItem = state. cart.cartItems.find(item=>item.slug === newItem.slug)
         

         if( existItem && (existItem.quantity + 1 > existItem.countInStock)){
            alert("Out of stock")
            return state
         }
         const cartItems = existItem ? 
            state.cart.cartItems.map(item=> item.name === existItem.name ? {
               ...newItem,
               quantity: item.quantity + 1
            } : item) : 
            [...state.cart.cartItems, newItem]
         
         Cookies.set(JSON.stringify({
            ...state.cart,
            cartItems
         }))
         return {
            ...state,
            cart: {
               ...state.cart,
               cartItems
            }
         }
      }
      case "CART_REMOVE_ITEM":{
         const cartItems = state.cart.cartItems.filter(
            item => item.slug !== action.payload.slug
         )
         return {
            ...state,
            cart: {
               ...state.cart,
               cartItems
            }
         }
      }
      default:
         return state
   }
}

export function StoreProvider({children}){
   const [state, dispatch] = useReducer(reducer, initialState)
   const value = {state, dispatch}

   return <Store.Provider value={value}>{children}</Store.Provider>
}