import { encode } from "js-base64";

// 1 鉴权消息 2 文本消息   2图片消息 3 文件消息   7 呼叫
class Msg {
    type = 1;
    constructor() {
    }
    toString() {
        return JSON.stringify(this);
    }
}

export class TextMsg extends Msg{
    msgId: string;
    content: string;
    to: string;
    type = 2;
    constructor(to: string, content: string) {
        super();
        this.to = to;
        this.content = encode(content);
        this.msgId = `${Date.now() + Math.floor(Math.random() * 1000)}`
    }
}


