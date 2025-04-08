'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import StripePaymentForm from '../components/StripePaymentForm'

export default function PaymentPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const amount = 9.99 // Example subscription amount

  const handleSuccess = () => {
    // Simulate successful payment
    router.push('/account')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-2">Upgrade to Premium</h1>
            <p className="text-gray-400 mb-6">Get access to advanced features and real-time alerts</p>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white">Premium Plan</h2>
                  <p className="text-gray-400 text-sm">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">${amount}</div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <StripePaymentForm
              amount={amount}
              onSuccess={handleSuccess}
              onError={handleError}
            />

            <p className="text-gray-400 text-sm mt-6 text-center">
              This is a demo payment form. No actual payments will be processed.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 