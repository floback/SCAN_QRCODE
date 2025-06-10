import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, RelationId } from 'typeorm';
import { QrcodeEntity } from '../../qrcode/entities/qrcode.entity';

@Entity('scan_logs')
export class ScanEntity {
 @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => QrcodeEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_qrcode' })
  qrcode: QrcodeEntity;

  @RelationId((scan: ScanEntity) => scan.qrcode)
  id_qrcode: string;

  @Column()
  ip: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column('float', { nullable: true })
  latitude: number | null;

  @Column('float', { nullable: true })
  longitude: number | null;

  @CreateDateColumn()
  create_date: Date;
}
