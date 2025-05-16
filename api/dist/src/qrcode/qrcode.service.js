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
exports.QrcodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const qrcode_entity_1 = require("./entities/qrcode.entity");
const user_entity_1 = require("../user/entities/user.entity");
const QRCode = require("qrcode");
const uuid_1 = require("uuid");
let QrcodeService = class QrcodeService {
    qrcodeRepository;
    userRepository;
    constructor(qrcodeRepository, userRepository) {
        this.qrcodeRepository = qrcodeRepository;
        this.userRepository = userRepository;
    }
    async createQRCode(id_user, number_fone, link_add, name) {
        const uniqueCode = (0, uuid_1.v4)();
        let finalLink = link_add;
        if (!finalLink && number_fone) {
            finalLink = `https://wa.me/${number_fone}`;
        }
        const backendBaseUrl = process.env.BASE_URL || 'https://54d8-132-255-43-78.ngrok-free.app';
        const qrRedirectLink = `${backendBaseUrl}/scan/${uniqueCode}`;
        const img = await QRCode.toDataURL(qrRedirectLink);
        const qrcode = this.qrcodeRepository.create({
            id_user,
            code: uniqueCode,
            img,
            status: true,
            link_add: finalLink,
            number_fone,
            name,
        });
        return await this.qrcodeRepository.save(qrcode);
    }
    async findById(id) {
        return await this.qrcodeRepository.findOne({ where: { id } });
    }
    async findAll() {
        return await this.qrcodeRepository.find();
    }
    async delete(id) {
        await this.qrcodeRepository.delete(id);
        return `QRCode com id ${id} deletado com sucesso.`;
    }
    openWhatsapp(number_fone) {
        return `https://wa.me/${number_fone}`;
    }
    async activateQRCode(id) {
        const qrcode = await this.qrcodeRepository.findOne({ where: { id } });
        if (qrcode) {
            qrcode.status = true;
            return await this.qrcodeRepository.save(qrcode);
        }
        throw new Error('QRCode não encontrado');
    }
    async deactivateQRCode(id) {
        const qrcode = await this.qrcodeRepository.findOne({ where: { id } });
        if (qrcode) {
            qrcode.status = false;
            return await this.qrcodeRepository.save(qrcode);
        }
        throw new Error('QRCode não encontrado');
    }
    async update(id, createQrcodeDto) {
        const qrcode = await this.qrcodeRepository.findOne({ where: { id } });
        if (!qrcode) {
            throw new common_1.NotFoundException(`QR Code com ID ${id} não encontrado.`);
        }
        const updatedQrcode = Object.assign(qrcode, createQrcodeDto);
        return await this.qrcodeRepository.save(updatedQrcode);
    }
};
exports.QrcodeService = QrcodeService;
exports.QrcodeService = QrcodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(qrcode_entity_1.QrcodeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QrcodeService);
//# sourceMappingURL=qrcode.service.js.map