"use client";

import { motion } from "framer-motion";
import { LayoutGrid, FolderGit2, Activity, Database } from "lucide-react";
import { TabType } from "../types";
interface Tab {
  id: TabType;
  label: string;
  icon: typeof LayoutGrid;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "repositories", label: "Repositories", icon: Database },
];

interface ProfileTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}: ProfileTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-8 border-b border-white/10"
    >
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400 to-cyan-400"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
