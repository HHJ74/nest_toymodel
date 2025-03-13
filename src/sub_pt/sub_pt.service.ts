import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubStations } from './sub_pt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubPtService {
    constructor(
            @InjectRepository(SubStations)
            private subStationReopsitory: Repository<SubStations>
        ){}
    
        async findAll():Promise<SubStations[]> {
            return this.subStationReopsitory.find();
        }
    
        // async findNearby(x:number, y:number, radius:number): Promise<SubStations[]>{
        //     return this.subStationReopsitory
        //     .createQueryBuilder('courses')
        //     .where(
        //         `ST_Distance(
        //             ST_SetSRID(ST_MakePoint(:x, :y),4326)::geography,
        //             courses.course_line::geography
        //             ) <= :radius`,
        //         {x, y, radius},
        //     )
        //     .getMany();
        // }
}
