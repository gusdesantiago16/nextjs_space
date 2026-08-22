import Link from 'next/link'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-apsid-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-manaoca-400" />
              <span className="font-serif text-lg">Lic. Olga Mendoza Rivera</span>
            </div>
            <p className="text-pastel-100 text-sm leading-relaxed">
              Psicóloga con especialidad en Educación y Desarrollo Humano. Más de 20 años de experiencia.
            </p>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-pastel-100">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-manaoca-400" />
                <a href="https://wa.me/524776719821" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  477 671 9821
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-manaoca-400" />
                <a href="mailto:olga@psicologa-olga.com" className="hover:text-white transition-colors">
                  olga@psicologa-olga.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-manaoca-400 flex-shrink-0 mt-0.5" />
                <span>Mar Mediterráneo 302, Col. El Granjeno, CP 37550</span>
              </li>
            </ul>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-serif text-lg mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/citas" className="text-pastel-100 hover:text-white transition-colors">
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link href="/apsid" className="text-pastel-100 hover:text-white transition-colors">
                  Servicios APSID
                </Link>
              </li>
              <li>
                <Link href="/manaoca" className="text-pastel-100 hover:text-white transition-colors">
                  Programas MANAOCA
                </Link>
              </li>
              <li>
                <Link href="/aula-audiovisual" className="text-pastel-100 hover:text-white transition-colors">
                  Aula Audiovisual
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-apsid-400 text-center text-sm text-pastel-200">
          <p>© 2026 APSID & MANAOCA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}