import { encode, decode } from "js-base64";
let id = 0;
// 1 鉴权消息 2 文本消息   2图片消息 3 文件消息   7 呼叫
export class Msg {
    type = 1;
    clientNumber = 0;
    constructor() {
        this.clientNumber = id++;
    }
}
export class AuthMsg extends Msg{
    token: string;
    userId: string;
    type = 1;
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
    type = 2;
    constructor(to: string, content: string, userId: string) {
        super();
        this.userId = userId;
        this.to = to;
        this.content = encode(content);
        this.msgId = `${Date.now() + Math.floor(Math.random() * 1000)}`
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

export interface RecvMsg {
    type: number,
    msgSender: string,
    msgReceiver: string,
    clientNumber?: number,
    code?: number,
}



export interface RecvTextMsg extends RecvMsg {
    msgVersion: number,
    content: string
}

