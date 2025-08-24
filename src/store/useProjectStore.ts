import axios from "axios";
import { create } from "zustand";

export interface Project {
  id: string;
  project_name: string;
  description: string;
  technologies: string[]; // DTO likely expects array
  link: string;
  category: string;
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  successMessage: string | null;
  fetchAllProjects: (params: { limit: number; offset: number }) => Promise<void>;
  createProject: (projectData: Omit<Project, "id" | "createdAt">) => Promise<Project | undefined>;
  updateProject: (id: string, projectData: Partial<Omit<Project, "id" | "createdAt">>) => Promise<Project | undefined>;
  deleteProject: (id: string) => Promise<boolean>;
  getProjectById: (id: string) => Promise<Project | null>;
  setCurrentPage: (page: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalProjects: 0,
  successMessage: "",

  fetchAllProjects: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get("/api/projects", {
        params,
        withCredentials: true,
      });
      const { projects, total, currentPage, totalPages } = res.data.data;
      console.log("Fetched projects:", res.data);
      set({
        projects,
        totalProjects: total,
        currentPage,
        totalPages,
        isLoading: false
      });
    } catch (err) {
      set({ error: "Failed to fetch projects", isLoading: false });
    }
  },

  createProject: async (projectData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(
        "/api/projects",
        projectData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      set({ isLoading: false, successMessage: res.data.message });
      return res.data;
    } catch (err) {
      set({ error: "Failed to create project", isLoading: false });
    }
  },

  updateProject: async (id, projectData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.put(
        `/api/projects/${id}`,
        projectData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      set({ isLoading: false, successMessage: res.data.message });
      return res.data;
    } catch (err) {
      set({ error: "Failed to update project", isLoading: false });
    }
  },

  deleteProject: async (id) => {
  set({ isLoading: true, error: null });
  try {
    const res = await axios.delete(`/api/projects/${id}`, {
      withCredentials: true,
    });

    if (res.data.status === 'Success') {
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id), // remove immediately
        isLoading: false,
        successMessage: res.data.message,
      }));
      return true;
    }

    set({ isLoading: false });
    return false;
  } catch (err) {
    set({ error: "Failed to delete project", isLoading: false });
    return false;
  }
},


  getProjectById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(`/api/projects/${id}`, {
        withCredentials: true,
      });
      set({ isLoading: false, successMessage: res.data.message });
      return res.data.data;
    } catch (err) {
      set({ error: "Failed to get project", isLoading: false });
      return null;
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));
