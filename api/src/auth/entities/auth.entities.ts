import { join } from "path";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth')
export class AuthEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.auth )
    @JoinColumn({ name: 'id_user' })
    user: UserEntity;
   

@Column({ type: 'text' })
token: string;


}