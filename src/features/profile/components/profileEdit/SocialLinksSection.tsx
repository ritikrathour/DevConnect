"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Mail,
  Youtube,
  Link,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Button } from "@/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import toast from "react-hot-toast";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
interface ISocialLink {
  id: string;
  profileId: string;
  type: string;
  url: string;
}
const PLATFORM_OPTIONS = [
  {
    value: "GITHUB",
    label: "GitHub",
    icon: Github,
    color: "text-white",
    placeholder: "https://github.com/username",
  },
  {
    value: "TWITTER",
    label: "Twitter/X",
    icon: Twitter,
    color: "text-cyan-400",
    placeholder: "https://twitter.com/username",
  },
  {
    value: "LINKEDIN",
    label: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-400",
    placeholder: "https://linkedin.com/in/username",
  },
  {
    value: "WEBSITE",
    label: "Website",
    icon: Globe,
    color: "text-emerald-400",
    placeholder: "https://yourwebsite.com",
  },
  {
    value: "OTHER",
    label: "Other",
    icon: Mail,
    color: "text-yellow-400",
    placeholder: "other.com",
  },
];
export default function SocialLinksSection() {
  const queryClient = useQueryClient();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { mutate, data, error, isPending, isError } = useMutation({
    mutationFn: () =>
      profileService.AddSocialLinks({ type: selectedPlatform, url: newUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Added social links successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  const [socialLinks, setSocialLinks] = useState<any>(
    profile?.profile && profile?.profile?.socials,
  );
  const PLATFORM_UI_MAP: Record<
    string,
    { icon: any; label: string; color: string }
  > = {
    WEBSITE: {
      icon: Globe,
      label: "Portfolio Website",
      color: "bg-emerald-500/10 text-emerald-400",
    },
    GITHUB: {
      icon: Github,
      label: "GitHub",
      color: "bg-gray-500/10 text-gray-100",
    },
    TWITTER: {
      icon: Twitter,
      label: "Twitter",
      color: "bg-blue-400/10 text-blue-400",
    },
    LINKEDIN: {
      icon: Linkedin,
      label: "LinkedIn",
      color: "bg-blue-600/10 text-blue-600",
    },
    YOUTUBE: {
      icon: Youtube,
      label: "YouTube",
      color: "bg-red-500/10 text-red-500",
    },
    OTHER: {
      icon: Link,
      label: "Social Link",
      color: "bg-purple-500/10 text-purple-400",
    },
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    if (profile?.profile?.socials) {
      setSocialLinks(profile?.profile?.socials);
    }
  }, [profile]);

  const addSocialLink = () => {
    if (!selectedPlatform || !newUrl) return;
    mutate();
    if (!isPending) {
      setShowAddForm(false);
      setSelectedPlatform("");
      setNewUrl("");
    }
  };

  // const removeSocialLink = (id: string) => {
  //   setSocialLinks(socialLinks?.filter((link: any) => link.id !== id));
  // };

  const updateSocialLink = (id: string, url: string) => {
    setSocialLinks(
      socialLinks?.map((link: any) =>
        link.id === id ? { ...link, url } : link,
      ),
    );
  };

  const availablePlatforms = PLATFORM_OPTIONS.filter(
    (platform) =>
      !socialLinks?.some((link: any) => link.platform === platform.value),
  );

  console.log(data, "data");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Social Links</h2>
        {availablePlatforms.length > 0 && !showAddForm && (
          <Button
            className="font-semibold text-black"
            type="button"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        )}
      </div>

      {/* Existing Links */}
      <div className="space-y-4 mb-6">
        <AnimatePresence mode="popLayout">
          {socialLinks?.length ? (
            socialLinks?.map((link: ISocialLink) => {
              const uiConfig =
                PLATFORM_UI_MAP[link.type] || PLATFORM_UI_MAP.OTHER;
              const Icon = uiConfig.icon;
              return (
                <motion.div
                  key={link?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg group hover:bg-white/10 transition-all"
                >
                  <div
                    className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${uiConfig.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400 mb-1">
                      {
                        PLATFORM_OPTIONS.find((p) => p?.value === link?.type)
                          ?.label
                      }
                    </p>
                    <input
                      type="url"
                      value={link?.url}
                      onChange={(e) =>
                        updateSocialLink(link?.id, e.target.value)
                      }
                      className="w-full bg-transparent focus:outline-none text-white"
                    />
                  </div>
                  {/* <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeSocialLink(link?.id)}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </motion.button> */}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No social links added yet</p>
              <p className="text-sm mt-1">Click "Add Link" to get started</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add New Link Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/5 border border-emerald-500/30 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => {
                    setSelectedPlatform(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all"
                >
                  <option className=" text-black" value="">
                    Select a platform
                  </option>
                  {availablePlatforms.map((platform) => (
                    <option
                      className=" text-black"
                      key={platform.value}
                      value={platform.value}
                    >
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPlatform && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder={
                      PLATFORM_OPTIONS.find((p) => p.value === selectedPlatform)
                        ?.placeholder
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all placeholder-gray-600"
                  />
                </motion.div>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  className="flex-1 font-semibold"
                  disabled={!selectedPlatform || !newUrl || isPending}
                  onClick={addSocialLink}
                >
                  Add Link
                </Button>
                <Button
                  type="button"
                  variant="dark"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedPlatform("");
                    setNewUrl("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
