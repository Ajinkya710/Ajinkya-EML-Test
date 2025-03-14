import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleRequestError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.error("HTTP request failed:", error.message);
    throw error.response ? error.response.data : error.message;
  } else {
    console.error("Unexpected error:", error);
    throw error;
  }
};

export const $get = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const $delete = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, { params });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export const $post = async (
  url: string,
  data: { username: string; password: string }
) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const $put = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};
