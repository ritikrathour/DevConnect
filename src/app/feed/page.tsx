"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import FeedFilters from "@/features/feed/components/FeedFilters";
import FeedCard from "@/features/feed/components/FeedCard";
import TrendingTopics from "@/features/feed/components/TrendingTopics";
import CreatePostCard from "@/features/feed/components/CreatPostCard";
import FeedSkeleton from "@/features/feed/components/FeedSkeleton";
import SuggestedUsers from "@/features/feed/components/SuggestedUser";

export type FeedFilter = "latest" | "trending" | "following";

interface FeedItem {
  id: string;
  type: "project" | "achievement" | "activity" | "post";
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    verified: boolean;
  };
  content: any;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("latest");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch feed data
  const fetchFeed = useCallback(async (pageNum: number, filter: FeedFilter) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: FeedItem[] = Array.from({ length: 10 }, (_, i) => ({
        id: `${pageNum}-${i}`,
        type: ["project", "achievement", "activity", "post"][
          Math.floor(Math.random() * 4)
        ] as any,
        user: {
          id: `user-${i}`,
          username: `developer${i}`,
          displayName: `Developer ${i}`,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
          verified: Math.random() > 0.7,
        },
        content: {
          title: "Built an amazing AI-powered app",
          description:
            "Just launched my new AI-powered app that helps developers write better code!",
          image: Math.random() > 0.5 ? "https://picsum.photos/800/400" : null,
          tags: ["AI", "React", "Next.js"],
          url: "https://example.com",
        },
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        isLiked: Math.random() > 0.5,
        isBookmarked: Math.random() > 0.8,
      }));

      if (pageNum === 1) {
        setFeedItems(mockData);
      } else {
        setFeedItems((prev) => [...prev, ...mockData]);
      }

      setHasMore(pageNum < 5);
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed(1, activeFilter);
  }, [activeFilter, fetchFeed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (page > 1) {
      fetchFeed(page, activeFilter);
    }
  }, [page, activeFilter, fetchFeed]);

  const handleFilterChange = (filter: FeedFilter) => {
    setActiveFilter(filter);
    setPage(1);
    setFeedItems([]);
    setHasMore(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#00ff9533 1px, transparent 1px), linear-gradient(90deg, #00ff9533 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <div className="fixed top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <FeedFilters
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
              <TrendingTopics />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="lg:hidden">
                <FeedFilters
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
              </div>

              <CreatePostCard />

              {isInitialLoad ? (
                <FeedSkeleton count={3} />
              ) : (
                <AnimatePresence mode="popLayout">
                  {feedItems.map((item, index) => (
                    <FeedCard key={item.id} item={item} index={index} />
                  ))}
                </AnimatePresence>
              )}

              {isLoading && !isInitialLoad && (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div ref={observerTarget} className="h-4" />

              {!hasMore && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 text-gray-500"
                >
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>You've reached the end!</p>
                </motion.div>
              )}
            </div>

            <div className="hidden lg:block lg:col-span-3">
              <SuggestedUsers />
            </div>
          </div>
        </div>
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
    </motion.div>
  );
}
