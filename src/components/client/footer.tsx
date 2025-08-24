import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-500 border-t mt-10">
      © {new Date().getFullYear()} Tobias. Visit my{" "}
      <Link
        href="/portfolio"
        className="text-blue-600 hover:underline"
      >
        portfolio
      </Link>
    </footer>
  );
}
