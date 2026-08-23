import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, BookOpen, Home, Heart, Users, Calendar, ImageIcon, CheckCircle, Star } from 'lucide-react'
import SectionWrapper from '../components/section-wrapper'
import ManaocaGallery from '../components/manaoca-gallery'

const beneficiosREMOF = [
  'La conexión emocional que se logra entre padres e hijos.',
  'Que los padres puedan vigilar el ambiente para el desarrollo académico y emocional.',
  'Brindarles una educación en base a los intereses de sus hijos y a sus intereses y visión educativa para ellos.',
]

const areasDesarrollo = [
  'Vida práctica',
  'Lógico matemático',
  'Español',
  'Artes',
  'Creatividad',
  'Socioemocional',
  'Motoras',
  'Idiomas / Lengua extranjera',
]

const queRecibes = [
  'Clases mensuales listas para la aplicación',
  'Una guía para aplicarlas',
  'Formatos para evaluar el desarrollo de tus hijos de acuerdo a su etapa',
  'Materiales didácticos de apoyo a las clases',
]

export default function ManaocaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-manaoca-50 to-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <Image
                  src="/assets/logo-manaoca.png"
                  alt="Logo MANAOCA"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-serif text-4xl md:text-5xl text-manaoca-500 mb-4">MANAOCA</h1>
                <p className="text-xl text-apsid-500 mb-4">Centro de Aprendizaje y Recreación</p>
                <p className="text-slate-600 max-w-xl">
                  Un espacio donde los niños aprenden jugando y crecen felices. Combinamos educación y diversión para un desarrollo integral.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Título Programas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-manaoca-500 mb-4">
                ¿Qué programas te ofrecemos en MANAOCA?
              </h2>
              <div className="w-20 h-1 bg-apsid-500 mx-auto rounded-full"></div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Programa REMOF */}
      <section className="py-16 px-4 bg-pastel-50">
        <div className="max-w-5xl mx-auto">
          <SectionWrapper>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-manaoca-100">
              {/* Header del programa */}
              <div className="bg-gradient-to-r from-manaoca-400 to-manaoca-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Home className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl">Programa REMOF</h3>
                    <p className="text-manaoca-100">Educación en el hogar</p>
                  </div>
                </div>
                <p className="text-lg leading-relaxed">
                  Es un modelo inspirado en las metodologías <strong>Freinet, Montessori y Reggio Emilia</strong>, sin que seas guía recibe las clases diseñadas, para que tus hijos disfruten los beneficios.
                </p>
              </div>
              
              {/* Contenido */}
              <div className="p-8 md:p-10">
                {/* Edad target */}
                <div className="bg-manaoca-50 rounded-2xl p-6 mb-8 border border-manaoca-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-manaoca-500" />
                    <span className="font-serif text-xl text-manaoca-600">Dirigido a niños de 2 a 6 años de edad</span>
                  </div>
                  <p className="text-slate-600">Programa de educación básica adaptado a cada etapa del desarrollo.</p>
                </div>

                {/* Qué recibes */}
                <div className="mb-8">
                  <h4 className="font-serif text-xl text-apsid-500 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-manaoca-400" />
                    ¿Qué recibes?
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {queRecibes?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-pastel-50 rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-apsid-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Áreas de desarrollo */}
                <div className="mb-8">
                  <h4 className="font-serif text-xl text-apsid-500 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-manaoca-400" />
                    Áreas del desarrollo que trabajamos
                  </h4>
                  <p className="text-slate-600 mb-4">Creamos un ambiente lúdico y de valores para desarrollar:</p>
                  <div className="flex flex-wrap gap-2">
                    {areasDesarrollo?.map((area, index) => (
                      <span key={index} className="bg-apsid-500 text-white px-4 py-2 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Beneficios */}
                <div className="bg-gradient-to-br from-apsid-500 to-apsid-600 rounded-2xl p-8 text-white">
                  <h4 className="font-serif text-xl mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-manaoca-300" />
                    Beneficios de la educación en casa
                  </h4>
                  <ul className="space-y-4">
                    {beneficiosREMOF?.map((beneficio, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-manaoca-300 flex-shrink-0 mt-0.5" />
                        <span className="text-pastel-100 leading-relaxed">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-apsid-500 mb-4 flex items-center justify-center gap-3">
                <ImageIcon className="w-8 h-8 text-manaoca-400" />
                Galería de Actividades
              </h2>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full mb-4"></div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Un vistazo a los espacios y dinámicas donde los niños aprenden jugando, exploran su creatividad y se desarrollan en un ambiente seguro.
              </p>
            </div>
            
            {/* Carousel Component */}
            <ManaocaGallery />
            
          </SectionWrapper>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-manaoca-400">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">¿Quieres que tu pequeño sea parte de MANAOCA?</h2>
            <p className="text-manaoca-100 mb-8">
              Agenda una visita para conocer nuestras instalaciones y programas.
            </p>
            <Link
              href="/citas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-apsid-500 text-white rounded-xl hover:bg-apsid-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              Agendar Visita
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}