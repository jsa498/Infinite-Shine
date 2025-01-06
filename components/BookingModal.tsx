import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { PhoneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import emailjs from '@emailjs/browser'

interface Package {
  name: string
  price: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage: Package | null
}

const generateMessageTemplate = (packageName: string) => {
  return encodeURIComponent(
    `Hi Infinite Shine,\n\nI'm interested in booking the ${packageName}.\n\nMy availability is: [Please specify your preferred date and time]\n\nPlease contact me to confirm the booking.\n\nThank you!`
  )
}

export default function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!selectedPackage) return null

  const handleCallNow = () => {
    window.location.href = 'tel:+16047258010'
  }

  const handleMessageNow = () => {
    const messageTemplate = generateMessageTemplate(selectedPackage.name)
    window.location.href = `sms:+16047258010&body=${messageTemplate}`
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondary p-6 text-left align-middle shadow-xl transition-all border border-primary/20">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                    Book Your Detail
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-lg font-semibold text-primary mb-1">
                    {selectedPackage.name}
                  </p>
                  <p className="text-gray-400">
                    Starting from ${selectedPackage.price}
                  </p>
                </div>

                <p className="text-gray-300 mb-8">
                  Choose how you'd like to proceed with your booking:
                </p>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCallNow}
                    className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl transition-colors"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span>Call Now to Book</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMessageNow}
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        <span>Message Now to Book</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="mt-6 text-sm text-gray-400 text-center">
                  We'll respond to your booking request as soon as possible
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 