import axios from "axios";
import { BaseLog } from "@/logging/BaseLog";
import { validateOrReject } from "class-validator";
import { GetAllDto } from "@/dto/getAll.dto";
import { GetByIdDto } from "@/dto/getById.dto";
import { UpdateByIdDto } from "@/dto/update.dto";
import { DeleteByIdDto } from "@/dto/delete.dto";
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
            if (error.code === "ECONNREFUSED") {
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

            //Validate the response
            let getAllDto = new GetAllDto();
            getAllDto.data = data.data.data;
            getAllDto.message = data.data.message;
            getAllDto.status = data.data.status;
            await validateOrReject(getAllDto)

            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED") {
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

            //Validate the response
            let getAllDto = new GetByIdDto();
            getAllDto.data = data.data.data;
            getAllDto.message = data.data.message;
            getAllDto.status = data.data.status;
            await validateOrReject(getAllDto)

            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED") {
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

            //Validate the response
            let getAllDto = new UpdateByIdDto();
            getAllDto.data = data.data.data;
            getAllDto.message = data.data.message;
            getAllDto.status = data.data.status;
            await validateOrReject(getAllDto);

            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED") {
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

            //Validate the response
            let getAllDto = new DeleteByIdDto();
            getAllDto.data = data.data.data;
            getAllDto.message = data.data.message;
            getAllDto.status = data.data.status;
            await validateOrReject(getAllDto)

            logger.log(req, JSON.stringify(data.data), 'info', this.service)
            return res.json(data.data);
        } catch (error: any) {
            if (error.code === "ECONNREFUSED") {
                error.message = `Service ${this.service} Not Available`
            }
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error);
        }
    }
}