const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const paymentsService = ({ amount }) =>
    new Promise(async (resolve, reject) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'vnd',
                payment_method_types: ['card'],
                description: 'Thanh toán tiền thuê nhà',
            });
            resolve(paymentIntent);
        } catch (error) {
            console.log("err", error);
            reject(error);
        }
    });
