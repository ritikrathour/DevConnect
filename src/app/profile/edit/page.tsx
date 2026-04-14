"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProfileEditHeader from "@/features/profile/components/profileEdit/ProfileEditHeader";
import AvatarCoverSection from "@/features/profile/components/profileEdit/AvatarCoverSection";
import BasicInfoSection from "@/features/profile/components/profileEdit/BasicInfoSection";
import BioSection from "@/features/profile/components/profileEdit/BioSection";
import LocationWebsiteSection from "@/features/profile/components/profileEdit/LocationWebsiteSection";
import SocialLinksSection from "@/features/profile/components/profileEdit/SocialLinksSection";
import SkillsSection from "@/features/profile/components/profileEdit/SkillsSection";
import ProjectsSection from "@/features/profile/components/profileEdit/ProjectsSection";

export default function ProfileEditPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // API calls will be made from individual sections
      toast.success("Profile updated successfully!");
      setHasChanges(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        confirm("You have unsaved changes. Are you sure you want to leave?")
      ) {
        window.history.back();
      }
    } else {
      window.history.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#00ff9533 1px, transparent 1px),
              linear-gradient(90deg, #00ff9533 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        <ProfileEditHeader
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
          hasChanges={hasChanges}
        />

        <div className="space-y-6 mt-8">
          {/* Avatar & Cover Image */}
          <AvatarCoverSection />

          {/* Basic Info */}
          <BasicInfoSection />

          {/* Bio */}
          <BioSection />

          {/* Location & Website */}
          <LocationWebsiteSection />

          {/* Social Links */}
          <SocialLinksSection />

          {/* Skills */}
          <SkillsSection />

          {/* Projects */}
          <ProjectsSection />
        </div>

        {/* Floating Save Bar */}
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl border border-emerald-500/30 rounded-full shadow-2xl">
              <span className="text-sm text-gray-300">
                You have unsaved changes
              </span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
                >
                  Discard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg text-sm transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      `}</style>
    </motion.div>
  );
}
