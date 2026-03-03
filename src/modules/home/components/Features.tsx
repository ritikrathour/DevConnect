"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Users,
  Zap,
  Shield,
  GitBranch,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const features: Feature[] = [
  {
    icon: Code2,
    title: "Real-time Code Collaboration",
    description:
      "Work together on code in real-time with live cursor tracking, syntax highlighting, and instant updates.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Global Developer Network",
    description:
      "Connect with talented developers worldwide, join teams, and build meaningful professional relationships.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Optimized infrastructure ensures your projects load instantly and run smoothly, no matter the scale.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Bank-level encryption, 2FA, and advanced access controls keep your code and data completely secure.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: GitBranch,
    title: "Seamless Git Integration",
    description:
      "Native GitHub, GitLab, and Bitbucket integration with automatic syncing and conflict resolution.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    icon: MessageSquare,
    title: "Built-in Communication",
    description:
      "Chat, voice, and video calls integrated directly into your workflow. No context switching needed.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background linear */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-transparent" />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full"
          >
            <span className="text-sm text-emerald-400 font-semibold">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
              Build Amazing Projects
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From idea to deployment, devConnect provides all the tools and
            features you need to collaborate effectively and ship faster.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                // variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`group p-8 bg-white/5 border ${feature.borderColor} rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all`}
              >
                <div
                  className={`w-14 h-14 ${feature.bgColor} border ${feature.borderColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className={`mt-6 h-1 bg-linear-to-r from-${feature.color.replace("text-", "")} to-transparent rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
