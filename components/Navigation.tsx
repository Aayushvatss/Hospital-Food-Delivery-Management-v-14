import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          Hospital Food Management
        </Link>
        <div>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          {/* Add more navigation items as needed */}
        </div>
      </div>
    </nav>
  )
}

