import axios from '@/plugins/axios';
import {Md5} from 'ts-md5/dist/md5';

const md5 = new Md5();

export const DoLogin = (username: string, originPassword: string) => {
    const password = md5.appendStr(originPassword).end();
    return axios.post('/user/login', {
            username,
            password,
        }
    )
}
export const DoRegister = (username: string, originPassword: string) => {
    const password = md5.appendStr(originPassword).end();
    return axios.post('/user/register', {
            username,
            password,
        }
    )
}