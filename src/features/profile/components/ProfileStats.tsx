"use client";

import { RootState } from "@/stores/store";
import { motion } from "framer-motion";
import { Code2, Laptop2, Users2, TimerIcon } from "lucide-react";
import { useSelector } from "react-redux";

interface Stat {
  icon: typeof Code2;
  label: string;
  value: string;
  change: string;
  color: string;
  bgColor: string;
}

export default function ProfileStats() {
  const { profile } = useSelector((state: RootState) => state.profile);
  const stats: Stat[] = [
    {
      icon: Code2,
      label: "Total Projects",
      value: (profile?.project && profile?.project?.length) || 0,
      change: "+3 this month",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Laptop2,
      label: "Teck Stack Skills",
      value: (profile?.skills && profile?.skills?.length) || 0,
      change: "React, Node, MongoDB +9",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Users2,
      label: "Network Connections",
      value: profile?.followers || 0,
      change: "+89 this month",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TimerIcon,
      label: "Hours of experience",
      value: "3000+",
      change: "~ Full stack Developer",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];
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
