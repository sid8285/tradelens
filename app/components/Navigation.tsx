import Link from 'next/link'
import { User } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-12 h-screen bg-black flex flex-col items-center pt-6">
      <div className="flex flex-col items-center space-y-8">
        <Link 
          href="/account" 
          className="group w-5 h-5 flex items-center justify-center"
        >
          <User 
            className="w-full h-full text-gray-400 group-hover:text-white transition-colors duration-200" 
            strokeWidth={1.5}
          />
          <span className="sr-only">Account</span>
        </Link>
      </div>
    </nav>
  )
} 