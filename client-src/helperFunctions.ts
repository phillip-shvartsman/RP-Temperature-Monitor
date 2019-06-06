import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function postRequest(endPoints: string[], data?: any): Promise<AxiosResponse<any>> {
    try {
        const url = endPoints.join('/');
        const config: AxiosRequestConfig = {
            data,
            method: 'POST',
            url,
        };
        const res = await axios.request(config);
        return res;
    } catch (err) {
        return Promise.reject(err);
    }
}

export function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 1.8) + 32;
}
