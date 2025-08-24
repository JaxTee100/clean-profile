'use client'
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 font-sans text-gray-800">
      {/* Header */}
      <header className="border-b pb-6 mb-8 border border-red-500 gap-2">
        <h1 className="text-4xl font-bold text-gray-900">Udeh Tochukwu Tobias</h1>
        <p className="text-lg text-gray-600">Full Stack Developer</p>
        <p className="text-sm text-gray-500">tochukwu.udeh@nutm.edu.ng | +234 903 202 7443 | linkedin.com/in/tochukwu</p>
      </header>

      {/* About Me */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">About Me</h2>
        <p className="leading-relaxed">
          Highly motivated and results-driven Full Stack Developer with over 5 years of experience
          delivering robust web applications. Adept at collaborating with cross-functional teams and
          leveraging modern technologies to solve complex problems.
        </p>
      </motion.section>

      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Experience</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg">Senior Developer – ABC Corp</h3>
            <p className="text-sm text-gray-500">Jan 2020 – Present</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Led development of enterprise-level web applications.</li>
              <li>Implemented CI/CD pipelines, reducing deployment time by 40%.</li>
              <li>Mentored junior developers in best coding practices.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Frontend Developer – XYZ Ltd</h3>
            <p className="text-sm text-gray-500">Jun 2017 – Dec 2019</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Developed responsive user interfaces using React and Tailwind CSS.</li>
              <li>Collaborated closely with designers to ensure pixel-perfect UI.</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Skills</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Frontend</h3>
            <p>React, Next.js, Tailwind CSS, HTML5, CSS3, JavaScript (ES6+)</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Backend</h3>
            <p>Node.js, Express.js, PostgreSQL, MongoDB</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Tools & DevOps</h3>
            <p>Git, Docker, Jenkins, AWS</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Soft Skills</h3>
            <p>Team Collaboration, Problem-Solving, Communication</p>
          </div>
        </div>
      </motion.section>

      {/* Interests */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Interests</h2>
        <p>Open-source contributions, UI/UX design, Artificial Intelligence, Hiking</p>
      </motion.section>
    </main>
  );
}
