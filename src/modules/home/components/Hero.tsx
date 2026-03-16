"use client";

import { Button } from "@/components/common/ui/Button";
import AnimateBackGrid from "@/components/design/AnimateBackGrid";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <AnimateBackGrid />
      </motion.div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-150 h-150 bg-emerald-500/20 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-cyan-500/20 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">
              Join 50,000+ developers worldwide
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Build the Future
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-400">
            Together
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          The ultimate platform for developers to collaborate on projects, share
          knowledge, and create innovative solutions that shape tomorrow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register">
            <Button
              iconPosition="right"
              icon={
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              }
            >
              Get Started Free
            </Button>
          </Link>

          <Link href="#features">
            <Button>Explore Features</Button>
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-4">
          {[
            "Real-time Collaboration",
            "Code Sharing",
            "Project Management",
            "Community Driven",
          ].map((feature) => (
            <div
              key={feature}
              className="px-4 py-2 sm:text-nowrap bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 backdrop-blur-sm"
            >
              {feature}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
