import { DataSource } from 'typeorm';
import { UserEntity } from './src/user/entities/user.entity';
import { AuthEntity } from './src/auth/entities/auth.entities';
import { QrcodeEntity } from './src/qrcode/entities/qrcode.entity';
import 'dotenv/config';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: ['dist/**/*.entity.js'],
  entities: [UserEntity, AuthEntity, QrcodeEntity],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
