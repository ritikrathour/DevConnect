import NoData from "@/shared/components/NoData";
import { RootState } from "@/stores/store";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

interface IProject {
  id: string;
  title: string;
  description: string;
  isPrivate?: boolean;
  createdAt: string;
  techStack: string[];
  liveUrl?: string;
}

interface ProfileProjectsProps {
  showAll?: boolean;
}

export default function ProfileProjects({
  showAll = false,
}: ProfileProjectsProps) {
  const { profile } = useSelector((state: RootState) => state.profile);
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
        {profile?.profile?.projects &&
          profile?.profile?.projects?.map((project: IProject, index: any) => {
            return (
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
                        {project?.title}
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
                  <Link
                    href={project?.liveUrl || "#"}
                    className="ml-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {project?.techStack?.slice(0, 4)?.map((tech: any) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">
                    Created:{" "}
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </motion.div>
            );
          })}
      </div>
      {!profile?.profile?.projects?.length && <NoData />}
    </motion.div>
  );
}
