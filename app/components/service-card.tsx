'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  price?: string
  features?: string[]
}

export default function ServiceCard({ title, description, icon: Icon, price, features }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
    >
      <div className="w-12 h-12 bg-mint-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-sage-500" />
      </div>
      <h3 className="font-serif text-xl text-wood-500 mb-2">{title ?? ''}</h3>
      <p className="text-wood-400 text-sm mb-4">{description ?? ''}</p>
      {price && (
        <p className="text-sage-500 font-semibold text-lg mb-3">{price}</p>
      )}
      {features && features?.length > 0 && (
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <li key={index} className="text-sm text-wood-400 flex items-start gap-2">
              <span className="text-mint-400 mt-1">•</span>
              {feature ?? ''}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
