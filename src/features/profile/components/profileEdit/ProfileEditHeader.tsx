"use client";

import { Button } from "@/shared/components/Button";
import { motion } from "framer-motion";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";

interface ProfileEditHeaderProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  hasChanges: boolean;
}

export default function ProfileEditHeader({
  onSave,
  onCancel,
  isSaving,
  hasChanges,
}: ProfileEditHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Button type="button" className="w-10 h-10" variant="dark">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="md:text-3xl text-lg font-bold">Edit Profile</h1>
          <p className="text-gray-400 text-[12px] md:text-sm mt-1">
            Update your information and showcase your work
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="button" variant="dark" onClick={onCancel}>
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Cancel</span>
        </Button>
        <Button
          type="button"
          onClick={onSave}
          disabled={isSaving || !hasChanges}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isSaving ? "Saving..." : "Save Changes"}
          </span>
        </Button>
      </div>
    </motion.div>
  );
}
