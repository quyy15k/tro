import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { apiUserPayment } from '../services';
import { useNavigate } from 'react-router-dom';
import { apiCreateHistory } from '../services/history';

const StripeModal = ({ loading, setLoading, error, success, setError, setSuccess, handleCloseModal, amount, postId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { data } = await apiUserPayment({ amount: Number(amount) });
            const clientSecret = data.client_secret;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Test User',
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess(true);
                const res = await apiCreateHistory({
                    totalAmount: Number(amount),
                    postId: postId
                })
                if (res.data === "OK")
                    history('/lich-su-thanh-toan');
            }
        } catch (err) {
            console.error("Error:", err);
            setError('Đã có lỗi xảy ra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-80" onClick={handleCloseModal}></div>

            <div className="relative bg-white rounded-lg shadow-lg max-w-[600px] p-6 z-10">
                <span className='text-center my-2 text-xl font-bold flex justify-center'>Thanh toán qua ngân hàng</span>
                <form onSubmit={handleSubmit} autoComplete="Off" className='mt-4'>
                    <CardElement className='w-[400px] p-6 rounded-md border' />
                    <div className='flex items-center justify-end gap-2 mt-4'>
                        <button disabled={loading} type="submit" className='text-blue-500 border border-blue-500 hover:bg-blue-300 hover:text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out'>
                            {loading ? 'Đang thanh toán...' : 'Thanh toán'}
                        </button>
                        <button onClick={handleCloseModal} className='text-red-500 border border-red-500 hover:bg-red-300 hover:text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out'>
                            hủy
                        </button>
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>Payment successful!</div>}
                </form>

            </div>
        </div>
    );
};

export default StripeModal;
