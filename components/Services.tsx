import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SparklesIcon,
  ShieldCheckIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface Service {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const services: Service[] = [
  {
    title: 'Paint Protection',
    description: 'Preserve your vehicle\'s paint with our advanced protection techniques.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Interior Detailing',
    description: 'Experience the ultimate in interior cleanliness and comfort.',
    Icon: SparklesIcon,
  },
  {
    title: 'Engine Cleaning',
    description: 'Keep your engine in pristine condition with our thorough cleaning services.',
    Icon: WrenchScrewdriverIcon,
  },
  {
    title: 'Ceramic Coating',
    description: 'Enhance your car\'s shine and durability with our premium ceramic coating.',
    Icon: BeakerIcon,
  },
  {
    title: 'Luxury Finishes',
    description: 'Achieve a sophisticated look with our exclusive detailing touches.',
    Icon: SparklesIcon,
  },
  {
    title: 'Eco-Friendly Products',
    description: 'We use environmentally friendly products without compromising quality.',
    Icon: GlobeAltIcon,
  },
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Exclusive Detailing Services</h2>
          <p className="text-lg text-gray-300">
            Our services are designed to cater to the discerning car owner, offering unparalleled attention to detail and luxurious finishes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.Icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors"
              >
                <IconComponent className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 