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
exports.QrcodeController = void 0;
const common_1 = require("@nestjs/common");
const qrcode_service_1 = require("./qrcode.service");
const jtw_auth_guard_1 = require("../auth/guard/jtw-auth-guard");
const common_2 = require("@nestjs/common");
const _roles_decorator_1 = require("../auth/decoraters/ roles.decorator");
const create_qrcode_dto_1 = require("./dto/create-qrcode.dto");
const role_enum_1 = require("../auth/enums/role.enum");
let QrcodeController = class QrcodeController {
    qrcodeService;
    constructor(qrcodeService) {
        this.qrcodeService = qrcodeService;
    }
    async createQRCode(req, createQrcodeDto) {
        const id_user = req.user.sub;
        const { number_fone, link_add, name } = createQrcodeDto;
        return this.qrcodeService.createQRCode(id_user, number_fone, link_add, name);
    }
    async findAll() {
        return this.qrcodeService.findAll();
    }
    async findById(id) {
        const qrcode = await this.qrcodeService.findById(id);
        if (!qrcode) {
            throw new common_1.NotFoundException(`QRCode com ID ${id} não encontrado.`);
        }
        return qrcode;
    }
    async delete(id) {
        return this.qrcodeService.delete(id);
    }
    async openWhatsapp(id) {
        const qrcode = await this.qrcodeService.findById(id);
        if (!qrcode) {
            throw new Error('QRCode não encontrado');
        }
        return this.qrcodeService.openWhatsapp(qrcode.number_fone);
    }
    async update(id, createQrcodeDto) {
        return this.qrcodeService.update(id, createQrcodeDto);
    }
};
exports.QrcodeController = QrcodeController;
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER),
    (0, common_1.Post)(),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_qrcode_dto_1.CreateQrcodeDto]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "createQRCode", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER, role_enum_1.Role.VIWER),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER, role_enum_1.Role.VIWER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('whatsapp/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "openWhatsapp", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_qrcode_dto_1.CreateQrcodeDto]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "update", null);
exports.QrcodeController = QrcodeController = __decorate([
    (0, common_1.Controller)('qrcode'),
    __metadata("design:paramtypes", [qrcode_service_1.QrcodeService])
], QrcodeController);
//# sourceMappingURL=qrcode.controller.js.map