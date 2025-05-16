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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanEntity = void 0;
const typeorm_1 = require("typeorm");
const qrcode_entity_1 = require("../../qrcode/entities/qrcode.entity");
let ScanEntity = class ScanEntity {
    id;
    qrcode;
    id_qrcode;
    ip;
    country;
    city;
    region;
    latitude;
    longitude;
    create_date;
};
exports.ScanEntity = ScanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qrcode_entity_1.QrcodeEntity, (qrcode) => qrcode.id, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_qrcode' }),
    __metadata("design:type", qrcode_entity_1.QrcodeEntity)
], ScanEntity.prototype, "qrcode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanEntity.prototype, "id_qrcode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScanEntity.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Object)
], ScanEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Object)
], ScanEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ScanEntity.prototype, "create_date", void 0);
exports.ScanEntity = ScanEntity = __decorate([
    (0, typeorm_1.Entity)('scan_logs')
], ScanEntity);
//# sourceMappingURL=scan.entity.js.map