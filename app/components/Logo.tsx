import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
        <span className="text-black font-bold text-lg">TL</span>
      </div>
      <span className="text-white font-semibold text-lg">Trade Lens</span>
    </Link>
  )
} 