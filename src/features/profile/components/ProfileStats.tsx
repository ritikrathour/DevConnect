"use client";

import { motion } from "framer-motion";
import { Code2, GitBranch, Star, Award } from "lucide-react";

interface Stat {
  icon: typeof Code2;
  label: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
}

const stats: Stat[] = [
  {
    icon: Code2,
    label: "Total Projects",
    value: "24",
    change: "+3 this month",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: GitBranch,
    label: "Contributions",
    value: "1,847",
    change: "+156 this week",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Star,
    label: "Total Stars",
    value: "3,421",
    change: "+89 this month",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Award,
    label: "Achievements",
    value: "12",
    change: "2 new badges",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

export default function ProfileStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
            <div className={`text-xs ${stat.color} font-medium`}>
              {stat.change}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
