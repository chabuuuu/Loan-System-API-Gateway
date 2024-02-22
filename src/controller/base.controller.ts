import axios from "axios";
import { IBaseController } from "./i.base.controller";

export abstract class BaseController {
    // protected service: string;
    // constructor(service: string) {
    //     this.service = service;
    // }

    async create(req: any, res: any, next: any) {
        // try {
        //     const data = await axios.post(`${this.service}`, req.body);
        //     return res.json(data.data);
        // } catch (error: any) {
        //     if (error.hasOwnProperty('response')) {
        //         next(error.response.data);
        //     }
        //     next(error);
        // }
    }

    async get(req: any, res: any, next: any) {
        // try {
        //     const data = await axios.get(`${this.service}`);
        //     return res.json(data.data);
        // } catch (error: any) {
        //     if (error.hasOwnProperty('response')) {
        //         next(error.response.data);
        //     }
        //     next(error);
        // }
    }

    async getById(req: any, res: any, next: any) { }

    async update(req: any, res: any, next: any) { }

    async delete(req: any, res: any, next: any) { }
}