"use client";

import ProfileActivity from "@/features/profile/components/ProfileActivity";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileProjects from "@/features/profile/components/ProfileProject";
import ProfileSkills from "@/features/profile/components/ProfileSkills";
import ProfileStats from "@/features/profile/components/ProfileStats";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import { motion } from "framer-motion";
// import ProfileActivity from '@/components/profile/ProfileActivity';
// import ProfileProjects from '@/components/profile/ProfileProjects';
// import ProfileSkills from '@/components/profile/ProfileSkills';
import { useState } from "react";

export type TabType = "overview" | "projects" | "activity" | "repositories";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <motion.main
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

      <div className="relative container mx-auto px-4 py-8">
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <ProfileProjects />
              <ProfileActivity />
            </div>
            <div>
              <ProfileSkills />
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="mt-8">
            <ProfileProjects showAll />
          </div>
        )}

        {activeTab === "activity" && (
          <div className="mt-8">
            <ProfileActivity showAll />
          </div>
        )}

        {activeTab === "repositories" && (
          <div className="mt-8">
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">Repository view coming soon...</p>
            </div>
          </div>
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
    </motion.main>
  );
}
