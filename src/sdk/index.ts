import {io, Socket} from 'socket.io-client';
import {AuthMsg, Msg, TextMsg, FriendListMsg, EmitTextMsg, FriendListResp} from '@/sdk/msg';
import { timestampToTime } from './lib';

import {IM} from './IM';

interface MsgCache {
    resolve: Function,
    reject: Function,
    failTimeout: number,
}

export class Client {
    userId: string;
    private client: IM;

    constructor(userId: string) {
        this.userId = userId;
        this.client = new IM(userId);
        this.client.on('connect', () => {
            this.auth().then(() => {
                console.log('Auth success');
                this.onConnect();
            });

            this.getFrendList().then((resp) => {
                this.onFriendList(resp as FriendListResp[]);
            })
        })
        this.client.on('message', (msg: any) => {
            this.onMessage(msg);
        })
        this.client.on('disconnect', (reason: Socket.DisconnectReason) => {
            this.onDisonnect(reason);
        })
    }

    private auth() {
        const authStr = new AuthMsg('testtoken', this.userId);
        return this.send(authStr);
    }

    private getFrendList() {
        const frendListStr = new FriendListMsg();
        return this.send(frendListStr);
    }


    private send(msg: Msg) {
        return this.client.send(msg);
    }

    onMessage(msg: EmitTextMsg) {
        console.log('client: onMessage', msg);
    }
    onConnect() {
        console.log('client: onConnect');
    }
    onDisonnect(reason: Socket.DisconnectReason) {
        console.log('client: onDisonnect');
    }
    onFriendList(friendList: FriendListResp[]) {
        console.log('client: onFrendList');
    }

    sendText(userId: string, content: string) {
        const sendStr = new TextMsg(userId, content, this.userId);
        return this.send(sendStr);
    }

}