import {io, Socket} from 'socket.io-client';
import { TextMsg } from '@/sdk/msg';

export class Client {
    client: Socket;
    userId: string;
    constructor(userId: string) {
        this.userId = userId;
        this.client = io('ws://localhost:8888', {
            reconnectionDelayMax: 10000,
        })
        this.client.on('connect', () => {
            console.log('socket has connected');
        })
        this.client.on('notice', this.onMessage)
        this.client.connect();
        console.log('connected: ', this.client.connected);
    }

    private auth() {
        this.client.send('auth', {userId: this.userId});
    }

    private onMessage(msg: any) {
        console.log('onMessage', msg);
        // TODO msg processor
    }

    sendText(userId: string, content: string) {
        const sendStr = new TextMsg(userId, content).toString();
        this.client.send(sendStr)
    }
}