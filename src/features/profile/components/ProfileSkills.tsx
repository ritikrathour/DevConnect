"use client";
import { RootState } from "@/stores/store";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Server, Cloud } from "lucide-react";
import { useSelector } from "react-redux";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  icon: typeof Code2;
  title: string;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    title: "Languages",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    skills: [
      { name: "TypeScript", level: 95, category: "language" },
      { name: "JavaScript", level: 98, category: "language" },
      { name: "Python", level: 85, category: "language" },
      { name: "Go", level: 75, category: "language" },
    ],
  },
  {
    icon: Layout,
    title: "Frontend",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    skills: [
      { name: "React", level: 95, category: "frontend" },
      { name: "Next.js", level: 90, category: "frontend" },
      { name: "Tailwind CSS", level: 92, category: "frontend" },
      { name: "Framer Motion", level: 85, category: "frontend" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    skills: [
      { name: "Node.js", level: 90, category: "backend" },
      { name: "Express", level: 88, category: "backend" },
      { name: "PostgreSQL", level: 85, category: "backend" },
      { name: "MongoDB", level: 80, category: "backend" },
    ],
  },
];

const additionalSkills = [
  { name: "Docker", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "Git", icon: Code2 },
  { name: "CI/CD", icon: Server },
  { name: "GraphQL", icon: Database },
  { name: "REST APIs", icon: Server },
];

export default function ProfileSkills() {
  const { profile } = useSelector((state: RootState) => state.profile);
  console.log(profile);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold">Skills & Technologies</h2>
      {skillCategories.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + categoryIndex * 0.1, duration: 0.5 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 ${category.bgColor} rounded-lg flex items-center justify-center`}
              >
                <Icon className={`w-5 h-5 ${category.color}`} />
              </div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">{skill.name}</span>
                    <span className="text-xs text-gray-500">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`h-full bg-linear-to-r ${
                        category.title === "Languages"
                          ? "from-emerald-500 to-emerald-400"
                          : category.title === "Frontend"
                            ? "from-cyan-500 to-cyan-400"
                            : "from-blue-500 to-blue-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Additional Skills</h3>
        <div className="flex flex-wrap gap-2">
          {additionalSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-default"
              >
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm text-gray-300">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
