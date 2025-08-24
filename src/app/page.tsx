import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const pages = [
  { name: "Profile", path: "/profile" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
  { name: "Articles", path: "/articles" },
];

export default function Home() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10 bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
        Hi, I’m Tobias (also known as Tochukwu)
      </h1>

      <p className="text-center max-w-2xl text-gray-600 mb-8 leading-relaxed">
        I’m a Software Engineer with over five years of experience. I love to code, read,
        brainstorm ideas, play chess, and build meaningful solutions. I’ve worked with a
        wide range of tools and programming languages to bring ideas to life.
      </p>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        {/* GitHub */}
        <div className="relative group">
          <Link href="https://github.com/JaxTee100" target="_blank">
            <BsGithub className="text-2xl text-gray-600 hover:text-black transition duration-200" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            GitHub
          </span>
        </div>

        {/* LinkedIn */}
        <div className="relative group">
          <Link href="https://linkedin.com/" target="_blank">
            <FaLinkedin className="text-2xl text-gray-600 hover:text-blue-700 transition duration-200" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-blue-700 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            LinkedIn
          </span>
        </div>

        {/* Email */}
        <div className="relative group">
          <Link href="mailto:you@example.com">
            <Mail className="text-2xl text-gray-600 hover:text-red-600 transition duration-200" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-red-600 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            Email
          </span>
        </div>

        {/* Twitter (X) */}
        <div className="relative group">
          <Link href="https://twitter.com/" target="_blank">
            <X className="text-2xl text-gray-600 hover:text-blue-500 transition duration-200" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-blue-500 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            Twitter
          </span>
        </div>

        {/* Instagram */}
        <div className="relative group">
          <Link href="https://www.instagram.com/?hl=en" target="_blank">
            <FaInstagramSquare className="text-2xl text-gray-600 hover:text-pink-500 transition duration-200" />
          </Link>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-pink-500 rounded opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            Instagram
          </span>
        </div>
      </div>


      <div className="flex flex-wrap justify-center gap-4">
        {pages.map((page) => (
          <Link href={page.path} key={page.name}>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200 cursor-pointer">
              {page.name}
            </Button>
          </Link>
        ))}
      </div>
    </main>
  );
}
