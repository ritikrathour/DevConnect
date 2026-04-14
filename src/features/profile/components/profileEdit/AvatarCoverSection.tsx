"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function AvatarCoverSection() {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to S3/CloudFlare R2
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/upload/avatar', {
      //   method: 'POST',
      //   body: formData,
      // });
    } catch (error) {
      console.error("Avatar upload failed:", error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to S3/CloudFlare R2
    } catch (error) {
      console.error("Cover upload failed:", error);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
  };

  const removeCover = () => {
    setCoverUrl(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
    >
      {/* Cover Image */}
      <div className="relative h-64 bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20">
        {coverUrl ? (
          <div className="w-full overflow-hidden h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center text-6xl font-bold">
            <img src={profile?.coverImage} alt={profile?.id} />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #00ff9533 25%, transparent 25%),
                  linear-gradient(-45deg, #00ff9533 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #00ff9533 75%),
                  linear-gradient(-45deg, transparent 75%, #00ff9533 75%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            />
          </div>
        )}

        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            type="button"
            variant="dark"
            onClick={() =>
              coverInputRef.current && coverInputRef.current?.click()
            }
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm">
              {isUploadingCover ? "Uploading..." : "Change Cover"}
            </span>
          </Button>
          {coverUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={removeCover}
              className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 border border-white/20 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
          className="hidden"
        />
      </div>

      {/* Avatar */}
      <div className="relative px-8 pb-8">
        <div className="relative -mt-20">
          <div className="relative inline-block">
            <div className="w-40 h-40 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 p-1">
              {avatarUrl || profile?.photoUrl ? (
                <div className="w-full overflow-hidden h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center text-6xl font-bold">
                  <img src={profile?.photoUrl} alt={profile?.username} />
                </div>
              ) : (
                <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center text-6xl font-bold">
                  RR
                </div>
              )}
            </div>

            {/* Avatar Upload Button */}
            <Button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute! bottom-2 right-2 w-10 h-10"
            >
              {isUploadingAvatar ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-black" />
              )}
            </Button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>

          {avatarUrl && (
            <Button
              type="button"
              onClick={removeAvatar}
              variant="dangerLight"
              className="border border-red-500/30!"
            >
              Remove Avatar
            </Button>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>• Recommended avatar size: 400x400px</p>
          <p>• Recommended cover size: 1500x500px</p>
          <p>• Maximum file size: 5MB</p>
        </div>
      </div>
    </motion.div>
  );
}
