'use client'

import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  const handleSubmit = async (data: { email: string; password: string }) => {
    // TODO: Implement actual authentication logic
    console.log('Login attempt:', data)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Trade Lens</h1>
          <p className="text-gray-400">Your AI-Powered Stock Analysis Platform</p>
        </div>
        
        <AuthForm mode="login" onSubmit={handleSubmit} />
      </div>
    </div>
  )
} 