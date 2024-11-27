import * as paymentService from '../services/payment';

export const payment = async (req, res) => {
    const { amount, paymentMethodId } = req.body;
    try {
        const response = await paymentService.paymentsService({ amount, paymentMethodId });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at payment controller: ' + error
        });
    }
};