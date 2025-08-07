// Allows users to navigate through the site, and displays the site logo

import Link from 'next/link'
import Image from 'next/image'

const basePath = process.env.NODE_ENV === 'production' ? '/drsdata' : '';

export default function Navbar() {
  return (
    <nav className="bg-red-600 py-2 px-4 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-white h-16">
        <Link href="/" className="flex items-center">
          <div className="relative w-15 h-15 sm:w-20 sm:h-20">
            <Image 
              src={`${basePath}/drsdata_logo_white.png`}
              alt="DRSdata Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 text-sm sm:text-base items-center font-bold">
          <Link href="/current-season-stats">{new Date().getFullYear()} Standings</Link>
          <Link href="/race-scope-page">RaceScope</Link>
          <Link href="/drs-bot-page">DRSbot</Link>
        </div>
      </div>
    </nav>
  )
}