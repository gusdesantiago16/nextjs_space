'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const images = [
  '/assets/manaoca/gallery-1.png',
  '/assets/manaoca/gallery-2.png',
  '/assets/manaoca/gallery-3.jpg',
  '/assets/manaoca/gallery-4.jpg',
  '/assets/manaoca/gallery-5.png',
]

export default function ManaocaGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 3500)

    return () => clearInterval(autoplay)
  }, [emblaApi])

  return (
    <div className="overflow-hidden rounded-3xl shadow-2xl border-8 border-white bg-pastel-100" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 relative h-[400px] sm:h-[500px] md:h-[600px] mx-2 md:mx-4 overflow-hidden rounded-2xl" key={index}>
            <Image
              src={src}
              alt={`Actividad en Manaoca ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
