"use client";

import { motion } from "framer-motion";
import {
  GitCommit,
  GitPullRequest,
  Star,
  MessageSquare,
  GitMerge,
} from "lucide-react";

interface Activity {
  id: string;
  type: "commit" | "pr" | "star" | "comment" | "merge";
  action: string;
  target: string;
  repository: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "commit",
    action: "Pushed 3 commits to",
    target: "main",
    repository: "awesome-nextjs-starter",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "pr",
    action: "Opened pull request in",
    target: "#234",
    repository: "react-dashboard-ui",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "star",
    action: "Starred",
    target: "",
    repository: "vercel/next.js",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "comment",
    action: "Commented on issue",
    target: "#145",
    repository: "api-gateway-service",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    type: "merge",
    action: "Merged pull request",
    target: "#223",
    repository: "ml-model-trainer",
    timestamp: "2 days ago",
  },
  {
    id: "6",
    type: "commit",
    action: "Pushed 5 commits to",
    target: "develop",
    repository: "awesome-nextjs-starter",
    timestamp: "3 days ago",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "commit":
      return GitCommit;
    case "pr":
      return GitPullRequest;
    case "star":
      return Star;
    case "comment":
      return MessageSquare;
    case "merge":
      return GitMerge;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "commit":
      return "text-emerald-400 bg-emerald-500/10";
    case "pr":
      return "text-cyan-400 bg-cyan-500/10";
    case "star":
      return "text-yellow-400 bg-yellow-500/10";
    case "comment":
      return "text-blue-400 bg-blue-500/10";
    case "merge":
      return "text-purple-400 bg-purple-500/10";
  }
};

interface ProfileActivityProps {
  showAll?: boolean;
}

export default function ProfileActivity({
  showAll = false,
}: ProfileActivityProps) {
  const displayActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        {!showAll && (
          <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View all →
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
              whileHover={{ x: 4 }}
              className="group flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-300 leading-relaxed">
                  {activity.action}{" "}
                  {activity.target && (
                    <span className="font-semibold text-white">
                      {activity.target}{" "}
                    </span>
                  )}
                  {activity.target && "in "}
                  <a
                    href="#"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {activity.repository}
                  </a>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Contribution Graph Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Contribution Activity</h3>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 365 }).map((_, i) => {
            const intensity = Math.floor(Math.random() * 5);
            const colors = [
              "bg-white/5",
              "bg-emerald-500/20",
              "bg-emerald-500/40",
              "bg-emerald-500/60",
              "bg-emerald-500/80",
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.001, duration: 0.2 }}
                whileHover={{ scale: 1.5 }}
                className={`aspect-square ${colors[intensity]} rounded-sm cursor-pointer`}
                title={`${intensity} contributions`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {[
              "bg-white/5",
              "bg-emerald-500/20",
              "bg-emerald-500/40",
              "bg-emerald-500/60",
              "bg-emerald-500/80",
            ].map((color, i) => (
              <div key={i} className={`w-3 h-3 ${color} rounded-sm`} />
            ))}
          </div>
          <span>More</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
