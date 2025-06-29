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
  constructor(private readonly scanService: ScanService) { }

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
  // QR Code não existe
  return res.status(404).send(`
    <html>
      <head><title>QR Code inválido</title></head>
      <body style="background:#fef2f2;font-family:sans-serif;text-align:center;padding-top:50px;color:#b91c1c">
        <h1>🚫 QR Code inválido</h1>
        <p>O QR Code escaneado não existe ou foi removido.</p>
      </body>
    </html>
  `);
}
console.log(qr.status);

if (qr.status === false) { 
  return res.status(403).send(`
    <html>
      <head><title>QR Code Desativado</title></head>
      <body style="background:#fef2f2;font-family:sans-serif;text-align:center;padding-top:50px;color:#b91c1c">
        <h1>🚫 QR Code desativado</h1>
        <p>Este QR Code foi desativado e não está mais disponível.</p>
      </body>
    </html>
  `);
}


if (!qr.status) {
  return res.send(`
    <html>
      <head>
        <title>QR Code Desativado</title>
        <style>
          body {
            background: #cffafe;
            font-family: sans-serif;
            text-align: center;
            padding-top: 60px;
            color: #0e7490;
          }
          .card {
            background: white;
            display: inline-block;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            max-width: 400px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 12px;
          }
          p {
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>QR Code fora de uso</h1>
          <p>Este QR Code foi desativado e não está mais disponível.</p>
        </div>
      </body>
    </html>
  `);
}


    const latitude = geo?.ll?.[0] ?? null;
    const longitude = geo?.ll?.[1] ?? null;

    const scanData = { id_qrcode: qr.id, ip: ipString, country: geo?.country || 'Desconhecido', city: geo?.city || 'Desconhecida', region: geo?.region || 'Desconhecida', latitude, longitude };

    const redirectTo = qr.number_fone ? `https://wa.me/${qr.number_fone}` : qr.link_add;

return res.send(`
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Redirecionando...</title>
    <style>
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background: #cffafe; /* cyan-100 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: #0f172a;
        text-align: center;
      }
      .card {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
      }
      h2 {
        color: #0e7490;
        margin-bottom: 1rem;
      }
      p {
        margin: 0.5rem 0;
      }
      .timer {
        font-size: 2rem;
        margin-top: 1rem;
        font-weight: bold;
        color: #0891b2;
      }
      .fallback-button {
        margin-top: 20px;
        display: inline-block;
        padding: 10px 20px;
        background-color: #06b6d4;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        text-decoration: none;
        transition: background-color 0.3s;
      }
      .fallback-button:hover {
        background-color: #0891b2;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>✅ QR Code escaneado com sucesso!</h2>
      <p><strong>IP:</strong> ${scanData.ip}</p>
      <p><strong>Localização:</strong> ${scanData.city}, ${scanData.region} - ${scanData.country}</p>
      <p><strong>Coordenadas:</strong> ${scanData.latitude}, ${scanData.longitude}</p>
      <p>Você será redirecionado em <span id="countdown">3</span> segundos...</p>
      <div class="timer">⏳</div>
      <a href="${redirectTo}" class="fallback-button">Clique aqui se não for redirecionado</a>
    </div>

    <script>
      const countdownElement = document.getElementById('countdown');
      let seconds = 3;

      console.log("🔁 Redirecionando para:", "${redirectTo}");

      const interval = setInterval(() => {
        seconds--;
        countdownElement.innerText = seconds;
        if (seconds <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      fetch('/scan/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(${JSON.stringify(scanData)})
      })
      .then(res => res.json())
      .then(data => console.log("✅ Dados do scan salvos:", data))
      .catch(err => {
        console.error("❌ Erro ao salvar o scan:", err);
        document.body.innerHTML += '<p style="color:red">Erro ao salvar o scan: ' + err + '</p>';
      });

      setTimeout(() => {
        window.location.href = "${redirectTo}";
      }, 3000);
    </script>
  </body>
  </html>
`);

  }

  @Post('save')
  async handleGpsSave(@Body() body: any, @Res() res: Response) {
    try {
      console.log('[ScanController] Salvando scan:', body);
      const saved = await this.scanService.createScan(body);
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
      qrcode: scan.qrcode
        ? {
          id: scan.qrcode.id,
          name: scan.qrcode.name,
          link_add: scan.qrcode.link_add,
          status: scan.qrcode.status,
          type: scan.qrcode.type,
          created_by: scan.qrcode.created_by,
        }
        : null
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
