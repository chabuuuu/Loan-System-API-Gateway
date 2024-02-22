import { log } from "winston";
import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const WORKER_SERVICE = config.get('WORKER_SERVICE');

export class ScheduleController extends BaseController {
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const schedules = await axios.get(`${WORKER_SERVICE}/schedule`);
            return res.json(schedules.data);
        } catch (error: any) {   
            if (error.code === "ECONNREFUSED"){
                error.message = "Worker Service Not Available"
            }         
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
    async create(req: any, res: any, next: any): Promise<void> {
        try {
            const schedule = await axios.post(`${WORKER_SERVICE}/schedule`, req.body);
            return res.json(schedule.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                error.message = "Worker Service Not Available"
            }     
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
    async delete(req: any, res: any, next: any): Promise<void> {
        try {
            const schedule = await axios.delete(`${WORKER_SERVICE}/schedule/${req.params.id}`);
            return schedule.data;
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                error.message = "Worker Service Not Available"
            }     
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}