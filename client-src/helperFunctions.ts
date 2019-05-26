import axios, { AxiosRequestConfig } from 'axios';


export async function postRequest(endPoints: string[], data?: any) {
    try {
        const url = endPoints.join('/');
        const config: AxiosRequestConfig = {
            url,
            method: 'POST',
            data,
        };
        const res = await axios.request(config);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}
