import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckIcon } from '@heroicons/react/24/outline'
import BookingModal from './BookingModal'

const packages = [
  {
    name: 'Beginner Package',
    price: '80-100',
    description: 'For regular clients or vehicles that need a quick refresh',
    features: [
      'Light vacuum',
      'Full interior wipe down',
      'Windows cleaned',
      'Mats cleaned',
      'Standard exterior detail',
      'Full pressure wash',
      'Wheels cleaned',
      'Foam hand wash',
      'Vehicle dried',
      'Tire shine added'
    ]
  },
  {
    name: 'Intermediate Package',
    price: '120-150',
    description: 'Perfect for daily drivers needing regular maintenance',
    features: [
      'Full interior vacuum',
      'Door jambs cleaned',
      'Interior wipe/brush cleanup',
      'Protection with shine/matte finish',
      'Thorough mat cleaning',
      'Air freshening',
      'Windows cleaned',
      'Standard exterior detail',
      'Full pressure wash',
      'Professional finish'
    ],
    featured: true
  },
  {
    name: 'Extreme Package',
    price: '160-200',
    description: 'Complete restoration to original condition',
    features: [
      'Complete interior detailing',
      'Carpet & mat shampooing',
      'Leather cleaning & protection',
      'Pet hair removal if needed',
      'Two-bucket wash method',
      'Engine bay detail',
      'Black trim restoration',
      'Spray gloss finish',
      'Premium protection',
      'Complete exterior care'
    ]
  }
]

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: string } | null>(null)

  const handleSelectPackage = (pkg: { name: string; price: string }) => {
    setSelectedPackage(pkg)
    setIsModalOpen(true)
  }

  return (
    <section id="pricing" className="py-24 bg-secondary/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Select Your <span className="text-primary-light">Premium</span> Package</h2>
          <p className="text-lg text-gray-300">
            Experience infinite perfection with our bespoke car detailing packages tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-secondary-light/50 backdrop-blur-sm rounded-2xl p-8 border ${
                pkg.featured ? 'border-primary-light shadow-glow-lg' : 'border-primary/20 shadow-glow'
              } hover:shadow-glow-lg transition-all duration-300`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-1 rounded-full text-sm shadow-glow">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-primary-light text-4xl font-bold mb-2">
                  ${pkg.price}
                </div>
                <p className="text-gray-400">{pkg.description}</p>
              </div>
              <ul className="space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-primary-light flex-shrink-0 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 px-6 rounded-full text-white font-semibold transition-all duration-300 ${
                    pkg.featured 
                      ? 'bg-primary hover:bg-primary-light shadow-glow hover:shadow-glow-lg' 
                      : 'bg-secondary-light border border-primary/20 hover:border-primary-light hover:shadow-glow'
                  }`}
                >
                  Select Package
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Additional services and custom packages available upon request.
            <br />
            Contact us for ceramic coating, paint correction, and leather treatment options.
          </p>
        </motion.div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPackage={selectedPackage}
      />
    </section>
  )
} 