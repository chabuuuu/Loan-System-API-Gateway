import express from 'express'
import { jwtAuthenticate } from '@/middleware/jwt-authenticate'
import { Subject } from '@/auth/subject'
import { LenderController } from '@/controller/loan-service/lender.controller'
import { checkRole } from '@/auth/check-role'
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice'
const lenderController = new LenderController()
const lenderRouter = express.Router()
lenderRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Lender), setJwtMicroservice, lenderController.get.bind(lenderController))
lenderRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Lender), setJwtMicroservice, lenderController.create.bind(lenderController))
export default lenderRouter;