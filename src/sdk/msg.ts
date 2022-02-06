import { encode, decode } from "js-base64";
import { SocketReservedEvents } from './SocketEvents';
let id = 0;
// 1 鉴权消息 2 文本消息   3图片消息 4 文件消息 5 获取好友列表 6 同步服务器未读消息  7 呼叫

enum MsgType {
    Auth = 1,
    Text,
    Picture,
    File,
    FriendList,
    SyncMsg,
    CallMsg
}


export class Msg {
    type = MsgType.Auth;
    clientNumber = 0;
    constructor() {
        this.clientNumber = id++;
    }
}
export class AuthMsg extends Msg{
    token: string;
    userId: string;
    type = MsgType.Auth;
    constructor(token: string, userId: string) {
        super();
        this.token = token;
        this.userId = userId;
    }
}

export class TextMsg extends Msg{
    userId: string;
    msgId: string;
    content: string;
    to: string;
    type = MsgType.Text;
    constructor(to: string, content: string, userId: string) {
        super();
        this.userId = userId;
        this.to = to;
        this.content = encode(content);
        this.msgId = `${Date.now() + Math.floor(Math.random() * 1000)}`
    }
}

export class FriendListMsg extends Msg{
    type = MsgType.FriendList;
    constructor() {
        super();
    }
}

export class EmitTextMsg {
    msgVersion: number;
    type: number;
    msgSender: string;
    msgReceiver: string;
    content: string;
    constructor(type: number, msgSender: string, msgReceiver: string, content: string, msgVersion: number) {
        this.type = type;
        this.msgSender = msgSender;
        this.msgReceiver = msgReceiver;
        this.content = decode(content);
        this.msgVersion = msgVersion
    }
}

export interface FriendListResp {
    userId: string;
    nickName: string;
}

export interface RecvMsg {
    type: number,
    msgSender: string,
    msgReceiver: string,
    clientNumber?: number,
    code?: number,
    data?: any,
}



export interface RecvTextMsg extends RecvMsg {
    msgVersion: number,
    content: string
}

