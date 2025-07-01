import {
WebSocketGateway,
WebSocketServer,
OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway({
    cors: {
        origin: '*',
    },
})

export class ScanGateway implements OnGatewayInit{
    @WebSocketServer()
    server: Server;

    afterInit() {
        console.log('✅ WebSocket gateway inicializado');

    }
    emitNewScan(scanData: any){
        this.server.emit('new-scan', scanData);
    }
}