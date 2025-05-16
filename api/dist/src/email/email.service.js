"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const bcrypt = require("bcrypt");
let EmailService = class EmailService {
    jwtService;
    usersRepository;
    mailerService;
    constructor(jwtService, usersRepository, mailerService) {
        this.jwtService = jwtService;
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
    }
    async sendRecoveryEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('E-mail não encontrado');
        }
        const payload = { id_user: user.id };
        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '10m',
        });
        const resetLink = `${process.env.CLIENT_URL}/email/reset?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Recuperação de Senha',
            html: `
        <h3>Recuperação de senha</h3>
        <p>Clique no link abaixo para redefinir sua senha. O link expira em 10 minutos.</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
        });
        return 'E-mail de recuperação enviado com sucesso';
    }
    async resetPassword(token, newPassword) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            const id_user = payload.id_user;
            const user = await this.usersRepository.findOne({ where: { id: id_user } });
            if (!user) {
                throw new common_1.NotFoundException('Usuário não encontrado.');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.usersRepository.save(user);
            return { message: 'Senha redefinida com sucesso.' };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido ou expirado.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map