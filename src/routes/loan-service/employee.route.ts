import express from 'express';
import { EmployeeController } from '../../controller/loan-service/employee.controller';
import { checkRole } from '../../auth/check-role';
import { Subject } from '../../auth/subject';
import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
const employeeRouter = express.Router();
const employeeController = new EmployeeController();
employeeRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Employee) ,employeeController.get)
employeeRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Employee), employeeController.create)
export default employeeRouter;