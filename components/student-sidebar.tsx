import Link from "next/link"
import { Lightbulb, Home, LogOut, MessageSquare, Settings, HelpCircle, BookOpen } from "lucide-react"

export default function StudentSidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span>Mentora</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/student/feedback"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
          <Link
            href="/student/doubts"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <HelpCircle className="h-4 w-4" />
            Doubts
          </Link>
          <Link
            href="/student/notes"
            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
          >
            <BookOpen className="h-4 w-4" />
            Notes
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 py-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            RJ
          </div>
          <div>
            <p className="text-sm font-medium">Riya Joshi</p>
            <p className="text-xs text-gray-500">Grade 10 Student</p>
          </div>
        </div>
        <div className="mt-4 grid gap-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

