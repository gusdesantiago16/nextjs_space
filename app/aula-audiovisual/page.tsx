'use client'

import { useState } from 'react'
import { Video, Headphones, FileText, FolderOpen, Play, Download } from 'lucide-react'
import SectionWrapper from '../components/section-wrapper'

const categorias = [
  { nombre: 'Psicología Infantil', icono: '🧠', id: 'psicologia' },
  { nombre: 'Crianza Positiva', icono: '❤️', id: 'crianza' },
  { nombre: 'Desarrollo Emocional', icono: '🌱', id: 'emocional' },
  { nombre: 'Educación', icono: '📚', id: 'educacion' },
]

export default function AulaAudiovisualPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-b from-pastel-100 to-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="text-center">
              <div className="w-16 h-16 bg-apsid-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-apsid-500" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-apsid-500 mb-4">Aula Audiovisual</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Recursos educativos en formato multimedia para aprender y crecer. Videos, podcasts y materiales descargables.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias?.map((cat, index) => (
              <button
                key={index}
                onClick={() => setCategoriaActiva(categoriaActiva === cat?.id ? null : cat?.id ?? null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm ${
                  categoriaActiva === cat?.id 
                    ? 'bg-apsid-500 text-white' 
                    : 'bg-pastel-50 text-apsid-500 hover:bg-pastel-100 border border-pastel-200'
                }`}
              >
                <span>{cat?.icono ?? ''}</span>
                <span>{cat?.nombre ?? ''}</span>
              </button>
            ))}
          </div>
          {categoriaActiva && (
            <p className="text-center text-slate-500 text-sm mt-4">
              Mostrando contenido de: <strong className="text-apsid-500">
                {categorias?.find(c => c?.id === categoriaActiva)?.nombre ?? ''}
              </strong>
            </p>
          )}
        </div>
      </section>

      {/* Videos */}
      <section className="py-12 px-4 bg-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Play className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="font-serif text-2xl text-apsid-500">Videos</h2>
            </div>
          </SectionWrapper>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3]?.map((item) => (
              <SectionWrapper key={item} delay={item * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-pastel-100">
                  <div className="aspect-video bg-pastel-100 flex items-center justify-center">
                    <div className="text-center text-apsid-300">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">Próximamente</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-apsid-500 mb-1">Video #{item}</h3>
                    <p className="text-sm text-slate-500">Contenido educativo próximamente disponible.</p>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Audios / Podcasts */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Headphones className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className="font-serif text-2xl text-apsid-500">Audios y Podcasts</h2>
            </div>
          </SectionWrapper>
          <div className="space-y-4">
            {[1, 2, 3]?.map((item) => (
              <SectionWrapper key={item} delay={item * 0.1}>
                <div className="bg-pastel-50 rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-pastel-100">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-apsid-500 mb-1">Episodio #{item}</h3>
                    <p className="text-sm text-slate-500">Contenido de audio próximamente disponible.</p>
                  </div>
                  <span className="px-4 py-2 bg-white text-apsid-500 rounded-xl text-sm border border-pastel-200">
                    Próximamente
                  </span>
                </div>
              </SectionWrapper>
            ))}
          </div>
          <div className="mt-8 p-4 bg-manaoca-50 rounded-2xl border-2 border-dashed border-manaoca-200 text-center">
            <p className="text-manaoca-600 text-sm">
              <strong>Nota:</strong> Esta sección está preparada para embeber contenido de iVoox y otras plataformas de audio.
            </p>
          </div>
        </div>
      </section>

      {/* Recursos Descargables */}
      <section className="py-12 px-4 bg-pastel-50">
        <div className="max-w-6xl mx-auto">
          <SectionWrapper>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="font-serif text-2xl text-apsid-500">Recursos Descargables</h2>
            </div>
          </SectionWrapper>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { nombre: 'Guía de Crianza Positiva', tipo: 'PDF' },
              { nombre: 'Ejercicios de Regulación Emocional', tipo: 'PDF' },
              { nombre: 'Actividades para el Desarrollo', tipo: 'PDF' },
              { nombre: 'Tips para Padres', tipo: 'PDF' },
            ]?.map((recurso, index) => (
              <SectionWrapper key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-all border border-pastel-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-apsid-500">{recurso?.nombre ?? ''}</h3>
                    <p className="text-xs text-slate-400">{recurso?.tipo ?? ''}</p>
                  </div>
                  <span className="flex items-center gap-1 px-3 py-2 bg-pastel-100 text-apsid-500 rounded-xl text-sm">
                    <Download className="w-4 h-4" />
                    Próximamente
                  </span>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Mensaje */}
      <section className="py-12 px-4 bg-apsid-500">
        <SectionWrapper>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white">
              Estamos preparando contenido valioso para ti. Pronto encontrarás aquí videos, podcasts y recursos descargables sobre psicología, desarrollo infantil y crianza positiva.
            </p>
          </div>
        </SectionWrapper>
      </section>
    </div>
  )
}