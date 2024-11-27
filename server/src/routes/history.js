import express from 'express'
import * as historyController from '../controllers/history'
import verifyToken from '../middlewares/verifyToken'


const router = express.Router()
router.use(verifyToken)
router.post('/create-history', historyController.createNewHistoy)
router.get('/list-histories', historyController.getHistories)
router.post('/get-detail/:historyId', historyController.getHistoryDetail)



export default router