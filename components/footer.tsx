import Link from "next/link"
import { Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_LIBRARY_NAME}
          </p>
          <Link
            href="https://github.com/hermesloom/home-library"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            <span>View on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
