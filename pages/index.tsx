import React, { Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import HeroSection from '../components/HeroSection'

// Loading component
const LoadingFallback = () => (
  <div className="h-screen bg-secondary animate-pulse flex items-center justify-center">
    <div className="text-white">Loading...</div>
  </div>
)

// Dynamic imports
const Services = dynamic(() => import('../components/Services'), {
  loading: () => <LoadingFallback />,
  suspense: true
})

const Pricing = dynamic(() => import('../components/Pricing'), {
  loading: () => <LoadingFallback />,
  suspense: true
})

const OurWork = dynamic(() => import('../components/OurWork'), {
  loading: () => <LoadingFallback />,
  suspense: true
})

const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => <LoadingFallback />,
  suspense: true
})

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <Head>
        <title>Exotic Detailing - Luxury Car Care Services</title>
        <meta name="description" content="Transform your vehicle into a masterpiece of luxury with Exotic Detailing's premium car care services." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-secondary">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        {isClient && (
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
        )}

        {/* Pricing Section */}
        {isClient && (
          <Suspense fallback={<LoadingFallback />}>
            <Pricing />
          </Suspense>
        )}

        {/* Our Work Section */}
        {isClient && (
          <Suspense fallback={<LoadingFallback />}>
            <OurWork />
          </Suspense>
        )}

        {/* Contact Section */}
        {isClient && (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        )}
      </main>
    </>
  )
} 