import axios from "axios";
import { BaseLog } from "@/logging/BaseLog";
import { validateOrReject } from "class-validator";
import { GetAllDto } from "@/dto/getAll.dto";
import { GetByIdDto } from "@/dto/getById.dto";
import { UpdateByIdDto } from "@/dto/update.dto";
import { DeleteByIdDto } from "@/dto/delete.dto";
import { CreateDto } from "@/dto/create.dto";

export abstract class BaseController {
    public service: string;
    public logger: BaseLog = new BaseLog();
    constructor(service: string) {
        this.service = service;
    }

    async create(req: any, res: any, next: any) {
        try {
            const {data} = await axios.post(`${this.service}`, req.body, {
                headers: {
                    Authorization: req.protect
                }
            });
            this.validateResponse(data, new CreateDto())
            this.logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const {data} = await axios.get(`${this.service}`, {
                headers: {
                    Authorization: req.protect
                }
            });

            //Validate the response
            await this.validateResponse(data, new GetAllDto())
            this.logger.log(req, JSON.stringify(data), 'info', this.service)            
            return res.json(data);
        } catch (error: any) {    
            next(error)        
            //next(this.erroHandle(error));
        }
    }

    async getById(req: any, res: any, next: any) {
        try {
            const {data} = await axios.get(`${this.service}/${req.params.id}`, {
                headers: {
                    Authorization: req.protect
                }
            });

            //Validate the response
            this.validateResponse(data, new GetByIdDto())


            this.logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async update(req: any, res: any, next: any) {
        try {
            const {data} = await axios.put(`${this.service}/${req.params.id}`, req.body, {
                headers: {
                    Authorization: req.protect
                }
            });

            //Validate the response
            this.validateResponse(data, new UpdateByIdDto())
            this.logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    async delete(req: any, res: any, next: any) {
        try {
            const {data} = await axios.delete(`${this.service}/${req.params.id}`, {
                headers: {
                    Authorization: req.protect
                }
            });

            //Validate the response
            this.validateResponse(data, new DeleteByIdDto())
            this.logger.log(req, JSON.stringify(data), 'info', this.service)
            return res.json(data);
        } catch (error: any) {
            next(this.erroHandle(error));
        }
    }

    erroHandle(error : any){        
        if (error.code === "ECONNREFUSED") {
            error.message = `Service ${this.service} Not Available`
        }
        if (error.hasOwnProperty('response')) {
            return (error.response.data);
        }
        return error
    }

    async validateResponse(response: any, dto: any) {
        try {            
            for (const [key] of Object.entries(response)) {                
                dto[key] = response[key];
              }
            await validateOrReject(dto)
        } catch (error) {
            throw error
        }

    }
}