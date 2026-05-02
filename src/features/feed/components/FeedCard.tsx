"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ExternalLink,
  Verified,
  Award,
  GitBranch,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeedCardProps {
  item: any;
  index: number;
}

export default function FeedCard({ item, index }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);
  const [likes, setLikes] = useState(item.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-400" />;
      case "project":
        return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case "activity":
        return <Zap className="w-4 h-4 text-cyan-400" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/[0.07] transition-all"
    >
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Link href={`/profile/${item.user.username}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white/10"
            >
              <img
                src={item.user.avatarUrl}
                alt={item.user.displayName}
                className="object-cover"
              />
            </motion.div>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${item.user.username}`}>
                <h3 className="font-semibold hover:text-emerald-400 transition-colors truncate">
                  {item.user.displayName}
                </h3>
              </Link>
              {item.user.verified && (
                <Verified className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              )}
              {getTypeIcon()}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>@{item.user.username}</span>
              <span>•</span>
              <span>{formatTime(item.timestamp)}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h4 className="text-lg font-semibold mb-2">{item.content.title}</h4>
        <p className="text-gray-400 leading-relaxed mb-3">
          {item.content.description}
        </p>

        {/* Tags */}
        {item.content.tags && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.content.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/10 rounded text-xs text-emerald-400 hover:bg-white/20 transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Image */}
        {item.content.image && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative w-full h-64 rounded-xl overflow-hidden border border-white/10 mb-3 cursor-pointer"
          >
            <img
              src={item.content.image}
              alt="Post image"
              className="object-cover"
            />
          </motion.div>
        )}

        {/* URL Preview */}
        {item.content.url && (
          <a
            href={item.content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
              <span className="text-gray-400 group-hover:text-emerald-400 transition-colors truncate">
                {item.content.url}
              </span>
            </div>
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isLiked
                ? "text-red-400 bg-red-500/10"
                : "text-gray-500 hover:bg-white/5"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-400" : ""}`} />
            <span className="text-sm font-medium">{likes}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-white/5 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{item.comments}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-white/5 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">{item.shares}</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBookmark}
          className={`p-2 rounded-lg transition-all ${
            isBookmarked
              ? "text-yellow-400 bg-yellow-500/10"
              : "text-gray-500 hover:bg-white/5"
          }`}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? "fill-yellow-400" : ""}`}
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
