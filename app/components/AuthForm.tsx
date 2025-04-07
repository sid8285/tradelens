import { useState } from 'react'

interface AuthFormProps {
  mode: 'login' | 'register'
  onSubmit: (data: { email: string; password: string; name?: string }) => void
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">
        {mode === 'login' ? 'Sign In to Trade Lens' : 'Create Your Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={mode === 'register'}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:text-blue-400">
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </a>
          </>
        )}
      </p>
    </div>
  )
} 