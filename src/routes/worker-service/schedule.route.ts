// import express from 'express';
// import { ScheduleController } from '../../controller/worker-service/schedule.controller';
// import { checkRole } from '../../auth/check-role';
// import { Subject } from '../../auth/subject';
// import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
// const scheduleRouter = express.Router();
// const scheduleController = new ScheduleController();
// scheduleRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Schedule) , scheduleController.get)
// scheduleRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Schedule), scheduleController.create)
// scheduleRouter.delete('/:id', jwtAuthenticate, checkRole('delete', Subject.Schedule), scheduleController.delete)
// export default scheduleRouter