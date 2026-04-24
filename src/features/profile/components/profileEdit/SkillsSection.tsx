"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Plus, X, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
import toast from "react-hot-toast";

interface Skill {
  id: string;
  name: string;
  proficiency: number;
  category: string;
}

const SKILL_CATEGORIES = ["Language", "Frontend", "Backend", "Database"];

const POPULAR_SKILLS = [
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "Backend" },
];

export default function SkillsSection() {
  const queryClient = useQueryClient();
  const { profile } = useSelector((state: RootState) => state.profile);
  console.log(profile?.profile, "skills");
  console.log(profile?.profile?.skills, "yeeel");

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "TypeScript", proficiency: 95, category: "Language" },
    { id: "2", name: "React", proficiency: 90, category: "Framework" },
    { id: "3", name: "Next.js", proficiency: 85, category: "Framework" },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: 50,
    category: "Language",
  });

  const filteredSuggestions = POPULAR_SKILLS.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !skills.some((s) => s.name.toLowerCase() === skill.name.toLowerCase()),
  );

  const addSkill = (skillData?: { name: string; category: string }) => {
    const skill: Skill = {
      id: Date.now().toString(),
      name: skillData?.name || newSkill.name,
      proficiency: newSkill.proficiency,
      category: skillData?.category || newSkill.category,
    };
    mutate();
    setSkills([...skills, skill]);
    setNewSkill({ name: "", proficiency: 50, category: "Language" });
    setSearchQuery("");
    setShowAddForm(false);
  };
  // handle add or update username
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      profileService.addSkills(newSkill.category, {
        name: searchQuery || newSkill.name,
        percentage: newSkill.proficiency,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Basic details updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  const removeSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const updateProficiency = (id: string, proficiency: number) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, proficiency } : skill,
      ),
    );
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency < 40) return "Beginner";
    if (proficiency < 70) return "Intermediate";
    if (proficiency < 90) return "Advanced";
    return "Expert";
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency < 40) return "from-yellow-500 to-orange-500";
    if (proficiency < 70) return "from-blue-500 to-cyan-500";
    if (proficiency < 90) return "from-emerald-500 to-green-500";
    return "from-purple-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code2 className="w-6 h-6 text-emerald-400" />
          Skills & Technologies
        </h2>
        {!showAddForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </motion.button>
        )}
      </div>

      {/* Skills List */}
      <div className="space-y-4 mb-6">
        <AnimatePresence mode="popLayout">
          {/* profile?.profile &&
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 bg-white/5 border border-white/10 rounded-lg group hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                    {skill.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {getProficiencyLabel(skill.proficiency)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeSkill(skill.id)}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.proficiency}
                  onChange={(e) =>
                    updateProficiency(skill.id, parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    className={`h-full bg-linear-to-r ${getProficiencyColor(skill.proficiency)}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span className="font-medium">{skill.proficiency}%</span>
                  <span>100%</span>
                </div>
              </div>
            </motion.div>
          ))} */}
          {profile?.profile &&
            profile.profile.skills &&
            profile.profile.skills?.map((skill: any, index: number) =>
              skill?.skills?.map((userSkill: any) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg group hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{userSkill.name}</h3>
                        <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">
                          {getProficiencyLabel(userSkill.percentage)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeSkill(userSkill.name)}
                          className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={userSkill.percentage}
                        onChange={(e) =>
                          updateProficiency(
                            userSkill.name,
                            parseInt(e.target.value),
                          )
                        }
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${userSkill.percentage}%` }}
                          className={`h-full bg-linear-to-r ${getProficiencyColor(userSkill.percentage)}`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span className="font-medium">
                          {userSkill.percentage}%
                        </span>
                        <span>100%</span>
                      </div>
                    </div>
                  </motion.div>
                );
              }),
            )}
        </AnimatePresence>
      </div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/5 border border-emerald-500/30 rounded-lg space-y-4">
              {/* Search/Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Skill Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery || newSkill.name}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setNewSkill({ ...newSkill, name: e.target.value });
                    }}
                    placeholder="Search or enter skill name..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all placeholder-gray-600"
                  />
                </div>

                {/* Suggestions */}
                {searchQuery && filteredSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 p-2 bg-white/10 border border-white/10 rounded-lg space-y-1"
                  >
                    {filteredSuggestions.slice(0, 5).map((suggestion) => (
                      <button
                        key={suggestion.name}
                        onClick={() => {
                          setNewSkill({
                            ...newSkill,
                            name: suggestion.name,
                            category: suggestion.category,
                          });
                          setSearchQuery("");
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-white/10 rounded transition-all text-sm"
                      >
                        <span className="font-medium">{suggestion.name}</span>
                        <span className="text-gray-500 text-xs ml-2">
                          ({suggestion.category})
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Category
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, category: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 transition-all"
                >
                  {SKILL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Proficiency */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Proficiency: {newSkill.proficiency}% (
                  {getProficiencyLabel(newSkill.proficiency)})
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.proficiency}
                  onChange={(e) =>
                    setNewSkill({
                      ...newSkill,
                      proficiency: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addSkill()}
                  disabled={!newSkill.name}
                  className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Skill
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddForm(false);
                    setNewSkill({
                      name: "",
                      proficiency: 50,
                      category: "Language",
                    });
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Add Popular Skills */}
      {/* {!showAddForm && skills.length < 5 && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">
            Quick add popular skills:
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.filter(
              (s) => !skills.some((skill) => skill.name === s.name),
            )
              .slice(0, 6)
              .map((skill) => (
                <motion.button
                  key={skill.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setNewSkill({
                      name: skill.name,
                      proficiency: 50,
                      category: skill.category,
                    });
                    addSkill(skill);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
                >
                  + {skill.name}
                </motion.button>
              ))}
          </div>
        </div>
      )} */}

      {profile?.profile?.skills &&
        profile?.profile?.skills?.skills?.length === 0 &&
        !showAddForm && (
          <div className="text-center py-8 text-gray-500">
            <Code2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No skills added yet</p>
            <p className="text-sm mt-1">
              Showcase your expertise by adding skills
            </p>
          </div>
        )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          cursor: pointer;
        }
      `}</style>
    </motion.div>
  );
}
