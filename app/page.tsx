import Link from "next/link"
import { Quiz } from "@/components/quiz/quiz"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-8 h-[60px] flex items-center justify-between sticky top-0 z-50">
        <Link href="#" className="font-serif text-[22px] text-brand no-underline tracking-tight">
          SheBlooms
        </Link>
        <span className="text-[11px] font-medium tracking-widest uppercase text-gray-400">
          Investment Readiness Check
        </span>
      </nav>

      {/* Quiz Section */}
      <main className="flex-1 py-14 px-5">
        <div className="max-w-[560px] mx-auto">
          <Quiz />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-8 text-center text-xs text-gray-400">
        © 2026 SheBlooms ·{" "}
        <a href="https://sheblooms.com" className="text-brand no-underline hover:underline">
          sheblooms.com
        </a>
      </footer>
    </div>
  )
}
