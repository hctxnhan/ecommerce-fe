import axios from 'axios';
import { getData } from '../utils/asyncStorage';
import { environment } from '../utils/env';

const axiosInstance = axios.create({
  baseURL: environment.API.BASE_URL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getData('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
