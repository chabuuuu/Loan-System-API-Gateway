import express from 'express';
import { EmployeeController } from '../../controller/loan-service/employee.controller';
const employeeRouter = express.Router();
const employeeController = new EmployeeController();
employeeRouter.get('/', employeeController.get)
employeeRouter.post('/', employeeController.create)
export default employeeRouter;