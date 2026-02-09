'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ShopPhotosSectionProps {
  photos: string[];
}

export default function ShopPhotosSection({ photos }: ShopPhotosSectionProps) {
  const [visiblePhotos, setVisiblePhotos] = useState<boolean[]>(
    new Array(photos.length).fill(false)
  );
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = photoRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisiblePhotos((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 100);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-12 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo}
              ref={(el) => {
                photoRefs.current[index] = el;
              }}
              className={`
                relative aspect-square overflow-hidden rounded-lg
                transition-all duration-1000 ease-out
                ${
                  visiblePhotos[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }
              `}
            >
              <Image
                src={photo}
                alt={`Shop interior ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
