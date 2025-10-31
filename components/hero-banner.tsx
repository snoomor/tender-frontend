"use client"

import { useAuth } from "@/lib/auth-context"

export function HeroBanner() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center"
        style={{
          backgroundImage: "url('/images/design-mode/10.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-16 py-12 md:py-16 max-w-3xl mx-auto text-center w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-balance">
            Тендерная площадка DARS
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
            Приглашаем закупщиков и поставщиков к участию в закупочных процедурах DARS
          </p>
          <a
            href="/registration"
            className="inline-block bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all shadow-md hover:shadow-lg text-lg"
          >
            Регистрация
          </a>
        </div>
      </div>
    </section>
  )
}
