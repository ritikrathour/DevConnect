"use client";

import NoData from "@/shared/components/NoData";
import { RootState } from "@/stores/store";
import { motion } from "framer-motion";
import { Star, GitFork, Circle, ExternalLink } from "lucide-react";
import { useSelector } from "react-redux";

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  isPrivate: boolean;
  updatedAt: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "awesome-nextjs-starter",
    description:
      "A production-ready Next.js starter template with TypeScript, Tailwind CSS, and best practices built-in.",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 1234,
    forks: 89,
    isPrivate: false,
    updatedAt: "2 days ago",
  },
  {
    id: "2",
    name: "react-dashboard-ui",
    description:
      "Modern dashboard UI components built with React and Framer Motion for beautiful animations.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 567,
    forks: 45,
    isPrivate: false,
    updatedAt: "5 days ago",
  },
  {
    id: "3",
    name: "api-gateway-service",
    description:
      "Microservices API gateway with rate limiting, authentication, and request routing.",
    language: "Go",
    languageColor: "#00add8",
    stars: 890,
    forks: 67,
    isPrivate: true,
    updatedAt: "1 week ago",
  },
  {
    id: "4",
    name: "ml-model-trainer",
    description:
      "Python toolkit for training and deploying machine learning models with TensorFlow and PyTorch.",
    language: "Python",
    languageColor: "#3572a5",
    stars: 2341,
    forks: 234,
    isPrivate: false,
    updatedAt: "2 weeks ago",
  },
];

interface ProfileProjectsProps {
  showAll?: boolean;
}

export default function ProfileProjects({
  showAll = false,
}: ProfileProjectsProps) {
  const { profile } = useSelector((state: RootState) => state.profile);
  console.log(profile?.skills);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        {!showAll && (
          <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View all →
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile?.project &&
          profile?.project?.map((project: any, index: any) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              className="group p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {project.name}
                    </h3>
                    {project.isPrivate && (
                      <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Circle
                      className="w-3 h-3"
                      style={{
                        fill: project.languageColor,
                        color: project.languageColor,
                      }}
                    />
                    <span className="text-gray-400">{project.language}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                </div>
                <span className="text-gray-500 text-xs">
                  Updated {project.updatedAt}
                </span>
              </div>
            </motion.div>
          ))}
      </div>
      {!profile?.project && <NoData />}
    </motion.div>
  );
}
