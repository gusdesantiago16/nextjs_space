'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, BookOpen, Calendar, Phone, Home, Video, ShoppingBag, LogIn } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/apsid', label: 'APSID', icon: Heart },
  { href: '/manaoca', label: 'MANAOCA', icon: BookOpen },
  { href: '/aula-audiovisual', label: 'Aula Audiovisual', icon: Video },
  { href: '/tienda', label: 'Tienda', icon: ShoppingBag },
  { href: '/citas', label: 'Citas', icon: Calendar },
  { href: '/contacto', label: 'Contacto', icon: Phone },
  { href: '/login', label: 'Portal', icon: LogIn },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-pastel-50/95 backdrop-blur-md shadow-sm border-b border-pastel-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-apsid-300 group-hover:border-apsid-400 transition-colors">
              <Image
                src="/olga-mendoza.jpg"
                alt="Lic. Olga Mendoza Rivera"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-serif text-lg text-apsid-500 hidden sm:block">Lic. Olga Mendoza</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks?.map((link) => {
              const IconComponent = link?.icon
              return (
                <Link
                  key={link?.href ?? ''}
                  href={link?.href ?? '/'}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-apsid-500 hover:bg-pastel-100 hover:text-apsid-600 transition-all"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {link?.label ?? ''}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-pastel-100 transition-colors"
            aria-label="Menú"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-apsid-500" /> : <Menu className="w-6 h-6 text-apsid-500" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pb-3 border-t border-pastel-200"
            >
              <div className="flex flex-col gap-1 pt-3">
                {navLinks?.map((link) => {
                  const IconComponent = link?.icon
                  return (
                    <Link
                      key={link?.href ?? ''}
                      href={link?.href ?? '/'}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-apsid-500 hover:bg-pastel-100 transition-colors"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      {link?.label ?? ''}
                    </Link>
                  )
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}