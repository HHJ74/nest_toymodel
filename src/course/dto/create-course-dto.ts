import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  rds_sn: number;

  @IsString()
  content?: string;

  @IsArray()
  @IsNotEmpty()
  points: { latitude: number; longitude: number }[];

  @IsString()
  @IsNotEmpty()
  status: string;
}