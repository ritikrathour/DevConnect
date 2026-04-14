"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "@/shared/components/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Button } from "@/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import toast from "react-hot-toast";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";

export default function LocationWebsiteSection() {
  const query = useQueryClient();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [location, setLocation] = useState("India");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  useEffect(() => {
    if (profile?.profile?.portfolio && website === "") {
      setWebsite(profile?.profile && profile?.profile?.portfolio);
    }
  }, [profile]);
  const validateWebsite = (url: string) => {
    if (!url) {
      setWebsiteError("");
      return true;
    }
    try {
      new URL(url);
      setWebsiteError("");
      return true;
    } catch {
      setWebsiteError("Please enter a valid URL (e.g., https://example.com)");
      return false;
    }
  };

  const handleWebsiteChange = (value: string) => {
    setWebsite(value);
    validateWebsite(value);
  };
  // handle add or update website or portfolio
  const { mutate, isPending } = useMutation({
    mutationFn: () => profileService.updateOrAddWebsite(website),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Website successfully update or add!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold mb-6">Location & Website</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <Input
          label={"Location"}
          name="location"
          value={location}
          onchange={(e: any) => {
            setLocation(e.target.value);
          }}
          placeholder="City, Cuntry"
          type="text"
        />
        {/* Website */}
        <Input
          label={`Website / Portfolio`}
          name="Website"
          value={website}
          onchange={(e: any) => handleWebsiteChange(e.target.value)}
          placeholder="https://yourwebsite.com"
          type="text"
          error={websiteError}
        />
      </div>
      <div className="flex justify-self-end mt-2">
        <Button disabled={isPending} onClick={() => mutate()} type="button">
          Save
        </Button>
      </div>
    </motion.div>
  );
}
