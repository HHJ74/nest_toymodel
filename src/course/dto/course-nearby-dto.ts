import { IsNumber } from "class-validator";

export class courseNeaybySub{
    @IsNumber()
    x: number;

    @IsNumber()
    y: number;

    @IsNumber()
    radius: number;
}