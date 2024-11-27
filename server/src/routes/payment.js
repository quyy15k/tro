import express from 'express'
import * as paymentController from '../controllers/payment'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

router.use(verifyToken)
router.post('/card', paymentController.payment)

export default router