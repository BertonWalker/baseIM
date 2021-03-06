import {io, Socket} from 'socket.io-client';
import {AuthMsg, Msg, TextMsg, RecvMsg, RecvTextMsg, EmitTextMsg} from '@/sdk/msg';
import { timestampToTime } from './lib';
import {DefaultEventsMap, Emitter, EventsMap} from "@socket.io/component-emitter";
import { SocketReservedEvents } from './SocketEvents';
interface MsgCache {
    resolve: Function,
    reject: Function,
    failTimeout: number,
}


export class IM<ListenEvents extends EventsMap = DefaultEventsMap, EmitEvents extends EventsMap = ListenEvents> extends Emitter<ListenEvents, EmitEvents, SocketReservedEvents>{
    userId: string;

    private client: Socket;
    private msgMap = new Map();

    constructor(userId: string) {
        super();
        this.userId = userId;
        this.client = io('ws://localhost:8886', {
            reconnectionDelayMax: 10000,
        })
        this.client.on('connect', () => {
            this.emitReserved('connect');
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
        // process msg from server
        if (Number.isInteger(MsgLite.clientNumber)) { // 如果有clientNumber  则为客户端主动发起的消息，需匹配对应的回调处理。
            const msg = <MsgCache>this.msgMap.get(MsgLite.clientNumber);
            if (!msg) {
                console.warn('receive an un expect msg'); // 可能收到消息的时候已经超时，回调被移除了。
                return;
            }
            if (MsgLite.code === 0) {
                if (MsgLite.data) {
                    msg.resolve(MsgLite.data);
                } else {
                    msg.resolve();
                }
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

    send(msg: Msg) {
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
        // @ts-ignore
        this.emit('message', emitMsg);
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