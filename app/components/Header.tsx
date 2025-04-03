import Link from 'next/link'
import { User } from 'lucide-react'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
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
      </div>
    </header>
  )
} 