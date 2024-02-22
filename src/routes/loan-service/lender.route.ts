import express from 'express'
import { LenderController } from '../../controller/loan-service/lender.controller'
const lenderController = new LenderController()
const lenderRouter = express.Router()
lenderRouter.get('/', lenderController.get)
lenderRouter.post('/', lenderController.create)
export default lenderRouter;