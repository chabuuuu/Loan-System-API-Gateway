import axios from "axios";
import { BaseLog } from "@/logging/BaseLog";
import { validateOrReject } from "class-validator";
import { GetAllDto } from "@/dto/getAll.dto";
import { GetByIdDto } from "@/dto/getById.dto";
import { UpdateByIdDto } from "@/dto/update.dto";
import { DeleteByIdDto } from "@/dto/delete.dto";
import { CreateDto } from "@/dto/create.dto";
const logger = new BaseLog();

export abstract class BaseController {
    public service: string;
    constructor(service: string) {
        this.service = service;
    }

    async create(req: any, res: any, next: any) {
        try {
            const {data} = await axios.post(`${this.service}`, req.body);
            this.validateResponse(data, new CreateDto())
            logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const {data} = await axios.get(`${this.service}`);

            //Validate the response
            this.validateResponse(data, new GetAllDto())
            logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async getById(req: any, res: any, next: any) {
        try {
            const {data} = await axios.get(`${this.service}/${req.params.id}`);

            //Validate the response
            this.validateResponse(data, new GetByIdDto())


            logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async update(req: any, res: any, next: any) {
        try {
            const {data} = await axios.put(`${this.service}/${req.params.id}`, req.body);

            //Validate the response
            this.validateResponse(data, new UpdateByIdDto())
            logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async delete(req: any, res: any, next: any) {
        try {
            const {data} = await axios.delete(`${this.service}/${req.params.id}`);

            //Validate the response
            this.validateResponse(data, new DeleteByIdDto())
            logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async erroHandle(error : any){
        //console.log('error:::',error.request);
        
        if (error.code === "ECONNREFUSED") {
            error.message = `Service ${this.service} Not Available`
        }
        if (error.hasOwnProperty('response')) {
            return (error.response.data);
        }
        return error
    }

    async validateResponse(response: any, dto: any) {
        dto.data = response.data;
        dto.message = response.message;
        dto.status = response.status;
        await validateOrReject(dto)
    }
}