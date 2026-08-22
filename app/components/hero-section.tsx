'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/fondo.jpeg"
          alt="Fondo orgánico"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pastel-100/90 via-pastel-50/80 to-pastel-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-apsid-500 mb-4 leading-tight">
              Lic. Olga<br />
              <span className="text-manaoca-400">Mendoza Rivera</span>
            </h1>
            <p className="text-lg text-apsid-400 mb-2">Psicóloga Clínica</p>
            <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
              Especialista en Educación, Desarrollo Humano y terapia con enfoque clínico. Más de 20 años de experiencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/citas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-apsid-500 text-white rounded-xl hover:bg-apsid-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                Agendar Cita
              </Link>
              <Link
                href="/apsid"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-apsid-500 rounded-xl hover:bg-pastel-100 transition-all shadow-md border border-pastel-200"
              >
                Conocer Servicios
              </Link>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
            className="flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-pastel-100/70 rounded-full blur-2xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/olga-mendoza.jpg"
                  alt="Lic. Olga Mendoza Rivera - Psicóloga Clínica"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-apsid-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}