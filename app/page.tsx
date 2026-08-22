import Image from 'next/image'
import Link from 'next/link'
import { Heart, BookOpen, Calendar, ArrowRight, Sparkles, Users, Brain, GraduationCap, Award } from 'lucide-react'
import HeroSection from './components/hero-section'
import SectionWrapper from './components/section-wrapper'

const formacion = [
  'Licenciatura en Psicología Educativa por la Universidad Autónoma de Querétaro',
  'Maestría en Desarrollo Humano por la Universidad de Celaya',
  'Diplomado en Programación Neurolingüística (Centro Mexicano PNL)',
  'Diplomado en Asesoría y Consejería (Tecnológico de Monterrey)',
  'Diplomado en educación (Universidad De Lasalle)',
  'Diplomado en Terapia Familiar Sistémica (Universidad de Celaya)',
  'Diplomado en Terapia de pareja (BUAP)',
  'Múltiples cursos en procesos de enseñanza-aprendizaje (Tecnológico de Monterrey, Universidad De Lasalle, ANUIES)',
  'Terapia de Reconstrucción personal (Universidad de Celaya)',
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Sobre Mí Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-apsid-500 mb-4">
                Sobre Mí
              </h2>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full"></div>
            </div>
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed space-y-6">
              <p>
                Mi nombre es <strong className="text-apsid-500">Olga Mendoza</strong>, Psicóloga con especialidad en Educación, Desarrollo Humano y terapia con enfoque clínico con más de 20 años de experiencia trabajando en instituciones educativas como en la práctica privada, además de impartir cursos y talleres.
              </p>
              <p>
                Desde que planeaba mi proyecto de vida por primera vez, siempre quise cursar una carrera que me permitiera ayudar a muchas personas a estar mejor con ellas mismas, cuando elegí estudiar psicología, encajó perfecto con mi proyecto de vida y amo el poder servir a los demás a través de las herramientas que ofrece mi profesión.
              </p>
              <p>
                Soy directora y fundadora de <strong className="text-apsid-500">APSID</strong>, donde te brindo junto con un equipo de especialistas la atención psicológica que requieres a través de diferentes programas: <em>Terapia individual – Terapia de Pareja – Terapia de grupo</em>.
              </p>
              <p>
                En <strong className="text-apsid-500">APSID-MANAOCA</strong> también brindamos un programa de desarrollo para potenciar las habilidades de los niños que les permiten construir una vida feliz y exitosa.
              </p>
              <p className="text-center italic text-apsid-400">
                Gracias por visitar mi página, te invito a visitar mis redes sociales para que conozcas más acerca de los programas que ofrecemos.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Formación Section */}
      <section className="py-20 px-4 bg-pastel-50">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <GraduationCap className="w-8 h-8 text-manaoca-400" />
                <h2 className="font-serif text-3xl md:text-4xl text-apsid-500">
                  Formación
                </h2>
              </div>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full"></div>
            </div>
          </SectionWrapper>
          
          <SectionWrapper delay={0.1}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <ul className="space-y-4">
                {formacion?.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-manaoca-400 flex-shrink-0 mt-1" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-pastel-100 text-center">
                <p className="text-apsid-500 font-medium">
                  Cédula Profesional: <span className="text-manaoca-500">5714016</span>
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Two Brands Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-apsid-500 mb-4">
                Nuestros Servicios
              </h2>
              <div className="w-20 h-1 bg-manaoca-400 mx-auto rounded-full"></div>
            </div>
          </SectionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionWrapper delay={0.1}>
              <Link href="/apsid" className="group block h-full">
                <div className="bg-pastel-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all group-hover:-translate-y-2 h-full border border-pastel-100">
                  <div className="relative w-36 h-36 mx-auto mb-6">
                    <Image
                      src="/assets/logo-apsid.png"
                      alt="Logo APSID"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-apsid-500 text-center mb-3">APSID</h3>
                  <p className="text-slate-500 text-center text-sm mb-4">
                    Atención Psicológica Integral y Desarrollo Humano
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-apsid-400">
                    <span className="flex items-center gap-1">
                      <Brain className="w-4 h-4" /> Psicología Clínica
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-center text-apsid-500 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Conocer más</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
              <Link href="/manaoca" className="group block h-full">
                <div className="bg-manaoca-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all group-hover:-translate-y-2 h-full border border-manaoca-100">
                  <div className="relative w-36 h-36 mx-auto mb-6">
                    <Image
                      src="/assets/logo-manaoca.png"
                      alt="Logo MANAOCA"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-manaoca-500 text-center mb-3">MANAOCA</h3>
                  <p className="text-slate-500 text-center text-sm mb-4">
                    Centro de Aprendizaje y Recreación
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-manaoca-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Educación & Desarrollo
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-center text-manaoca-500 group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Conocer más</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-apsid-500">
        <SectionWrapper>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl text-white mb-4">
              ¿Listo para dar el primer paso?
            </h2>
            <p className="text-pastel-100 mb-8">
              Agenda tu cita hoy y comienza el camino hacia el bienestar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/citas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-manaoca-400 text-white rounded-xl hover:bg-manaoca-500 transition-colors shadow-md hover:shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Agendar Cita
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors shadow-md border border-white/20"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="grid md:grid-cols-3 gap-8">
              <SectionWrapper delay={0.1}>
                <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-pastel-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-apsid-500" />
                  </div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-2">Empatía</h3>
                  <p className="text-slate-500 text-sm">
                    Cada persona es única. Escuchamos y comprendemos tu historia.
                  </p>
                </div>
              </SectionWrapper>
              <SectionWrapper delay={0.2}>
                <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-pastel-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-apsid-500" />
                  </div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-2">Profesionalismo</h3>
                  <p className="text-slate-500 text-sm">
                    Atención especializada con los más altos estándares de calidad.
                  </p>
                </div>
              </SectionWrapper>
              <SectionWrapper delay={0.3}>
                <div className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-pastel-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-manaoca-400" />
                  </div>
                  <h3 className="font-serif text-xl text-apsid-500 mb-2">Calidez</h3>
                  <p className="text-slate-500 text-sm">
                    Un ambiente acogedor donde te sentirás en confianza.
                  </p>
                </div>
              </SectionWrapper>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  )
}