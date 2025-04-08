'use client'

import { useState } from 'react'

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function StripePaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      onSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={processing}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={processing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            CVC
          </label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={processing}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  )
}
