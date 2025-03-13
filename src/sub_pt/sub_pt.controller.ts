import { Controller, Get } from '@nestjs/common';
import { SubPtService } from './sub_pt.service';
import { SubStations } from './sub_pt.entitiy';

@Controller('sub-pt')
export class SubPtController {
     constructor(private SubPtService: SubPtService) {}
    
        @Get()
        asyncfindAll(): Promise<SubStations[]>{
            return this.SubPtService.findAll();
        }
    
        // @Get('nearby')
        // async FindNearby(@Query() quary:courseNeaybySub): Promise<Course[]>{
        //     return this.CourseService.findNearby(quary.x, quary.y, quary.radius);
        // }
}
