import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity>;
    update(id: string, createUserDto: CreateUserDto): Promise<UserEntity>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
