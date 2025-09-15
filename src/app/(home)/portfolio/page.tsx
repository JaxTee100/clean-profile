"use client";

import { useProjectStore } from "@/store/useProjectStore";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [pageSize, setPageSize] = useState(4);

  const {
    projects,
    fetchAllProjects,
    currentPage,
    totalPages,
    setCurrentPage,
    isLoading,
  } = useProjectStore();

  // Fetch projects
  const fetchProjects = async () => {
    const offset = (currentPage - 1) * pageSize;
    await fetchAllProjects({ limit: pageSize, offset });
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, pageSize, setPageSize, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  // Categories
  const categories = useMemo(() => {
    const cats = new Set<string>(
      projects.map((p) => p.category || "Uncategorized")
    );
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Filter
  const filtered = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  // Page change
  const pageChange = (page: number) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    if (typeof window !== "undefined") {
      document.getElementById("projects-root")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main
      id="projects-root"
      className="min-h-screen px-4 py-12 max-w-6xl mx-auto bg-gradient-to-b from-[#0a1128] via-[#001f54] to-[#034078] text-gray-100 font-sans"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-blue-200 tracking-wide drop-shadow-lg"
      >
        ✨ My Projects
      </motion.h1>

      {/* Sticky Filters */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-[#001f54]/95 to-[#034078]/95 backdrop-blur-md border-b border-blue-700 py-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-6xl mx-auto px-2">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-400/40"
                    : "bg-blue-900/40 text-blue-200 hover:bg-blue-700 hover:text-white"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Page Size */}
          <div className="flex items-center gap-3 justify-center md:justify-end">
            <label className="text-sm text-blue-200">Per page</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-2 rounded-lg bg-blue-900/50 text-blue-100 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {[4, 6, 8, 12].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="p-6 bg-blue-900/40 rounded-2xl shadow animate-pulse"
            >
              <div className="h-6 bg-blue-800 rounded w-3/4 mb-3" />
              <div className="h-4 bg-blue-800 rounded w-1/4 mb-4" />
              <div className="h-3 bg-blue-800 rounded w-full mb-6" />
              <div className="flex gap-2 flex-wrap">
                <div className="h-6 bg-blue-800 rounded w-16" />
                <div className="h-6 bg-blue-800 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-lg text-center text-blue-200 mt-20">
          No projects found.
        </p>
      ) : (
        <>
          {/* Projects Grid */}
          <AnimatePresence mode="popLayout">
            <motion.ul
              key={`${selectedCategory}-${currentPage}-${pageSize}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filtered.map((project) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="bg-blue-900/50 backdrop-blur-lg border border-blue-700 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-400"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-100 mb-1">
                        {project.project_name}
                      </h2>
                      <p className="text-sm text-blue-300 italic">
                        {project.category}
                      </p>
                    </div>
                    <div className="text-xs text-blue-300">#{project.id}</div>
                  </div>

                  <p className="text-blue-100/90 mb-4 line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-sm font-semibold text-blue-200">
                      Technologies:
                    </span>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-blue-100 bg-blue-800/70 px-2 py-1 rounded-full border border-blue-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={project.link || "#"}
                      target="_blank"
                      className="text-blue-400 hover:text-blue-200 font-semibold relative inline-block after:block after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      View Project →
                    </Link>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Sticky Pagination */}
          <div className="sticky bottom-0 z-20 bg-gradient-to-r from-[#001f54]/95 to-[#034078]/95 backdrop-blur-md border-t border-blue-700 py-4 mt-12">
            <nav
              aria-label="Project pagination"
              className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto px-2"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => pageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-blue-800/60 border border-blue-700 hover:bg-blue-700 disabled:opacity-40 transition-all"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    if (
                      page !== 1 &&
                      page !== totalPages &&
                      Math.abs(page - currentPage) > 2
                    ) {
                      const before = page === currentPage - 3;
                      const after = page === currentPage + 3;
                      if (before || after) {
                        return (
                          <span
                            key={`dots-${page}`}
                            className="px-2 text-blue-400"
                          >
                            …
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => pageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          page === currentPage
                            ? "bg-blue-500 text-white shadow-lg"
                            : "bg-blue-800/50 text-blue-200 hover:bg-blue-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => pageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-blue-800/60 border border-blue-700 hover:bg-blue-700 disabled:opacity-40 transition-all"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-blue-300">
                Page {currentPage} of {totalPages} — {filtered.length} projects
              </div>
            </nav>
          </div>
        </>
      )}
    </main>
  );
}
