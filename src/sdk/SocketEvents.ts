import {Socket} from "socket.io-client";
import {EmitTextMsg} from "@/sdk/msg";

export interface SocketReservedEvents {
    connect: () => void;
    connect_error: (err: Error) => void;
    disconnect: (reason: Socket.DisconnectReason) => void;
    message: (msg: EmitTextMsg) => void;
}