import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ schema: "toymodel", name: "users" })
export class User {
    @PrimaryColumn({ name: "user_id", type: "integer" })
    userId: number;

    @Column({ name: "user_name", type: "text", nullable: false })
    userName: string;

    @Column({ name: "user_KKO_token", type: "text", nullable: false })
    userKKOToken: string;

    @Column({ name: "created_at", type: "timestamp", nullable: false })
    createdAt: Date;

    @Column({ name: "status", type: "text", nullable: false })
    status: string;
}