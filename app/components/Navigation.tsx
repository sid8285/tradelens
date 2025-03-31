import Link from 'next/link'
import { Star } from 'lucide-react'

export default function Navigation() {
  const navItems = [
    { href: '/account', label: 'Account' },
    { href: '/search', label: 'Search' },
    { href: '/favorites', label: 'Favorites' }
  ]

  return (
    <nav className="fixed top-0 left-0 w-12 h-screen bg-black flex flex-col items-center pt-6">
      <div className="flex flex-col items-center space-y-6">
        {navItems.map((item, index) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className="group w-5 h-5 flex items-center justify-center"
          >
            <Star 
              className="w-full h-full text-gray-400 group-hover:text-white transition-colors duration-200" 
              strokeWidth={1.5}
            />
            <span className="sr-only">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
} 