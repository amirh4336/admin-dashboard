import axios, { AxiosRequestHeaders } from "axios";

const BASE_URL = "https://react-mini-projects-api.classbon.com";

const httpService = axios.create({
  baseURL: BASE_URL,
});

const httpInterceptedService = axios.create({
  baseURL: BASE_URL,
});

httpInterceptedService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      } as unknown as AxiosRequestHeaders; // Explicitly type config.headers as AxiosRequestHeaders
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpInterceptedService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { httpService, httpInterceptedService };
