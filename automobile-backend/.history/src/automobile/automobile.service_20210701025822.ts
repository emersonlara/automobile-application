import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomobileService {

    saveFile(file: any) {
        const csv = require('csvtojson')  
        const csvFilePath = process.cwd() + '/' +  job.data.file.path;
        
        const vehicleArray = await csv().fromFile(csvFilePath);
        
        var vehicle : Vehicle; 

        for(vehicle of vehicleArray){
            var manufacturedYear = new Date(vehicle.manufacturedDate);
            var ageOfVehicle = new Date().getFullYear() - manufacturedYear.getFullYear();
            vehicle.ageOfVehicle = ageOfVehicle;
            await this.vehicleRepository.save(vehicle);
        }
    }
}
