import { MapPin, Mail, Phone, Clock, MessageSquare } from 'lucide-react'
import SectionWrapper from '../components/section-wrapper'
import ContactForm from './contact-form'

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-pastel-100 to-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center">
              <div className="w-16 h-16 bg-apsid-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-apsid-500" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-apsid-500 mb-4">Contacto</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. No dudes en ponerte en contacto.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <SectionWrapper>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl text-apsid-500 mb-6">Información de Contacto</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-apsid-500" />
                      </div>
                      <div>
                        <p className="font-medium text-apsid-500">WhatsApp</p>
                        <a href="https://wa.me/524776719821" target="_blank" rel="noopener noreferrer" className="text-manaoca-500 hover:text-manaoca-600 transition-colors">
                          477 671 9821
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-apsid-500" />
                      </div>
                      <div>
                        <p className="font-medium text-apsid-500">Email</p>
                        <a href="mailto:olga@psicologa-olga.com" className="text-manaoca-500 hover:text-manaoca-600 transition-colors">
                          olga@psicologa-olga.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-pastel-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-apsid-500" />
                      </div>
                      <div>
                        <p className="font-medium text-apsid-500">Dirección</p>
                        <p className="text-slate-600">Mar Mediterráneo 302, Col. El Granjeno, CP 37550</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-4">Horario de Atención</h3>
                  <div className="bg-pastel-50 rounded-2xl p-6 shadow-sm border border-pastel-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-manaoca-400" />
                      <span className="font-medium text-apsid-500">Horarios</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Lunes - Viernes</span>
                        <span className="text-apsid-500 font-medium">9:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sábado</span>
                        <span className="text-apsid-500 font-medium">9:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Domingo</span>
                        <span className="text-slate-400">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-4">Ubicación</h3>
                  <div className="bg-pastel-100 rounded-2xl h-48 flex items-center justify-center border border-pastel-200">
                    <div className="text-center text-apsid-300">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">Mapa próximamente</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Form */}
            <SectionWrapper delay={0.1}>
              <ContactForm />
            </SectionWrapper>
          </div>
        </div>
      </section>
    </div>
  )
}