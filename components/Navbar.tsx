'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredPath, setHoveredPath] = useState('/')

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollPosition(currentScrollY)
      
      if (currentScrollY > lastScrollY) {
        if (currentScrollY > 50) {
          setIsVisible(false)
        }
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Customize your navigation items here
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '#pricing', name: 'Pricing' },
    { path: '#our-work', name: 'Our Work' },
    { path: '#contact', name: 'Contact' }
  ]

  const navClasses = `
    fixed z-[100] transition-all duration-300 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] 
    left-1/2 -translate-x-1/2 top-2 lg:top-4
    bg-black/10 backdrop-blur-lg shadow-lg rounded-full border border-primary/20
    ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
  `

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]">
                <Image
                  src="/images/LOGO COLOR_processed.jpg"
                  alt="Infinite Shine"
                  fill
                  priority
                  className="rounded-full object-cover shadow-glow"
                  sizes="50px"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            <AnimatePresence mode="wait">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-4 py-2 transition-colors rounded-md text-white/75 hover:text-white"
                  onMouseOver={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath('/')}
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.path === hoveredPath && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary/20 rounded-md -z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}
                </Link>
              ))}
            </AnimatePresence>
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="tel:+16047258010"
              className="text-white hover:text-primary-light transition-all duration-300 flex items-center"
            >
              Call us
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.032.653-.048.851-.162.197-.113.345-.294.642-.657L22.5 18.5c.5-.5.5-1 .5-1.5s-.5-1-1-1.5l-3-2.5c-.5-.5-1-.5-1.5-.5s-1 .5-1.5 1l-.5.5c-.5.5-1 .5-1.5.5s-1-.5-1.5-1l-4-4c-.5-.5-.5-1-.5-1.5s.5-1 .5-1.5l.5-.5c.5-.5 1-1 1-1.5s0-1-.5-1.5L7 2.5C6.5 2 6 1.5 5.5 1.5S4.5 2 4 2.5L2.361 4.142c-.362.297-.543.445-.657.642-.114.198-.13.416-.162.851C3.014 6.23 3 6.614 3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link 
              href="#contact"
              className="bg-primary hover:bg-primary-light text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center shadow-glow hover:shadow-glow-lg"
            >
              Contact us
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-light transition-colors p-2 relative z-50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden"
          >
            <motion.div
              className="bg-black backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-primary/20"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex flex-col p-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center"
                  >
                    <span
                      className="px-6 py-2 text-lg transition-all duration-300 rounded-full text-white hover:text-primary-light hover:bg-white/10 hover:shadow-glow group"
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link 
                  href="tel:+16047258010"
                  className="flex items-center justify-center px-6 py-2 text-lg transition-all duration-300 rounded-full text-white hover:text-primary-light hover:bg-white/10 hover:shadow-glow"
                  onClick={() => setIsOpen(false)}
                >
                  Call us
                </Link>
                <Link
                  href="#contact"
                  className="flex items-center justify-center px-6 py-2 text-lg bg-primary hover:bg-primary-light text-white rounded-full transition-all duration-300 shadow-glow hover:shadow-glow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 