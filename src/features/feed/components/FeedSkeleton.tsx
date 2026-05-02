"use client";

import { motion } from "framer-motion";

interface FeedSkeletonProps {
  count?: number;
}

export default function FeedSkeleton({ count = 3 }: FeedSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-1/4 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-1/6 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-2/3 animate-pulse" />
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
            <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
          </div>

          {/* Image placeholder (random) */}
          {index % 2 === 0 && (
            <div className="w-full h-64 bg-white/10 rounded-xl mb-4 animate-pulse" />
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
            <div className="h-8 w-16 bg-white/10 rounded animate-pulse" />
            <div className="ml-auto h-8 w-8 bg-white/10 rounded animate-pulse" />
          </div>
        </motion.div>
      ))}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
