import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({schema:"toymodel", name:"courses"})
export class Course {
    @PrimaryGeneratedColumn()
    course_id: number;

    @Column({type:"integer", nullable:false})
    user_id :number;

    @Column({type:"integer", nullable:false})
    rds_sn :number;

    @Column({type:"text", nullable:true})
    content :string;

    @Column({type:"geometry", nullable:false})
    course_line :any;

    @CreateDateColumn({type:"timestamptz", default: ()=>'CURRENT_TIMESTAMP'})
    created_at :Date;

    @CreateDateColumn({type:"timestamptz", nullable:true})
    deleted_at :Date;

    @Column({type:"text", nullable:false})
    status :string;
}