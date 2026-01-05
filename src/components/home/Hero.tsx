"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "video",
      src: "https://res.cloudinary.com/imagehandlers/video/upload/v1767620532/comprof-2.mp4",
      videoUrl: "https://res.cloudinary.com/imagehandlers/video/upload/v1767462692/Al_Madeena_Islamic_School_1_1_1_sabknb.mp4",
      poster: "https://res.cloudinary.com/imagehandlers/video/upload/v1767620532/comprof-2.jpg",
      title: "Global Generation",
      subtitle: "Islamic Character",
      description: "Mewujudkan generasi global yang berkarakter Islami, cerdas, dan kompetitif, serta siap menjadi pemimpin masa depan yang Rahmatan Lil Alamin."
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/imagehandlers/image/upload/v1767450555/DSCF0358_ocxba2.jpg",
      title: "Tahfizh Program",
      subtitle: "Generasi Qur'ani",
      description: "Menanamkan kecintaan pada Al-Qur'an sejak dini melalui hafalan surat-surat pendek dengan metode leveling. Anak-anak dibimbing agar hafalannya kuat, fasih, dan tertanam dalam hati."
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/imagehandlers/image/upload/v1767343550/DSCF1514_kvjk2e.jpg",
      title: "Bilingual Environment",
      subtitle: "Global Communication",
      description: "Menerapkan lingkungan belajar dwibahasa (Bahasa Indonesia dan Bahasa Inggris) untuk menumbuhkan kemampuan komunikasi global tanpa meninggalkan nilai-nilai Islami."
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/imagehandlers/image/upload/v1767537054/DSCF0064.jpg",
      title: "Islamic Character",
      subtitle: "Akhlakul Karimah",
      description: "Menanamkan nilai-nilai keislaman dan akhlak mulia melalui pembiasaan harian: doa, adab, shalat berjamaah, dan perilaku baik dalam keseharian."
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/imagehandlers/image/upload/v1767463948/DSCF7891_jbilkp.jpg",
      title: "Integrasi Pendidikan",
      subtitle: "Berilmu & Berakhlak",
      description: "Menghadirkan program unggulan yang mengintegrasikan pendidikan Islam, kurikulum nasional, dan standar internasional untuk membentuk generasi berilmu, berakhlak, dan siap bersaing di era global."
    }
  ];

  const activeSlide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!activeSlide) return null;

  return (
    <section className="relative -mt-24 h-[120vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {activeSlide.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster={activeSlide.poster}
              >
                <source
                  src={activeSlide.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={activeSlide.src}
                alt={activeSlide.title || "Hero Background"}
                fill
                className="object-cover"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-black/0 z-10" />
      </div>

      {/* Navigation Arrows */}
      {/* Mobile: Top Left Diagonal Grouped */}
      <div className="absolute top-32 left-8 z-20 md:hidden">
        <div className="relative h-24 w-24">
          <button
            onClick={prevSlide}
            className="absolute top-0 left-0 flex h-12 w-12 rotate-45 items-center justify-center border border-white/70 bg-transparent text-white transition-all hover:bg-white hover:text-black active:scale-95"
            aria-label="Previous slide"
          >
            <svg className="h-5 w-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute bottom-0 right-0 flex h-12 w-12 rotate-45 items-center justify-center border border-white/70 bg-transparent text-white transition-all hover:bg-white hover:text-black active:scale-95"
            aria-label="Next slide"
          >
            <svg className="h-5 w-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: Side Aligned */}
      <button
        onClick={prevSlide}
        className="absolute left-8 -mt-20 top-1/2 z-20 -translate-y-1/2 hidden h-16 w-16 rotate-45 items-center justify-center border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black group md:flex"
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 -mt-20 top-1/2 z-20 -translate-y-1/2 hidden h-16 w-16 rotate-45 items-center justify-center border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black group md:flex"
        aria-label="Next slide"
      >
        <svg className="h-6 w-6 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end pb-56 md:pb-72 lg:pb-64 px-8 md:px-12 lg:px-16">
        <div className="flex w-full flex-col">

          {/* Divider Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 h-px w-full bg-white/50 md:mb-8"
          />

          {/* 3-Column Layout: Title | Description | Button */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full grid grid-cols-1 gap-6 items-start lg:grid-cols-12 md:gap-8"
          >
            {/* Column 1: Title (Approx 4 cols) */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold text-white leading-tight md:text-5xl">
                {activeSlide.title}
                <span className="block text-xl font-normal opacity-80 mt-2 md:text-3xl">
                  {activeSlide.subtitle}
                </span>
              </h2>
            </div>

            {/* Column 2: Description (Approx 5 cols) */}
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-white/90 md:text-xl">
                {activeSlide.description}
              </p>
            </div>

            {/* Column 3: Button (Approx 3 cols - End Aligned) */}
            <div className="lg:col-span-3 flex lg:justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black group md:px-8 md:py-4"
              >
                <span className="text-base font-semibold md:text-lg">Learn More</span>
                <svg
                  className="h-4 w-4 transform transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${index === currentSlide ? "w-12 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Video Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-5xl cursor-default overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Close video"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-video">
              <video
                className="h-full w-full"
                controls
                autoPlay
                playsInline
              >
                <source
                  src={(activeSlide as any).videoUrl || activeSlide.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}