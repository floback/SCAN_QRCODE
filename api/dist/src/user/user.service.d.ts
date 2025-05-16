import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity>;
    updateUser(id: string, createUserDto: Partial<CreateUserDto>): Promise<UserEntity>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
