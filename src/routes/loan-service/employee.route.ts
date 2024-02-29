import express from 'express';

import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
import { EmployeeController } from '@/controller/loan-service/employee.controller';
import { Subject } from '@/auth/subject';
import { checkRole } from '@/auth/check-role';
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice';
const employeeRouter = express.Router();
const employeeController = new EmployeeController();
// employeeRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Employee) ,employeeController.get.bind(employeeController))
employeeRouter.get('/', jwtAuthenticate, setJwtMicroservice ,employeeController.get.bind(employeeController))

employeeRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Employee), setJwtMicroservice, employeeController.create.bind(employeeController))
export default employeeRouter;