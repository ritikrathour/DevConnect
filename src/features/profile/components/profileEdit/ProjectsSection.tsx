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
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { Button } from "@/shared/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "../../services/profile.service";
import toast from "react-hot-toast";
import { authKeys } from "@/lib/tanstack/queryKeys/authKeys";
import { IProject } from "../../types";

export default function ProjectsSection() {
  const queryClient = useQueryClient();
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.profile,
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [formData, setFormData] = useState<IProject>({
    title: "",
    description: "",
    githubUrl: "",
    liveUrl: "",
    techStack: [] as string[],
    featured: false,
  });
  const [techInput, setTechInput] = useState("");

  // mutation function
  const { mutate, isPending } = useMutation({
    mutationFn: () => profileService.AddProject(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Project added successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  const { mutate: deleteProject, isPending: isDeletingProject } = useMutation({
    mutationFn: (projectId: string) => profileService.DeleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authKeys.user,
      });
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "error");
    },
  });
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      techStack: [],
      featured: false,
    });
    setTechInput("");
    setEditingProject(null);
    setShowAddForm(false);
  };

  const saveProject = () => {
    if (!formData.title || !formData.description) return;
    mutate();
    // if (editingProject) {
    //   setProjects(
    //     projects.map((p) =>
    //       p.id === editingProject ? { ...p, ...formData } : p,
    //     ),
    //   );
    // } else {
    //   const newProject = {
    //     id: Date.now().toString(),
    //     ...formData,
    //     isPinned: false,
    //   };
    //   setProjects([...projects, newProject]);
    // }
    resetForm();
  };

  const editProject = (project: IProject) => {
    setFormData({
      title: project.title,
      description: project.description,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      techStack: project.techStack,
      featured: project.featured,
    });
    setEditingProject(project?.id as string);
    setShowAddForm(true);
  };

  const togglePin = (id: string) => {};

  const addTechnology = () => {
    if (techInput && !formData.techStack.includes(techInput)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
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
          {profile?.profile &&
            profile?.profile?.projects?.map((project: any) => (
              <motion.div key={project.id}>
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
                        <h3 className="text-lg font-semibold">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <Pin className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <Button
                        type="button"
                        variant="dark"
                        onClick={() => togglePin(project.id)}
                        className={` w-8 h-8 ${
                          project.featured
                            ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                            : "bg-white/5 border-white/10 text-gray-400"
                        }`}
                      >
                        <Pin className="w-4 h-4" />
                      </Button>
                      {/*TODO  */}
                      {/* <Button
                        type="button"
                        variant="dark"
                        onClick={() => editProject(project)}
                        className={`w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30`}
                      >
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </Button> */}
                      <Button
                        type="button"
                        variant="dark"
                        onClick={() => deleteProject(project.id)}
                        className={`w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg`}
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project?.techStack?.map((tech: any) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/10 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats & Links */}
                  <div className="flex items-center justify-end text-sm">
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
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
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
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
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
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
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        githubUrl: e.target.value,
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
                    onKeyDown={(e) =>
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
                  {formData.techStack.map((tech) => (
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
                <Button
                  onClick={saveProject}
                  disabled={
                    !formData.title || !formData.description || isPending
                  }
                  type="button"
                  className="w-full"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </Button>
                <Button type="button" onClick={resetForm} variant="dark">
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {profile?.profile &&
        profile?.profile?.projects?.length === 0 &&
        !showAddForm && (
          <div className="text-center py-8 text-gray-500">
            <FolderGit2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No projects added yet</p>
            <p className="text-sm mt-1">
              Showcase your work by adding projects
            </p>
          </div>
        )}
    </motion.div>
  );
}

//  {projects.map((project) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               className="p-6 bg-white/5 border border-white/10 rounded-lg group hover:bg-white/10 transition-all"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h3 className="text-lg font-semibold">{project.title}</h3>
//                     {project.featured && (
//                       <Pin className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                     )}
//                   </div>
//                   <p className="text-gray-400 text-sm leading-relaxed">
//                     {project.description}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                   <Button
//                     type="button"
//                     variant="dark"
//                     onClick={() => togglePin(project.id as string)}
//                     className={` w-8 h-8 ${
//                       project.featured
//                         ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
//                         : "bg-white/5 border-white/10 text-gray-400"
//                     }`}
//                   >
//                     <Pin className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="dark"
//                     onClick={() => editProject(project)}
//                     className={`w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30`}
//                   >
//                     <Edit2 className="w-4 h-4 text-blue-400" />
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="dark"
//                     onClick={() => deleteProject(project.id as string)}
//                     className={`w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg`}
//                   >
//                     <X className="w-4 h-4 text-red-400" />
//                   </Button>
//                 </div>
//               </div>
//
//               {/* Technologies */}
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {project?.techStack?.map((tech) => (
//                   <span
//                     key={tech}
//                     className="px-2 py-1 bg-white/10 rounded text-xs"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//
//               {/* Stats & Links */}
//               <div className="flex items-center justify-end text-sm">
//                 <div className="flex gap-2">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       <span>Demo</span>
//                     </a>
//                   )}
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
//                     >
//                       <FolderGit2 className="w-4 h-4" />
//                       <span>Code</span>
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
