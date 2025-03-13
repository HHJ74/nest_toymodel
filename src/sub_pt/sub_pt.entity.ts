import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:"toymodel", name:"sub_stations"})
export class SubStations {
    @PrimaryGeneratedColumn()
    station_id: number;

    @Column({type:"text", nullable:false})
    station_name :string;

    @Column({type:"integer", nullable:false})
    station_code :number;

    @Column({type:"text", nullable:false})
    sub_line_number :string;

    @Column({type:"geometry", nullable:false})
    location :any;

    @Column({type:"boolean", nullable:false})
    islocker :boolean;

    @Column({type:"text", nullable:false})
    status :string;
}