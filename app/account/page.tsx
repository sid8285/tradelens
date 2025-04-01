import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <Logo />
        </div>
        
        <div className="bg-white rounded-xl p-6">
          <h1 className="text-2xl font-medium text-black mb-4">Account</h1>
          <p className="text-gray-600">Sign up functionality coming soon...</p>
        </div>
      </div>
    </div>
  )
} 