import { Module } from '@nestjs/common';
import { SubPtController } from './sub_pt.controller';
import { SubPtService } from './sub_pt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubStations } from './sub_pt.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([SubStations]) 
    ],
  controllers: [SubPtController],
  providers: [SubPtService]
})
export class SubPtModule {}
