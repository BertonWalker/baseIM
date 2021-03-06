import axios from '@/plugins/axios';
import {Md5} from 'ts-md5/dist/md5';

const md5Encode = (str: string) => {
    return new Md5().appendStr(str).end();
}

export const DoLogin = (username: string, originPassword: string) => {
    const password = md5Encode(originPassword);
    return axios.post('/user/login', {
            username,
            password,
        }
    )
}
export const DoRegister = (username: string, originPassword: string) => {
    const password = md5Encode(originPassword);
    return axios.post('/user/register', {
            username,
            password,
        }
    )
}