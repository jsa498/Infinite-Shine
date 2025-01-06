import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-8">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Infinite Shine. All Rights Reserved.
          </p>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <Link href="/about" className="text-gray-400 hover:text-primary transition-all duration-300">
              About Infinite Shine
            </Link>
            <Link href="/services" className="text-gray-400 hover:text-primary transition-all duration-300">
              Our Luxurious Services
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-all duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-all duration-300">
              Terms & Conditions
            </Link>
            <Link href="/support" className="text-gray-400 hover:text-primary transition-all duration-300">
              Customer Support
            </Link>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/infiniteshine.exotics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-300"
            >
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/@infiniteshine.exotics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-all duration-300"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 