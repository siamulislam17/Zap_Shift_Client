import React, { useContext, useEffect, useState } from 'react';
import UseAxiosSecure from '../../Contexts/UseAxiosSecure';
import { AuthContext } from '../../Contexts/AuthContext';

const PaymentHistory = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useContext(AuthContext); //  get the logged-in user
    const [paymentData, setPaymentData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        console.log('Fetching payment history for:', user.email);
        const fetchPayments = async () => {
            try {
                const res = await axiosSecure.get('/payment-history', {
                    headers: {
                        'Authorization': `Bearer ${user?.accessToken}`
                    }
                });
                const filtered = res.data.filter(
                    (payment) => payment.email === user.email
                );
                setPaymentData(filtered);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [axiosSecure, user]);

    if (loading) {
        return (
            <div className="text-center mt-10">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto my-12 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                💳 My Payment History
            </h2>

            {paymentData.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                    🚫 You haven’t made any payments yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="px-4 py-2 border dark:border-gray-700">Email</th>
                                <th className="px-4 py-2 border dark:border-gray-700">Amount (৳)</th>
                                <th className="px-4 py-2 border dark:border-gray-700">Date</th>
                                <th className="px-4 py-2 border dark:border-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.map((payment, index) => (
                                <tr key={index} className="text-center text-gray-800 dark:text-gray-200">
                                    <td className="px-4 py-2 border dark:border-gray-700">{payment.email}</td>
                                    <td className="px-4 py-2 border dark:border-gray-700">
                                        {(payment.amount / 100).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 border dark:border-gray-700">
                                        {new Date(payment.date).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 border dark:border-gray-700 text-green-600 dark:text-green-400 font-semibold">
                                        {payment.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
