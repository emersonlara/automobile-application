import { BadRequestException, Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AutomobileService {

    constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>) { }

    async saveFile(file: any): Promise<string[]> {
        const csv = require('csvtojson')
        const csvFilePath = process.cwd() + '/' + file.path;

        const vehicleArray = await csv().fromFile(csvFilePath);
        console.log(vehicleArray);

        // var vehicles = await this.vehicleRepository.save(vehicleArray);

        try {
            var vehicles = await this.vehicleRepository.save(vehicleArray);
        } catch (error) {
            if (error.name === 'QueryFailedError') {
                if (/^duplicate key value violates unique constraint/.test(error.message)) {
                    throw new BadRequestException(error.detail);
                } else {
                    throw error;
                }
            } else {
                throw error;
            }

            return vehicles;

        }
    }
