import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const CheckoutForm = ({price}) => {
    const {user}=useAuth();
    const stripe=useStripe();
    const [cardError, setCardError] = useState();
    const elements=useElements();

    const [axiosSecure]=useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', {price})
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
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
        <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      {cardError && (
        <p className='text-sm text-red-600 mt-2 ml-8'>
          {cardError}
        </p>
      )}
      </>
    );
};

export default CheckoutForm;