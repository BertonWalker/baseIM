import {io, Socket} from 'socket.io-client';
import {AuthMsg, Msg, TextMsg, RecvMsg, RecvTextMsg, EmitTextMsg} from '@/sdk/msg';
import { timestampToTime } from './lib';

interface MsgCache {
    resolve: Function,
    reject: Function,
    failTimeout: number,
}

export class Client {
    userId: string;

    private client: Socket;
    private msgMap = new Map();

    constructor(userId: string) {
        this.userId = userId;
        this.client = io('ws://localhost:8888', {
            reconnectionDelayMax: 10000,
        })
        this.client.on('connect', () => {
            console.log('socket has connected');
            this.auth().then(() => {
                this.log('Auth success');
            });
        })
        this.client.on('message', this.onSocketMessage.bind(this))
        this.client.connect();

    }

    private auth() {
        const authStr = new AuthMsg('testtoken', this.userId);
        return this.send(authStr);
    }

    private onSocketMessage(msg: string) {
        this.log('recv a msg: ' + msg);
        let MsgLite = null;
        try {
            MsgLite = JSON.parse(msg) as RecvMsg;
        } catch (e) {
            console.log(`receive an unknown msg: `, msg);
            return;
        }
        // TODO msg processor
        if (Number.isInteger(MsgLite.clientNumber)) {
            const msg = <MsgCache>this.msgMap.get(MsgLite.clientNumber);
            if (!msg) {
                return;
            }
            if (MsgLite.code === 0) {
                msg.resolve()
            } else {
                msg.reject({code: MsgLite.code});
            }
            clearTimeout(msg.failTimeout)
        } else {
            // TODO server push msg
            switch (MsgLite.type) {
                case 2:
                    this.processRecvTextMsg(MsgLite as RecvTextMsg);
                    break;
                default: break;
            }


        }
    }

    private send(msg: Msg) {
        return new Promise((resolve, reject) => {
            const str = JSON.stringify(msg);
            this.log(str);
            this.client.send(str);
            const failTimeout = setTimeout(() => {
                // this.cleanMsgMap(msg.clientNumber);
                this.msgMap.delete(msg.clientNumber);
                reject({code: 101, msg: 'timeout'});
            }, 30 * 1000);
            this.msgMap.set(msg.clientNumber, <MsgCache>{
                resolve, reject, failTimeout
            })
        })

    }

    private processRecvTextMsg(msgLite: RecvTextMsg) {
        const { type, msgSender, msgReceiver, content, msgVersion } = msgLite;
        const emitMsg = new EmitTextMsg(type, msgSender, msgReceiver, content, msgVersion)
        this.onMessage(emitMsg);
    }

    onMessage(msg: any) {

    }

    cleanMsgMap(clientNumber: number) {
        if(this.msgMap.has(clientNumber)) {
            const map = this.msgMap.get(clientNumber);

        }
    }

    sendText(userId: string, content: string) {
        const sendStr = new TextMsg(userId, content, this.userId);
        return this.send(sendStr);
    }

    private log(content: string){

        console.log(`[${timestampToTime()}] ${content}`);
    }
}