"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Button } from "@/shared/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import toast from "react-hot-toast";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";

export default function BioSection() {
  const MAX_LENGTH = 500;
  const queryClient = useQueryClient();
  const [bio, setBio] = useState("");
  const { profile } = useSelector((state: RootState) => state.profile);
  useEffect(() => {
    if (profile?.profile?.bio && bio === "") {
      setBio(profile?.profile?.bio);
    }
  }, [profile]);
  // update and add the bio function
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: () => profileService.updateBio(bio),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Basic details updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-cyan-400" />
        Bio
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Tell us about yourself
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= MAX_LENGTH) {
                setBio(e.target.value);
              }
            }}
            placeholder="Write a brief bio about yourself, your interests, and what you're working on..."
            rows={6}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600 resize-none"
          />
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gray-500">
              This will be displayed on your public profile
            </p>
            <p
              className={`text-xs ${
                bio.length > MAX_LENGTH * 0.9
                  ? "text-yellow-400"
                  : "text-gray-500"
              }`}
            >
              {bio.length}/{MAX_LENGTH}
            </p>
          </div>
        </div>

        {/* Quick Templates */}
        <div>
          <p className="text-sm font-medium mb-2 text-gray-400">
            Quick Templates
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "👨‍💻 Full-stack developer",
              "🚀 Building in public",
              "💡 MERN Stack Developer",
              "📚 Always learning",
              "🌍 Growth",
            ].map((template, index) => (
              <Button
                key={index}
                variant="glass"
                type="button"
                size="sm"
                className="text-[12px]"
                onClick={() => {
                  const newBio = bio ? `${bio}\n${template}` : template;
                  if (newBio.length <= MAX_LENGTH) {
                    setBio(newBio);
                  }
                }}
              >
                {template}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-self-end mt-2">
          <Button disabled={isPending} type="button" onClick={() => mutate()}>
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
