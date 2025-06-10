// src/scan/scan.controller.ts
import { Controller, Get, Req, Param, Post, Body, Res, Delete, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import * as geoip from 'geoip-lite';
import { ScanService } from './scan.service';
import { Lookup } from 'geoip-lite';
import { Roles } from 'src/auth/decoraters/ roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth-guard';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Get('redirect/:qrId')
  async handleScanGet(@Req() req: Request, @Param('qrId') qrId: string, @Res() res: Response) {
    console.log('[Router] GET /scan/redirect/' + qrId);

    const rawIp =
      req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';
    const ipString = typeof rawIp === 'string' ? rawIp : '';
    const geo = geoip.lookup(ipString) as Lookup | null;

    console.log('🔎 IP do scanner:', ipString, ' Geo:', geo);

    const qr = await this.scanService.findByCode(qrId);
    if (!qr) {
      console.warn(`[ScanController] QR code "${qrId}" não encontrado.`);
      return res.status(404).send('QR Code não encontrado!');
    }

    const latitude = geo?.ll?.[0] ?? null;
    const longitude = geo?.ll?.[1] ?? null;

    const scanData = { id_qrcode: qr.id, ip: ipString, country: geo?.country || 'Desconhecido', city: geo?.city || 'Desconhecida', region: geo?.region || 'Desconhecida', latitude, longitude };

    const redirectTo = qr.number_fone ? `https://wa.me/${qr.number_fone}` : qr.link_add;

    return res.send(`
      <html>
        <head><meta charset="utf-8"><title>Redirecionando...</title></head>
        <body style="font-family:sans-serif;text-align:center;margin-top:50px">
          <h2>QR Code escaneado com sucesso!</h2>
          <p><strong>IP:</strong> ${scanData.ip}</p>
          <p><strong>Localização:</strong> ${scanData.city}, ${scanData.region} - ${scanData.country}</p>
          <p><strong>Coords:</strong> ${scanData.latitude}, ${scanData.longitude}</p>
          <p>Redirecionando em 2s...</p>
          <script>
            fetch('/scan/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(${JSON.stringify(scanData)})
            })
            .then(res => res.json()).then(console.log)
            .catch(err => document.body.innerHTML += '<p>Erro ao salvar: ' + err + '</p>');
            setTimeout(()=>window.location.href= redirectTo ,3000);
          </script>
        </body>
      </html>
    `);
  }

  @Post('save')
  async handleGpsSave(@Body() body: any, @Res() res: Response) {
    try {
      console.log('[ScanController] Salvando scan:', body);
      const saved = await this.scanService.create(body);
      return res.status(201).json({ message: 'Scan registrado!', data: saved });
    } catch (err) {
      console.error('[ScanController] Erro ao salvar scan:', err);
      return res.status(500).json({ message: 'Erro ao registrar scan.' });
    }
  }

  @Get('join')
  async findAllJoin(): Promise<any[]> {
    const scans = await this.scanService.findAllJoin();
    return scans.map(scan => ({
      id: scan.id,
      ip: scan.ip,
      country: scan.country,
      city: scan.city,
      region: scan.region,
      latitude: scan.latitude,
      longitude: scan.longitude,
      create_date: scan.create_date,
      name: scan.qrcode?.name,
      link_add: scan.qrcode?.link_add
    }));
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER, Role.VIWER)
  async findById(@Param('id') id: string) {
    return await this.scanService.findById(id);
  }

  @Delete('id/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER)
  async deleteScan(@Param('id') id: string) {
    return await this.scanService.delete(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER, Role.VIWER)
  async getAllScans() {
    return await this.scanService.findAll();
  }
}
