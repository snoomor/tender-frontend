"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { LoginModal } from "./login-modal"
import { useAuth } from "@/lib/auth-context"
import { User, LogOut } from "lucide-react"

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const scrollToTenders = (e: React.MouseEvent) => {
    e.preventDefault()
    const tendersSection = document.getElementById("tenders")
    if (tendersSection) {
      tendersSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="flex items-center gap-3 group">
                <img src="/logo.svg" alt="DARS" className="h-7 transition-transform group-hover:scale-105" />
              </Link>

              {!isAuthenticated && (
                <nav className="hidden md:flex items-center gap-8">
                  <a
                    href="#tenders"
                    onClick={scrollToTenders}
                    className="text-foreground hover:text-accent transition-colors font-medium"
                  >
                    Тендеры
                  </a>
                  <Link
                    href="/registration"
                    className="text-foreground hover:text-accent transition-colors font-medium"
                  >
                    Регистрация
                  </Link>
                  <Link href="/regulations" className="text-foreground hover:text-accent transition-colors font-medium">
                    Регламент
                  </Link>
                </nav>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end text-sm">
                <a href="tel:+79093588409" className="text-foreground hover:text-accent font-medium">
                  +7 (909) 358 84 09
                </a>
                <a href="mailto:tender@dars.ru" className="text-muted-foreground hover:text-accent">
                tender@dars.ru
                </a>
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline font-medium">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-muted-foreground hover:text-red-600 transition-colors"
                    title="Выйти"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Войти
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
