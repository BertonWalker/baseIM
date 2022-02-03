import axios from '@/plugins/axios';
// import Vue from 'vue';

export const DoLogin = (username: string, password: string) => {
    console.log(username);
    // @ts-ignore
    return axios.post('/user/login', {
            username,
            password,
        }
    )
}
export const DoRegister = (username: string, password: string) => {
    console.log(username);
    // @ts-ignore
    return axios.post('/user/register', {
            username,
            password,
        }
    )
}