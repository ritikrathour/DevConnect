"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, AtSign } from "lucide-react";
import Input from "@/shared/components/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Button } from "@/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import toast from "react-hot-toast";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";

export default function BasicInfoSection() {
  const queryClient = useQueryClient();
  const { profile } = useSelector((state: RootState) => state.profile);
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState("");
  useEffect(() => {
    if (profile?.username && username === "") {
      setUsername(profile?.username);
    }
  }, [profile]);
  // handle change username
  const handleUsernameChange = async (value: string) => {
    setUsername(value);
    // Validate format
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      setUsernameError("Username can only contain letters, numbers, - and _");
      return;
    }

    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }
    setUsernameError("");
  };
  // handle add or update username
  const { mutate, isPending } = useMutation({
    mutationFn: () => profileService.updateBasicInfo(username),
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
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 pb-4 backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-emerald-400" />
        Basic Information
      </h2>

      <div className="space-y-6">
        {/* Username */}
        <Input
          name="userName"
          label="Username"
          onchange={(e: any) => handleUsernameChange(e?.target?.value)}
          type="text"
          icon={<AtSign className="w-4 h-4" />}
          value={username}
          error={usernameError}
        />
        {/* Email (Read-only) */}
        <Input
          name="email"
          label="Email Address"
          onchange={(e) => handleUsernameChange(e.target.value)}
          type="email"
          value={profile?.email}
          clasName="opacity-50 cursor-not-allowed"
        />
      </div>
      <div className="flex justify-self-end mt-2">
        <Button disabled={isPending} type="button" onClick={() => mutate()}>
          Save
        </Button>
      </div>
    </motion.div>
  );
}
