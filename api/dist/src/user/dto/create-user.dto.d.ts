export declare enum UserType {
    owner = "OWNER",
    admin = "ADMIN",
    user = "USER",
    viwer = "VIWER"
}
export declare class CreateUserDto {
    id: string;
    email: string;
    name: string;
    password: string;
    type_user?: UserType;
    status?: boolean;
}
