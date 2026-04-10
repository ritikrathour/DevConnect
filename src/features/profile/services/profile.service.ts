import axiosInstance from "@/lib/axios.service";

export const profileService = {
  getProfile: async () => {
    try {
      const data = await axiosInstance.get(`/profile`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
