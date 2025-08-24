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

  // Fetch projects from backend
  const fetchProjects = async () => {
    const offset = (currentPage - 1) * pageSize;
    await fetchAllProjects({ limit: pageSize, offset });
  };

  // Fetch when page, size, or category changes
  useEffect(() => {
     fetchProjects();
  }, [currentPage, pageSize, setPageSize, selectedCategory]);

  // Ensure currentPage is within bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  // Category list
  const categories = useMemo(() => {
    const cats = new Set<string>(projects.map((p) => p.category || "Uncategorized"));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Filtered list
  const filtered = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  // Slice for display
  const startIndex = (currentPage - 1) * pageSize;
  const visibleProjects = filtered;

  // Change page
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
      className="min-h-screen px-4 py-10 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
        Projects
      </h1>

      {/* Filters + Page Size */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Per page</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-gray-100 rounded border border-gray-200 text-sm"
            aria-label="Projects per page"
          >
            {[4, 6, 8, 12].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="h-3 bg-gray-200 rounded w-full mb-6" />
              <div className="flex gap-2 flex-wrap">
                <div className="h-6 bg-gray-200 rounded w-16" />
                <div className="h-6 bg-gray-200 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-lg text-center text-gray-500 mt-20">
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {visibleProjects.map((project) => (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.995 }}
                  transition={{ duration: 0.32 }}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 tracking-wide">
                        {project.project_name}
                      </h2>
                      <p className="text-sm text-gray-500 italic mb-3">
                        {project.category}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">#{project.id}</div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm font-bold text-gray-800">
                      Technologies:
                    </span>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={project.link || "#"}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 font-medium relative inline-block after:block after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    >
                      View Project →
                    </Link>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Pagination */}
          <nav
            aria-label="Project pagination"
            className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => pageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded bg-gray-100 border border-gray-200 disabled:opacity-50"
                aria-disabled={currentPage === 1}
                aria-label="Previous page"
              >
                Previous
              </button>

              {/* Page numbers */}
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
                          className="px-2 text-gray-400"
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
                      className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                        page === currentPage
                          ? "bg-blue-600 text-white"
                          : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => pageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded bg-gray-100 border border-gray-200 disabled:opacity-50"
                aria-label="Next page"
              >
                Next
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} — {filtered.length} projects
            </div>
          </nav>
        </>
      )}
    </main>
  );
}
