"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/components/Button";
import { useMutation } from "@tanstack/react-query";
import { createPostSchema } from "@/shared/validation/globalValidataion";
import { FeedService } from "../services/feed.service";
import toast from "react-hot-toast";

export default function CreatePostCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePost = async () => {
    const { success, data } = createPostSchema.safeParse({
      type: "POST",
      content,
      imageUrl: selectedImage,
      tags,
    });
    if (!success) {
      console.log(data);
      throw new Error("Validation failed");
    }
    mutate();
  };
  // mutate post creation logic here
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      FeedService.createPost({
        content,
        image: selectedImage,
        tags,
      }),
    onSuccess: (data) => {
      console.log("Post created:", data);
      toast.success("Post created successfully!");
      setContent("");
      setSelectedImage(null);
      setTags([]);
      setIsExpanded(false);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      <div className="p-4">
        {/* User Avatar & Input */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-bold text-lg">
            DC
          </div>

          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share something with the community..."
              className="w-full bg-transparent resize-none focus:outline-none placeholder-gray-600 text-white"
              rows={isExpanded ? 4 : 1}
            />
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              {/* Image Preview */}
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10"
                >
                  <Image
                    src={selectedImage}
                    alt="Upload preview"
                    fill
                    className="object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}

              {/* Tags */}
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs text-emerald-400 flex items-center gap-1"
                    >
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>

                {tags.length < 5 && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) =>
                        setTagInput(e.target.value.replace(/\s/g, ""))
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      placeholder="Add tag..."
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all placeholder-gray-600 text-sm"
                      maxLength={20}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTag}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all text-sm"
                    >
                      Add
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="dark"
                    onClick={() => {
                      setIsExpanded(false);
                      setContent("");
                      setSelectedImage(null);
                      setTags([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePost}
                    disabled={isPending || !content.trim()}
                  >
                    {isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
