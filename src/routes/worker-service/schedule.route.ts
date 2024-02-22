import express from 'express';
import { ScheduleController } from '../../controller/worker-service/schedule.controller';
const scheduleRouter = express.Router();
const scheduleController = new ScheduleController();
scheduleRouter.get('/', scheduleController.get)
scheduleRouter.post('/', scheduleController.create)
scheduleRouter.delete('/:id', scheduleController.delete)
export default scheduleRouter