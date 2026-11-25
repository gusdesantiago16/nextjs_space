'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Brain, Heart, Users, Calendar, Coffee, Sparkles, CheckCircle, MessageCircle, HelpCircle } from 'lucide-react'
import SectionWrapper from '../components/section-wrapper'
import { motion } from 'framer-motion'

const servicios = [
  {
    title: 'Terapia Individual',
    description: 'Atención personalizada para niños, adolescentes y adultos.',
    iconName: 'Brain',
    price: '$500 MXN',
    features: ['Sesión de 50 minutos', 'Evaluación inicial incluida', 'Plan terapéutico personalizado']
  },
  {
    title: 'Terapia de Pareja',
    description: 'Fortalece tu relación y mejora la comunicación con tu pareja.',
    iconName: 'Heart',
    price: 'Depende de las sesiones',
    features: ['Sesión de 60 minutos', 'Trabajo en comunicación efectiva', 'Estrategias de resolución']
  },
  {
    title: 'Terapia de Grupo',
    description: 'Espacios de apoyo y crecimiento compartido.',
    iconName: 'Users',
    price: 'Depende de las sesiones',
    features: ['Grupos reducidos', 'Temáticas específicas', 'Apoyo entre pares']
  },
]

const paquetes = [
  {
    nombre: 'Paquete Inicial',
    sesiones: '4 sesiones',
    precio: '$ 1,800',
    beneficios: ['Evaluación psicológica', '4 sesiones terapéuticas', 'Café para Padres incluido', 'Material de apoyo']
  },
  {
    nombre: 'Paquete Crecimiento',
    sesiones: '8 sesiones',
    precio: '$ 3,400',
    beneficios: ['Todo lo del paquete inicial', '8 sesiones terapéuticas', 'Café para Padres incluido', 'Seguimiento personalizado', 'Recursos adicionales']
  },
  {
    nombre: 'Paquete Transformación',
    sesiones: '12 sesiones',
    precio: '$ 4,800',
    beneficios: ['Todo lo del paquete crecimiento', '12 sesiones terapéuticas', 'Café para Padres incluido', 'Acceso a talleres', 'Soporte prioritario']
  },
]

const cuandoIrTerapia = [
  'Cuando sientes que tu problema es mayor que tu capacidad para resolverlo.',
  'Cuando buscas una solución pero no la encuentras.',
  'Cuando esta situación te paraliza o afecta tu desempeño habitual.',
  'Cuando no encuentras tranquilidad en medio del problema que tienes por resolver.',
  'Cuando te das cuenta que te has olvidado de ti, pensando más en otros.',
]

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Brain,
  Users,
  Heart,
}

function ServiceCard({ title, description, iconName, price, features }: {
  title: string
  description: string
  iconName: string
  price?: string
  features?: string[]
}) {
  const Icon = iconMap[iconName ?? ''] ?? Brain
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all h-full border border-pastel-100"
    >
      <div className="w-12 h-12 bg-pastel-100 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-apsid-500" />
      </div>
      <h3 className="font-serif text-xl text-apsid-500 mb-2">{title ?? ''}</h3>
      <p className="text-slate-500 text-sm mb-4">{description ?? ''}</p>
      {price && (
        <p className="text-manaoca-500 font-semibold text-lg mb-3">{price}</p>
      )}
      {features && (features?.length ?? 0) > 0 && (
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <li key={index} className="text-sm text-slate-500 flex items-start gap-2">
              <span className="text-apsid-400 mt-1">•</span>
              {feature ?? ''}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default function ApsidPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-pastel-100 to-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <Image
                  src="/assets/logo-apsid.png"
                  alt="Logo APSID"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-serif text-4xl md:text-5xl text-apsid-500 mb-4">APSID</h1>
                <p className="text-xl text-manaoca-500 mb-4">Atención Psicológica Integral y Desarrollo Humano</p>
                <p className="text-slate-600 max-w-xl">
                  Un espacio terapéutico donde cada persona encuentra el acompañamiento necesario para su bienestar emocional y desarrollo personal.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ¿Cuándo ir a terapia? */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper>
            <div className="bg-gradient-to-br from-pastel-50 to-pastel-100 rounded-3xl p-8 md:p-12 shadow-lg border border-pastel-100">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <HelpCircle className="w-10 h-10 text-manaoca-400" />
                <h2 className="font-serif text-3xl md:text-4xl text-apsid-500">¿Cuándo ir a terapia?</h2>
              </div>
              
              <ul className="space-y-5 mb-8">
                {cuandoIrTerapia?.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-apsid-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
              
              <div className="bg-apsid-500 rounded-2xl p-6 text-center">
                <p className="text-white text-lg leading-relaxed">
                  En <strong>APSID</strong> estamos para ayudarte a superar esa situación contigo, porque para nosotros <em className="text-manaoca-300">tu bienestar es importante</em>.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 px-4 bg-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-apsid-500 mb-4">Servicios</h2>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full"></div>
            </div>
          </SectionWrapper>
          <div className="grid md:grid-cols-3 gap-8">
            {servicios?.map((servicio, index) => (
              <SectionWrapper key={servicio?.title ?? index} delay={index * 0.1}>
                <ServiceCard {...servicio} />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Paquetes */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-4">
              <h2 className="font-serif text-3xl text-apsid-500 mb-4">Paquetes de Sesiones</h2>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full mb-6"></div>
            </div>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Todos nuestros paquetes incluyen el beneficio exclusivo <strong className="text-manaoca-500">“Café para Padres”</strong>, espacios de acompañamiento y orientación para padres de familia.
            </p>
          </SectionWrapper>
          <div className="grid md:grid-cols-3 gap-8">
            {paquetes?.map((paq, index) => (
              <SectionWrapper key={paq?.nombre ?? index} delay={index * 0.1}>
                <div className="bg-pastel-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col border border-pastel-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-manaoca-400" />
                    <span className="text-sm text-apsid-400">{paq?.sesiones ?? ''}</span>
                  </div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-2">{paq?.nombre ?? ''}</h3>
                  <p className="text-manaoca-500 font-semibold text-lg mb-4">{paq?.precio ?? ''}</p>
                  <ul className="space-y-2 flex-1">
                    {paq?.beneficios?.map((ben, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-apsid-400 flex-shrink-0 mt-0.5" />
                        {ben ?? ''}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-pastel-200 flex items-center gap-2 text-sm text-manaoca-500">
                    <Coffee className="w-4 h-4" />
                    Café para Padres incluido
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-apsid-500">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-4">Comienza tu proceso hoy</h2>
            <p className="text-pastel-100 mb-8">
              El primer paso hacia el bienestar es agendar tu cita. Estoy aquí para acompañarte.
            </p>
            <Link
              href="/citas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-manaoca-400 text-white rounded-xl hover:bg-manaoca-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              Agendar Cita
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}