import axios from "axios";
import { IBaseController } from "./i.base.controller";
import { BaseLog } from "@/logging/BaseLog";
const logger = new BaseLog();
export abstract class BaseController {
    public service: string;
    constructor(service: string) {
        this.service = service;
    }

    async create(req: any, res: any, next: any) {
        try {
            const data = await axios.post(`${this.service}`, req.body);
            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }

    async get(req: any, res: any, next: any) {
        try {            
            const data = await axios.get(`${this.service}`);            
            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            }        
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }

    async getById(req: any, res: any, next: any) {
        try {
            const data = await axios.get(`${this.service}/${req.params.id}`);
            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }

    async update(req: any, res: any, next: any) {
        try {
            const data = await axios.put(`${this.service}/${req.params.id}`, req.body);
            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error : any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }

    async delete(req: any, res: any, next: any) { 
        try {
            const data = await axios.delete(`${this.service}/${req.params.id}`);
            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error : any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }
}