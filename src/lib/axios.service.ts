import axios, { AxiosError } from "axios";
const isProduction =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;
const axiosInstance = axios.create({
  baseURL: isProduction,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If refresh API fails → stop loop
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${isProduction}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        // retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh token also expired
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
