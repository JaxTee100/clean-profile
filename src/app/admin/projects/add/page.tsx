"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner"

export default function CreateProjectPage() {
  const { createProject, isLoading,  error} = useProjectStore();

  const [formData, setFormData] = useState({
    project_name: "",
    category: "",
    description: "",
    technologies: "",
    link: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
    };

    const createdProject = await createProject(payload);



    if (createdProject) {
      setFormData({
        project_name: "",
        description: "",
        technologies: "",
        link: "",
        category: ""
      });

      toast.success("Project created successfully");
      router.push("/admin/projects/list");
    }
    } catch (error) {
      console.log("Failed to create project:", error);
      toast.error("Failed to create project");
    }

    



  };

  return (
    <main className="min-h-screen px-4 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Create New Project</h1>
      {error && <p className="text-red-500 ">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium">Project Name</label>
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Technologies (comma-separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="e.g. React, TailwindCSS, Node.js"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>


      </form>
    </main>
  );
}
