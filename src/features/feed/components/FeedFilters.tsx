"use client";

import { FeedFilter } from "@/app/feed/page";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Users } from "lucide-react";

interface FeedFiltersProps {
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
}

const filters = [
  { id: "latest" as FeedFilter, label: "Latest", icon: Clock },
  { id: "trending" as FeedFilter, label: "Trending", icon: TrendingUp },
  { id: "following" as FeedFilter, label: "Following", icon: Users },
];

export default function FeedFilters({
  activeFilter,
  onFilterChange,
}: FeedFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
    >
      <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">Feed</h3>
      <div className="space-y-1">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;

          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange(filter.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30"
                  : "hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-emerald-400" : "text-gray-500"}`}
              />
              <span
                className={`font-medium ${isActive ? "text-white" : "text-gray-400"}`}
              >
                {filter.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
