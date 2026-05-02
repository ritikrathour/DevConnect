"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  verified: boolean;
  followers: number;
  isFollowing: boolean;
}

const suggestedUsers: User[] = [
  {
    id: "1",
    username: "sarah_dev",
    displayName: "Sarah Johnson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Full-stack developer | Open source contributor",
    verified: true,
    followers: 12500,
    isFollowing: false,
  },
  {
    id: "2",
    username: "alex_tech",
    displayName: "Alex Chen",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Building AI-powered tools",
    verified: false,
    followers: 8300,
    isFollowing: false,
  },
  {
    id: "3",
    username: "emma_codes",
    displayName: "Emma Wilson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    bio: "Frontend engineer @ TechCorp",
    verified: true,
    followers: 15200,
    isFollowing: false,
  },
  {
    id: "4",
    username: "mike_builds",
    displayName: "Mike Anderson",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    bio: "Cloud architect | AWS certified",
    verified: false,
    followers: 6700,
    isFollowing: false,
  },
  {
    id: "5",
    username: "lisa_design",
    displayName: "Lisa Martinez",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    bio: "UI/UX designer who codes",
    verified: true,
    followers: 9400,
    isFollowing: false,
  },
];

export default function SuggestedUsers() {
  const [users, setUsers] = useState(suggestedUsers);

  const handleFollow = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !user.isFollowing,
              followers: user.isFollowing
                ? user.followers - 1
                : user.followers + 1,
            }
          : user,
      ),
    );
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm sticky top-24"
    >
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold">Suggested for you</h3>
        <p className="text-sm text-gray-500 mt-1">Developers you might know</p>
      </div>

      <div className="divide-y divide-white/10">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="p-4 hover:bg-white/5 transition-all"
          >
            <div className="flex items-start gap-3">
              <Link href={`/profile/${user.username}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white/10"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.displayName}
                    className="object-cover"
                  />
                </motion.div>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-0.5">
                  <Link href={`/profile/${user.username}`}>
                    <h4 className="font-semibold text-sm hover:text-emerald-400 transition-colors truncate">
                      {user.displayName}
                    </h4>
                  </Link>
                  {user.verified && (
                    <Verified className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1">@{user.username}</p>
                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                  {user.bio}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFollowers(user.followers)} followers
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFollow(user.id)}
              className={`w-full mt-3 px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                user.isFollowing
                  ? "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black"
              }`}
            >
              {user.isFollowing ? (
                "Following"
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <UserPlus className="w-4 h-4" />
                  Follow
                </span>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <Link href="/explore">
        <motion.div
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          className="p-4 text-center border-t border-white/10 cursor-pointer transition-all"
        >
          <span className="text-sm text-emerald-400 font-medium">
            Show more
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
