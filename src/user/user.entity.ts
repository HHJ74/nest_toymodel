import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: "toymodel", name: "users" })
export class User {
    @PrimaryGeneratedColumn({ name: "user_id", type: "bigint" }) // 자동 증가하는 기본 키
    userId: number;

    @Column({ name: "kakao_id", type: "bigint", nullable: false, unique: true }) // 고유 제약 추가
    kakao_id: number;

    @Column({ name: "nickname", type: "text" }) // 일반 컬럼으로 변경
    nickname: string;

    @Column({ 
        name: "created_at", 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP", // 기본값 설정
        nullable: false 
    })
    createdAt: Date;

    @Column({ 
        name: "status", 
        type: "text", 
        default: "active", // 기본값 설정
        nullable: false 
    })
    status: string;
}