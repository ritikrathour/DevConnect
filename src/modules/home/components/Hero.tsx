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
        className="relative z-10 container mx-auto px-4 py-8 text-center"
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
            {/* <motion.button
              className="group px-8 py-4 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button> */}
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
            <motion.button
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 text-white font-semibold rounded-lg transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          //   variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            "Real-time Collaboration",
            "Code Sharing",
            "Project Management",
            "Community Driven",
          ].map((feature, index) => (
            <motion.div
              key={feature}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(52, 211, 153, 0.5)",
              }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-emerald-400/30 rounded-full flex justify-center p-1"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(80px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
