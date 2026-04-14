"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Plus,
  X,
  Star,
  GitFork,
  ExternalLink,
  Edit2,
  Pin,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  repositoryUrl: string;
  technologies: string[];
  isPinned: boolean;
  stars: number;
  forks: number;
}

interface ProjectsSectionProps {
  onChange: () => void;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "awesome-nextjs-starter",
      description:
        "A production-ready Next.js starter template with TypeScript and Tailwind CSS",
      url: "https://demo.com",
      repositoryUrl: "https://github.com/user/awesome-nextjs-starter",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      isPinned: true,
      stars: 1234,
      forks: 89,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    repositoryUrl: "",
    technologies: [] as string[],
  });

  const [techInput, setTechInput] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      url: "",
      repositoryUrl: "",
      technologies: [],
    });
    setTechInput("");
    setEditingProject(null);
    setShowAddForm(false);
  };

  const saveProject = () => {
    if (!formData.name || !formData.description) return;

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject ? { ...p, ...formData } : p,
        ),
      );
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
        isPinned: false,
        stars: 0,
        forks: 0,
      };
      setProjects([...projects, newProject]);
    }

    resetForm();
  };

  const editProject = (project: Project) => {
    setFormData({
      name: project.name,
      description: project.description,
      url: project.url,
      repositoryUrl: project.repositoryUrl,
      technologies: project.technologies,
    });
    setEditingProject(project.id);
    setShowAddForm(true);
  };

  const deleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const togglePin = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p)),
    );
  };

  const addTechnology = () => {
    if (techInput && !formData.technologies.includes(techInput)) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 text-cyan-400" />
          Projects
        </h2>
        {!showAddForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </motion.button>
        )}
      </div>

      {/* Projects List */}
      <div className="space-y-4 mb-6">
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 bg-white/5 border border-white/10 rounded-lg group hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    {project.isPinned && (
                      <Pin className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePin(project.id)}
                    className={`w-8 h-8 ${
                      project.isPinned
                        ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                        : "bg-white/5 border-white/10 text-gray-400"
                    } border rounded-lg flex items-center justify-center transition-all`}
                  >
                    <Pin className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => editProject(project)}
                    className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Edit2 className="w-4 h-4 text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteProject(project.id)}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </motion.button>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/10 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats & Links */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Project Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white/5 border border-cyan-500/30 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>

              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="my-awesome-project"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of your project..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600 resize-none"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://demo.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repositoryUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        repositoryUrl: e.target.value,
                      })
                    }
                    placeholder="https://github.com/user/repo"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTechnology())
                    }
                    placeholder="Add technology..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 transition-all placeholder-gray-600"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addTechnology}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProject}
                  disabled={!formData.name || !formData.description}
                  className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {projects.length === 0 && !showAddForm && (
        <div className="text-center py-8 text-gray-500">
          <FolderGit2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No projects added yet</p>
          <p className="text-sm mt-1">Showcase your work by adding projects</p>
        </div>
      )}
    </motion.div>
  );
}
