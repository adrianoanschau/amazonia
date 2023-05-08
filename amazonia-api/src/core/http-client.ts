import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  get(url: string, config?: AxiosRequestConfig<any> | undefined) {
    return this.axiosInstance.get(url, config);
  }
}
