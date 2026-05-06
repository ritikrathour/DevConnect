import axiosInstance from "@/lib/axios.service";
export const FeedService = {
  createPost: async (postData: {
    content: string;
    image?: string | null;
    tags: string[];
  }) => {
    try {
      const response = await axiosInstance.post("/feed/post", {
        ...postData,
      });
      return response.data.post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },
};
