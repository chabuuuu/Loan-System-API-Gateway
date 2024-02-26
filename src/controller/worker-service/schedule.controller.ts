import { log } from "winston";
import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const WORKER_SERVICE = config.get('WORKER_SERVICE');

export class ScheduleController extends BaseController {
    constructor() {
        super(`${WORKER_SERVICE}/schedule`);
    }
    async get(req: any, res: any, next: any): Promise<void> {
        super.get(req, res, next);
    }
    async create(req: any, res: any, next: any): Promise<void> {
        super.create(req, res, next);
    }
    async delete(req: any, res: any, next: any): Promise<void> {
        super.delete(req, res, next);
    }
}