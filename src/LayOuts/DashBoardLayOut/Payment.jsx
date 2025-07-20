import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);


const Payment = () => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>    
    );
};

export default Payment;