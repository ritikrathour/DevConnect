import axiosInstance from "./axios.service";

export const authService = {
  me: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },
};
