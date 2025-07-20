import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const {user} = use(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [ error, setError ] = useState('');
    const {id} = useParams();   // Extract any parameters from the URL if needed
     const axiosSecure = UseAxiosSecure(); // Initialize axios with secure headers
    const navigate = useNavigate(); // Use navigate to redirect after payment
    // Fetch parcel data using react-query
     const { isPending, data: parcelData = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const response = await axiosSecure.get(`/parcels/${id}`);
            return response.data;
        },

    });

    // console.log(parcelData);


    const amount = parcelData?.cost || 0; // Get the price from the fetched data, default to 0 if not available
    const amountInCents = amount * 100; // Convert to cents for Stripe

    
    
    if (isPending) {
        return <div className="text-center text-gray-500"><span className="loading loading-bars  mx-auto h-screen loading-xl"></span></div>;
    }

    // Define the styles for the CardElement
    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
            color: '#32325d',
            fontFamily: 'inherit',
            fontSize: '16px',
            '::placeholder': {
                color: '#a0aec0',
            },
            },
            invalid: {
            color: '#e53e3e',
            },
        },
        };

   const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        try {
            const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (methodError) {
                setError(methodError.message);
                return;
            }

            setError('');

            // Step 1: Create PaymentIntent
            const { data: { clientSecret } } = await axiosSecure.post('/create-connect-account', {
                amount: amountInCents,
            });

            // Step 2: Confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email,
                    },
                },
            });

            if (confirmError) {
                setError(confirmError.message);
                return;
            }

            // Step 3: Save payment history
            if (paymentIntent.status === 'succeeded') {
                const saveRes = await axiosSecure.post('/payment-history', {
                    parcelId: id,
                    paymentMethodId: paymentMethod.id,
                    amount: amountInCents,
                    email: user?.email,
                });

                if (saveRes.data.success) {
                    Swal.fire({
                        title: 'Payment Successful',
                        text: 'Your payment was successful and stored history.',
                        icon: 'success',
                    });

                    // Optionally, redirect or update UI after successful payment
                    navigate('/dashboard/my-parcels');
                } else {
                    Swal.fire({
                        title: 'Payment Succeeded',
                        text: 'Your payment was successful but failed to store history.',
                        icon: 'warning',
                    });
                }

            }
        } catch (error) {
            console.error('Payment error:', error);
            setError(error.response?.data?.error || 'Payment failed');
        }
    };


    // If loading, show a loading message
    if (isPending) {
        return <div className="text-center text-gray-500"><span className="loading loading-bars  mx-auto h-screen loading-xl"></span></div>;
    }
   return (
  <div className="max-w-md mx-auto my-20 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg light:border light:border-gray-200">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      💳 {parcelData.payment_status === 'Paid' ? 'Already Paid' : 'Pay for Parcel Pickup'}
    </h2>

    {parcelData.payment_status === 'Paid' ? (
      <div className="text-center text-green-600 font-semibold text-lg">
        ✅ This parcel has already been paid.
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-md px-4 py-3 shadow-sm bg-white focus-within:ring-2 focus-within:ring-green-400 transition">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || parcelData.payment_status === 'Paid'}
          className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-.5304.2107-1.0391.5858-1.4142C12.9609 9.2107 13.4696 9 14 9s1.0391.2107 1.4142.5858C15.7893 9.9609 16 10.4696 16 11m0 4v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1m9 0H7m9 0a2 2 0 012-2h0a2 2 0 012 2v0m-6-5a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          Pay Now ৳{amount}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    )}
  </div>
);
};

export default PaymentForm;