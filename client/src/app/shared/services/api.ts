import axios from "axios";
import { z } from "zod";

declare module "axios" {
  interface AxiosRequestConfig {
    attachToken?: boolean;
  }
}

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api`,
});

api.interceptors.request.use((config) => {
  config.attachToken = config.attachToken ?? true;
  config.withCredentials = true;

  const accessToken = getAccessToken();
  if (accessToken && config.attachToken) {
    config.headers["authorization"] = `Bearer ${getAccessToken()}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const accessToken = await refreshAccessToken();
        saveAccessToken(accessToken);
        return api(originalRequest);
      } catch (err) {
        console.error(err);
      }
    }
    return Promise.reject(error);
  }
);

// TODO: Move this to the auth service
async function refreshAccessToken(): Promise<string> {
  return api
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users/refresh`,
      {},
      {
        attachToken: false,
      }
    )
    .then((res) => {
      return z.string().parse(res.data);
    });
}

function getAccessToken() {
  return localStorage.getItem("accessToken") !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;
}

function saveAccessToken(token: string) {
  return localStorage.setItem("accessToken", token);
}
