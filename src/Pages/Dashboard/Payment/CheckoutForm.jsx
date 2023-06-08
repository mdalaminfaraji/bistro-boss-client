import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import './checkoutForm.css';

const CheckoutForm = ({price,carts}) => {
    // console.log(carts);
    const {user}=useAuth();
    const stripe=useStripe();
    const [cardError, setCardError] = useState();
    const elements=useElements();

    const [axiosSecure]=useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(()=>{
        console.log(price);
      if(price>0){
        axiosSecure.post('/create-payment-intent', {price})
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
      }
    },[price, axiosSecure])


        const handleSubmit=async(event)=>{
        event.preventDefault();

        if(!stripe ||!elements){
            return;
        }

        const card=elements.getElement(CardElement);
        if(card==null){
            return;
        }
       const {error, paymentMethod}=await stripe.createPaymentMethod({
        type:'card',
        card,
       });

       if (error) {
        console.log('[error]', error);
        setCardError(error.message);
      } else {
        setCardError(' ');
        console.log('[PaymentMethod]', paymentMethod);
      }

           setProcessing(true);
      const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName ||'anonymous',
              email: user?.email ||'unknown'
            },
          },
        },
      );

      if(confirmError) {
        console.log('[confirmError]', confirmError);
        setCardError(confirmError.message);
      }
      console.log(paymentIntent);
      setProcessing(false);

      if(paymentIntent.status==='succeeded'){
        setTransactionId(paymentIntent.id);
        // save payment information to the server
        const payment={
            email:user?.email,
            transactionId:paymentIntent.id,
            price:price,
            date: new Date(),
            status:'service pending',

            quantity:carts.length,
            cartItems:carts.map(item=>item._id),
            menuItems:carts.map(item=>item.menuItemId),
            itemsNames:carts.map(item=>item.name)
        }
        axiosSecure.post('/payments',payment)
        .then(res=>{
            console.log(res.data);
            if(res.data.insertResult.insertedId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'payment successfully done',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
      }
    }
    return (
      <>
        <form className='w-2/3 m-8' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
    
            },
          }}
        />
        <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret||processing}>
          Pay
        </button>
      </form>
      {cardError && (
        <p className='text-sm text-red-600 mt-2 ml-8'>
          {cardError}
        </p>
     
      )}
         {transactionId&&<p className='text-green-500'> Transaction complete with TransactionId: {transactionId}</p>}
      </>
    );
};

export default CheckoutForm;