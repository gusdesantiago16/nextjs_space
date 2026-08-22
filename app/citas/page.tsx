import { Calendar, Clock, Heart, CheckCircle } from 'lucide-react'
import SectionWrapper from '../components/section-wrapper'
import AppointmentForm from './appointment-form'

export default function CitasPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-pastel-100 to-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center">
              <div className="w-16 h-16 bg-apsid-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-apsid-500" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-apsid-500 mb-4">Agenda tu Cita</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Da el primer paso hacia tu bienestar. Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Info */}
            <div className="md:col-span-1">
              <SectionWrapper>
                <div className="bg-pastel-50 rounded-3xl p-6 shadow-lg border border-pastel-100">
                  <h3 className="font-serif text-xl text-apsid-500 mb-6">Información</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-apsid-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-apsid-500 text-sm">Duración</p>
                        <p className="text-slate-500 text-sm">50-60 minutos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-manaoca-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-apsid-500 text-sm">Consulta Individual</p>
                        <p className="text-manaoca-500 font-semibold text-lg">$500 MXN</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-pastel-200">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-slate-600">
                        <strong className="text-apsid-500">Nota:</strong> El pago se realiza directamente en consulta.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    {['Confirmación por email', 'Recordatorio antes de la cita', 'Atención personalizada']?.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle className="w-4 h-4 text-apsid-400" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionWrapper>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <SectionWrapper delay={0.1}>
                <AppointmentForm />
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}