import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Expose } from 'class-transformer';
import { AppType } from '../dto/app-type.enum';

@Expose()
@Entity('qrcode')
export class QrcodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column()
  id_user: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({
    type: 'enum',
    enum: AppType,
    default: AppType.WHATSAPP,
    nullable: false,
  })
  app_type: AppType;

  @Column({ type: 'varchar', length: 20, nullable: true })
  number_fone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link_add: string;

  @Column({ type: 'text', nullable: true })
  img: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: string;

  @ManyToOne(() => UserEntity, (user) => user.qrcodes)
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;
}
