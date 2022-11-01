import { useRouter } from "next/router"
import React, { useReducer } from 'react'
import Layout from "../../components/Layout"

function reducer(state, action) {
   switch (action.type) {
      case 'FETCH_REQUEST':
         return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
         return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
         return { ...state, loading: false, error: action.payload };
      case 'PAY_REQUEST':
         return { ...state, loadingPay: true };
      case 'PAY_SUCCESS':
         return { ...state, loadingPay: false, successPay: true };
      case 'PAY_FAIL':
         return { ...state, loadingPay: false, errorPay: action.payload };
      case 'PAY_RESET':
         return { ...state, loadingPay: false, successPay: false, errorPay: '' };

      case 'DELIVER_REQUEST':
         return { ...state, loadingDeliver: true };
      case 'DELIVER_SUCCESS':
         return { ...state, loadingDeliver: false, successDeliver: true };
      case 'DELIVER_FAIL':
         return { ...state, loadingDeliver: false };
      case 'DELIVER_RESET':
         return {
            ...state,
            loadingDeliver: false,
            successDeliver: false,
         };

      default:
         state;
   }
}

const OrderPage = () => {
   const router = useRouter()
   const orderId = router.query.id

   const [
      {
         loading,
         error,
         order,
         successPay,
         loadingPay,
         loadingDeliver,
         successDeliver,
      },
      dispatch,
   ] = useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
   })

   return (
      <Layout title={`Order ${orderId}`}>

      </Layout>
   )
}

OrderPage.auth = true
export default OrderPage