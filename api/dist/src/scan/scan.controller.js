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
exports.ScanController = void 0;
const common_1 = require("@nestjs/common");
const geoip = require("geoip-lite");
const scan_service_1 = require("./scan.service");
const _roles_decorator_1 = require("../auth/decoraters/ roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const jtw_auth_guard_1 = require("../auth/guard/jtw-auth-guard");
let ScanController = class ScanController {
    scanService;
    constructor(scanService) {
        this.scanService = scanService;
    }
    async handleScanGet(req, qrId, res) {
        const rawIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
            req.socket.remoteAddress ||
            '127.0.0.1';
        const ipString = typeof rawIp === 'string' ? rawIp : '';
        const geo = geoip.lookup(ipString);
        console.log('🔎 IP:', ipString);
        console.log('🌍 Geo:', geo);
        const qr = await this.scanService.findByCode(qrId);
        if (!qr) {
            return res.status(404).send('QR Code não encontrado!');
        }
        const latitude = geo?.ll?.[0] ?? null;
        const longitude = geo?.ll?.[1] ?? null;
        const scanData = {
            id_qrcode: qr.id,
            ip: ipString,
            country: geo?.country || 'Desconhecido',
            city: geo?.city || 'Desconhecida',
            region: geo?.region || 'Desconhecida',
            latitude,
            longitude,
        };
        const redirectTo = qr.number_fone
            ? `https://wa.me/${qr.number_fone}`
            : qr.link_add;
        return res.send(`
      <html>
        <head>
          <title>Redirecionando...</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: sans-serif; text-align: center; margin-top: 50px; }
          </style>
        </head>
        <body>
          <h2>QR Code escaneado com sucesso!</h2>
          <p><strong>IP:</strong> ${scanData.ip}</p>
          <p><strong>Localização estimada:</strong> ${scanData.city}, ${scanData.region} - ${scanData.country}</p>
          <p><strong>Latitude:</strong> ${scanData.latitude ?? 'Não disponível'}</p>
          <p><strong>Longitude:</strong> ${scanData.longitude ?? 'Não disponível'}</p>
          <p>Redirecionando em instantes...</p>

          <script>
            fetch('/scan/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(${JSON.stringify(scanData)})
            }).then(res => res.json())
              .then(data => {
                console.log('📍 Dados salvos com sucesso:', data);
              })
              .catch(err => {
                document.body.innerHTML += '<p style="color:red;">Erro ao salvar localização: ' + err + '</p>';
              });

            setTimeout(() => {
              window.location.href = '${redirectTo}';
            }, 2000);
          </script>
        </body>
      </html>
    `);
    }
    async handleGpsSave(body) {
        const saved = await this.scanService.create(body);
        console.log('📍 Dados de scan salvos:', saved);
        return { message: 'Localização registrada com sucesso!', data: saved };
    }
    async getAllScans() {
        return await this.scanService.findAll();
    }
    async getScanById(id) {
        return await this.scanService.findById(id);
    }
    async findById(id) {
        return await this.scanService.findById(id);
    }
    async deleteScan(id) {
        return await this.scanService.delete(id);
    }
};
exports.ScanController = ScanController;
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('qrId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "handleScanGet", null);
__decorate([
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "handleGpsSave", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER, role_enum_1.Role.VIWER),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "getAllScans", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER, role_enum_1.Role.VIWER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "getScanById", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER, role_enum_1.Role.VIWER),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jtw_auth_guard_1.JwtAuthGuard),
    (0, _roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.USER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScanController.prototype, "deleteScan", null);
exports.ScanController = ScanController = __decorate([
    (0, common_1.Controller)('scan'),
    __metadata("design:paramtypes", [scan_service_1.ScanService])
], ScanController);
//# sourceMappingURL=scan.controller.js.map