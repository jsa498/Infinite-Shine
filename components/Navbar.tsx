import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const servicesSection = document.getElementById('services')
      const servicesSectionTop = servicesSection?.offsetTop ?? 800
      
      // Update scroll position for styling
      setScrollPosition(currentScrollY)
      
      // Handle navbar visibility
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        if (hideTimeout) clearTimeout(hideTimeout)
        
        if (currentScrollY > servicesSectionTop) {
          // If scrolled past services section, hide immediately
          setIsVisible(false)
        } else {
          // Otherwise, use the delay
          const timeout = setTimeout(() => {
            setIsVisible(false)
          }, 2000) // 2 seconds delay
          setHideTimeout(timeout)
        }
      } else {
        // Scrolling up
        if (hideTimeout) clearTimeout(hideTimeout)
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [lastScrollY, hideTimeout])

  const navClasses = `
    fixed z-50 transition-all duration-300
    ${scrollPosition > 50 
      ? 'bg-white/10 backdrop-blur-md rounded-full left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] top-4' 
      : 'bg-transparent w-full top-0'
    }
    ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}
  `

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                <Image
                  src="/images/logoNoBackground.jpg"
                  alt="Exotic Detailing"
                  fill
                  priority
                  className="rounded-full object-cover"
                  sizes="50px"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-primary transition-all duration-300"
            >
              Home
            </Link>
            <Link 
              href="#pricing" 
              className="text-white hover:text-primary transition-all duration-300"
            >
              Pricing
            </Link>
            <Link 
              href="#gallery" 
              className="text-white hover:text-primary transition-all duration-300"
            >
              Gallery
            </Link>
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="tel:+16045120061"
              className="text-white hover:text-primary transition-all duration-300 flex items-center"
            >
              Call us
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.032.653-.048.851-.162.197-.113.345-.294.642-.657L22.5 18.5c.5-.5.5-1 .5-1.5s-.5-1-1-1.5l-3-2.5c-.5-.5-1-.5-1.5-.5s-1 .5-1.5 1l-.5.5c-.5.5-1 .5-1.5.5s-1-.5-1.5-1l-4-4c-.5-.5-.5-1-.5-1.5s.5-1 .5-1.5l.5-.5c.5-.5 1-1 1-1.5s0-1-.5-1.5L7 2.5C6.5 2 6 1.5 5.5 1.5S4.5 2 4 2.5L2.361 4.142c-.362.297-.543.445-.657.642-.114.198-.13.416-.162.851C3.014 6.23 3 6.614 3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link 
              href="#contact"
              className="border border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-full transition-all duration-300 flex items-center"
            >
              Contact us
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-all duration-300 w-10 h-10 flex items-center justify-center"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <div className="space-y-1.5">
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                  <div className="w-6 h-0.5 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 md:hidden bg-secondary border-t border-gray-800 shadow-xl"
            style={{ maxHeight: 'calc(100vh - 5rem)', overflowY: 'auto' }}
          >
            <div className="flex flex-col items-center py-6 space-y-4 backdrop-blur-none bg-secondary">
              <Link
                href="/"
                className="text-white hover:text-primary transition-all duration-300 text-lg w-full text-center py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#pricing"
                className="text-white hover:text-primary transition-all duration-300 text-lg w-full text-center py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#gallery"
                className="text-white hover:text-primary transition-all duration-300 text-lg w-full text-center py-2"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <div className="pt-4 flex flex-col items-center space-y-4 w-full px-6">
                <Link 
                  href="tel:+16045120061"
                  className="text-white hover:text-primary transition-all duration-300 flex items-center justify-center text-lg w-full py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Call us
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.032.653-.048.851-.162.197-.113.345-.294.642-.657L22.5 18.5c.5-.5.5-1 .5-1.5s-.5-1-1-1.5l-3-2.5c-.5-.5-1-.5-1.5-.5s-1 .5-1.5 1l-.5.5c-.5.5-1 .5-1.5.5s-1-.5-1.5-1l-4-4c-.5-.5-.5-1-.5-1.5s.5-1 .5-1.5l.5-.5c.5-.5 1-1 1-1.5s0-1-.5-1.5L7 2.5C6.5 2 6 1.5 5.5 1.5S4.5 2 4 2.5L2.361 4.142c-.362.297-.543.445-.657.642-.114.198-.13.416-.162.851C3.014 6.23 3 6.614 3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="#contact"
                  className="bg-primary hover:bg-primary/90 text-white w-full py-3 rounded-full transition-all duration-300 flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Contact us
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 