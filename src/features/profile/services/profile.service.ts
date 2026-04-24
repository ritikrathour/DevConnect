import axiosInstance from "@/lib/axios.service";
import { SocialLink } from "../types";

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
  updateBasicInfo: async (data: string) => {
    try {
      const response = await axiosInstance.put("/profile/basic", data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateBio: async (bio: string) => {
    try {
      const response = await axiosInstance.put("/profile/bio", bio);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateOrAddWebsite: async (webUrl: string) => {
    try {
      const response = await axiosInstance.post("/profile/website", {
        portfolio: webUrl,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  AddSocialLinks: async (socialLinks: { type: string; url: string }) => {
    try {
      const response = await axiosInstance.post("/profile/social", {
        type: socialLinks.type,
        url: socialLinks.url,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  // categoryName: string; skill: ISkill
  addSkills: async (
    categoryName: string,
    skill: {
      name: string;
      percentage: number;
    },
  ) => {
    try {
      const response = await axiosInstance.post("/profile/skills", {
        categoryName,
        skill,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
