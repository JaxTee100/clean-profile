"use client";

import { useProjectStore } from "@/store/useProjectStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditProjectDetails({ projectId }: { projectId: string }) {
    const {
        isLoading,
        updateProject,
        getProjectById,
        successMessage
    } = useProjectStore();
    const router = useRouter();

    const [formData, setFormData] = useState({
        project_name: "",
        category: "",
        description: "",
        technologies: "",
        link: "",
    });

    useEffect(() => {
        const loadProjects = async () => {
            if (!projectId) {
                toast.error("Invalid house ID");
                router.push('/house/list');
                return;
            }
            try {
                const project = await getProjectById(projectId);
                console.log("Loaded project:", project);
                if (!project) {
                    toast.error("Project not found");
                    router.push('/admin/projects/list');
                    return;
                }
                setFormData({
                    project_name: project.project_name || "",
                    category: project.category || "",
                    description: project.description || "",
                    technologies: project.technologies ? project.technologies.join(", ") : "",
                    link: project.link || "",
                });
            } catch (error) {
                console.error("Failed to load project:", error);
                toast.error("Failed to load project");
                router.push('/admin/projects/list');
            }
        }
        loadProjects();
    }, [projectId, getProjectById, router]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    interface FormData {
        project_name: string;
        category: string;
        description: string;
        technologies: string;
        link: string;
    }

    interface SubmitEvent extends React.FormEvent<HTMLFormElement> { }

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        try {
             const payload = {
            ...formData,
            technologies: formData.technologies.split(",").map((t) => t.trim()),
        };

        const updatedProject = await updateProject(projectId, payload);

        if (updatedProject) {
            toast.success(successMessage || "Project updated successfully");
            router.push("/admin/projects/list");
        }
        } catch (error) {
            console.error("Failed to update project:", error);
            toast.error("Failed to update project");
            router.push('/admin/projects/list');
        }

       
    }

    return (
        <main className="min-h-screen px-4 py-10 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">
                Edit Project
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow space-y-4"
            >
                <div>
                    <label className="block text-gray-700 font-medium">
                        Project Name
                    </label>
                    <input
                        type="text"
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleChange}
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
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">
                        Technologies (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        placeholder="e.g. React, TailwindCSS, Node.js"
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
                    {isLoading ? "Updating..." : "Update Project"}
                </button>
            </form>
        </main>
    );
}
