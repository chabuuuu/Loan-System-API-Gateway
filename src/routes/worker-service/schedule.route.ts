import express from 'express';

import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
import { ScheduleController } from '@/controller/worker-service/schedule.controller';
import { checkRole } from '@/auth/check-role';
import { Subject } from '@/auth/subject';
const scheduleRouter = express.Router();
const scheduleController = new ScheduleController();
scheduleRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Schedule) , scheduleController.get.bind(scheduleController))
scheduleRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Schedule), scheduleController.create.bind(scheduleController))
scheduleRouter.delete('/:id', jwtAuthenticate, checkRole('delete', Subject.Schedule), scheduleController.delete.bind(scheduleController))
export default scheduleRouter