"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // В реальном приложении здесь был бы API запрос
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-accent hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Вернуться на главную
          </Link>

          <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold">Восстановление пароля</h1>
                </div>

                <p className="text-muted-foreground mb-6">
                  Введите email, указанный при регистрации. Мы отправим вам ссылку для сброса пароля.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="example@company.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-foreground font-medium py-3 rounded-lg transition-colors"
                  >
                    Отправить ссылку
                  </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Вспомнили пароль?{" "}
                  <Link href="/" className="text-accent hover:underline">
                    Войти
                  </Link>
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-xl font-bold mb-3">Письмо отправлено!</h2>

                <p className="text-muted-foreground mb-6">
                  Мы отправили письмо на адрес <strong>{email}</strong> с инструкциями по восстановлению пароля.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-blue-900">
                    <strong>Что делать дальше:</strong>
                  </p>
                  <ol className="text-sm text-blue-800 mt-2 space-y-1 list-decimal list-inside">
                    <li>Проверьте почту (включая папку "Спам")</li>
                    <li>Перейдите по ссылке в письме</li>
                    <li>Установите новый пароль</li>
                  </ol>
                </div>

                <Link
                  href="/"
                  className="inline-block bg-primary hover:bg-primary-hover text-foreground font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Вернуться на главную
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
