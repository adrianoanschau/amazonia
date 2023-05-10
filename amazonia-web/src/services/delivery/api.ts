import axios, { AxiosInstance } from 'axios';

export type DeliveryTimeQueryData = {
  start_on: string;
  object_location: string;
  delivery_on: string;
};

export type AppInfo = {
  name: string;
  version: string;
};

export type DeliveryTimeData = {
  path: string[];
  cost: number;
};

class DeliveryApi {
  #axiosInstance: AxiosInstance;

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_DELIVERY_API,
    });
  }

  getAppInfo() {
    return this.#axiosInstance.get<AppInfo>('/');
  }

  getDeliveryTime(params: DeliveryTimeQueryData) {
    return this.#axiosInstance.get<DeliveryTimeData>('/delivery-time', {
      params,
    });
  }
}

export const api = new DeliveryApi();
