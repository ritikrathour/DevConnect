"use client";

import { Button } from "@/shared/components/Button";
import { RootState } from "@/stores/store";
import { motion } from "framer-motion";
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Settings,
  UserPlus,
} from "lucide-react";
import { useSelector } from "react-redux";
export default function ProfileHeader() {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Cover Image */}
      <div className="h-64 rounded-t-2xl bg-linear-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #00ff9533 25%, transparent 25%),
                linear-gradient(-45deg, #00ff9533 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #00ff9533 75%),
                linear-gradient(-45deg, transparent 75%, #00ff9533 75%)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="relative bg-white/5 border border-white/10 rounded-b-2xl backdrop-blur-sm p-8">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute -top-20 left-8"
        >
          <div className="relative">
            <div className="w-40 h-40 rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 p-1">
              <div className="w-full h-full rounded-2xl bg-[#0a0a0f] flex items-center justify-center text-6xl font-bold">
                <img src={profile?.photoUrl} alt={profile?.username} />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-[#0a0a0f]" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <Button type="button" variant="secondary">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Profile</span>
          </Button>
          <Button type="button">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Follow</span>
          </Button>
        </div>

        {/* Profile Info */}
        <div className="pt-16">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-bold mb-2 capitalize"
          >
            {profile?.username}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-400 mb-4"
          >
            {profile?.email}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-300 mb-6 max-w-2xl leading-relaxed"
          >
            {profile?.bio
              ? profile?.bio
              : "Full-stack developer passionate about building scalable applications and contributing to open source. Currently working on making the web more accessible and performant."}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>
                {profile?.location ? profile.location : "Lucknow UP, India"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-cyan-400" />
              <a
                href={profile?.social?.linkedInUrl}
                className="hover:text-cyan-400 transition-colors"
              >
                {profile?.social?.linkedInUrl
                  ? profile?.social?.linkedInUrl
                  : "ritikrathour024"}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>
                Joined{" "}
                {profile?.createdAt
                  ? new Date(profile?.createdAt)?.toDateString()
                  : "Joined March 2026"}
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.a
              href={profile?.social?.githubUrl}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </motion.a>
            <motion.a
              href={profile?.social?.twitterUrl}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </motion.a>
            <motion.a
              href={profile?.social?.linkedInUrl}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </motion.a>
            <motion.a
              href={profile?.email}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all group"
            >
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </motion.a>
          </motion.div>

          {/* Follower Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10"
          >
            <div>
              <span className="font-bold text-white">
                {profile?.followers?.length > 0
                  ? profile?.followers?.length
                  : 1234}
              </span>{" "}
              <span className="text-gray-400">followers</span>
            </div>
            <div>
              <span className="font-bold text-white">
                {profile?.following?.length > 0
                  ? profile?.following?.length
                  : 567}
              </span>{" "}
              <span className="text-gray-400">following</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
