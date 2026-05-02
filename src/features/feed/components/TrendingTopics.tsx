"use client";

import { motion } from "framer-motion";
import { TrendingUp, Hash } from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  name: string;
  posts: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
}

const trendingTopics: Topic[] = [
  {
    id: "1",
    name: "AI",
    posts: 12534,
    trend: "up",
    trendPercentage: 25,
  },
  {
    id: "2",
    name: "React",
    posts: 8923,
    trend: "up",
    trendPercentage: 12,
  },
  {
    id: "3",
    name: "NextJS",
    posts: 7456,
    trend: "up",
    trendPercentage: 18,
  },
  {
    id: "4",
    name: "TypeScript",
    posts: 6789,
    trend: "stable",
    trendPercentage: 3,
  },
  {
    id: "5",
    name: "DevOps",
    posts: 5432,
    trend: "up",
    trendPercentage: 9,
  },
  {
    id: "6",
    name: "Python",
    posts: 4321,
    trend: "stable",
    trendPercentage: 2,
  },
];

export default function TrendingTopics() {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm sticky top-24"
    >
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold">Trending Topics</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">Popular in devConnect</p>
      </div>

      <div className="divide-y divide-white/10">
        {trendingTopics.map((topic, index) => (
          <Link key={topic.id} href={`/topics/${topic.name.toLowerCase()}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="p-4 cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <Hash className="w-4 h-4 text-emerald-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                      {topic.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatNumber(topic.posts)} posts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {topic.trend === "up" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-emerald-400"
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{topic.trendPercentage}%</span>
                    </motion.div>
                  )}
                  {topic.trend === "stable" && (
                    <div className="px-2 py-0.5 bg-gray-500/10 border border-gray-500/30 rounded text-xs text-gray-400">
                      {topic.trendPercentage}%
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min((topic.posts / 15000) * 100, 100)}%`,
                  }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <Link href="/explore/topics">
        <motion.div
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          className="p-4 text-center border-t border-white/10 cursor-pointer transition-all"
        >
          <span className="text-sm text-emerald-400 font-medium">
            Explore all topics
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
