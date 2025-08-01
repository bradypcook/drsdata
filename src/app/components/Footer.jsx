// Signifies the end of each webpage, displays the Linkedin, GitHub, and email icons (as well as the Handshake Logo)
'use client'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-3 mt-0">
      <div className="max-w-7xl mx-auto px-2 flex flex-col md:flex-row justify-between items-center text-lg">
        <p className="mb-1 md:mb-0">
          © {new Date().getFullYear()} Brady Cook
        </p>
      </div>
    </footer>
  )
}