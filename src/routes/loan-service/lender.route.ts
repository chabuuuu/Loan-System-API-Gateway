// import express from 'express'
// import { LenderController } from '../../controller/loan-service/lender.controller'
// import { checkRole } from '../../auth/check-role'
// import { Subject } from '../../auth/subject'
// import { jwtAuthenticate } from '@/middleware/jwt-authenticate'
// const lenderController = new LenderController()
// const lenderRouter = express.Router()
// lenderRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Lender), lenderController.get)
// lenderRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Lender), lenderController.create)
// export default lenderRouter;