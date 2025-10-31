"use client"

import { notFound, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { mockTenders } from "@/lib/mock-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SpecificationTable } from "@/components/specification-table"
import { useState } from "react"

const categoryLabels = {
  materials: "Материалы",
  contracting: "Подрядные работы",
  all: "Все",
}

const procedureLabels = {
  auction: "Аукцион",
  request_for_proposals: "Запрос предложений",
}

export default function TenderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [showNotification, setShowNotification] = useState(false)
  const router = useRouter()
  const { id } = params
  const tender = mockTenders.find((t) => t.id === id)

  if (!tender) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })} (по мск)`
  }

  const handleSubmit = () => {
    setShowNotification(true)
  }

  const handleCloseNotification = () => {
    setShowNotification(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться к списку тендеров
        </Link>

        <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded">
                Лот № {tender.lotNumber}
              </span>
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded">
                {procedureLabels[tender.procedure]}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{tender.name}</h1>
          </div>

          <div className="mb-8 pb-6 border-b border-gray-300">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Данные для заполнения спецификации</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Период поставки:</span>{" "}
                <span className="text-accent">
                  с {tender.deliveryPeriod ? formatDate(tender.deliveryPeriod.start) : "01.11.2025"} по{" "}
                  {tender.deliveryPeriod ? formatDate(tender.deliveryPeriod.end) : "01.07.2026"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Дата заполнения:</span>{" "}
                <span className="text-accent">
                  {tender.fillDate ? formatDate(tender.fillDate) : formatDate(new Date().toISOString())}
                </span>
              </p>
              <p>
                <span className="font-semibold">Дата окончания:</span>{" "}
                <span className="text-accent">
                  {tender.endDate ? formatDateTime(tender.endDate) : "31.10.2025 16:00 (по мск)"}
                </span>
              </p>
            </div>
          </div>

          {tender.items && tender.items.length > 0 && (
            <div className="mb-8">
              <SpecificationTable items={tender.items} />
            </div>
          )}

          <div className="border-t border-gray-300 pt-8 mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Информация для формирования доп. соглашения</h2>
            <div className="space-y-5 max-w-2xl">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@company.ru"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="signatory" className="block text-sm font-semibold text-gray-900 mb-2">
                  Лицо имеющее право подписи <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="signatory"
                  placeholder="Иванов Иван Иванович"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="basis" className="block text-sm font-semibold text-gray-900 mb-2">
                  Действующее на основании <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="basis"
                  placeholder="Устава / Доверенности"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Документы:</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-accent hover:underline cursor-pointer">
                <span className="font-medium">1)</span>
                <a href="#" className="hover:text-accent/80">
                  Извещение
                </a>
              </li>
              <li className="flex items-center gap-2 text-accent hover:underline cursor-pointer">
                <span className="font-medium">2)</span>
                <a href="#" className="hover:text-accent/80">
                  Форма КП для заполнения
                </a>
              </li>
              <li className="flex items-center gap-2 text-accent hover:underline cursor-pointer">
                <span className="font-medium">3)</span>
                <a href="#" className="hover:text-accent/80">
                  Типовая форма договора
                </a>
              </li>
              <li className="flex items-center gap-2 text-accent hover:underline cursor-pointer">
                <span className="font-medium">4)</span>
                <a href="#" className="hover:text-accent/80">
                  Тех.задание СМР по витражам
                </a>
              </li>
              <li className="flex items-center gap-2 text-accent hover:underline cursor-pointer">
                <span className="font-medium">5)</span>
                <a href="#" className="hover:text-accent/80">
                  Документы для аккредитации
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              Отправить предложение
            </button>
          </div>
        </div>

        {showNotification && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in zoom-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Запрос отправлен!</h3>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 leading-relaxed">Ваше предложение успешно отправлено заказчику.</p>
                <p className="text-gray-700 leading-relaxed">
                  Если ваша заявка будет выбрана, с вами свяжутся в ближайшее время по указанным контактным данным.
                </p>
                <p className="text-sm text-gray-500 mt-4">Спасибо за участие в тендере!</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseNotification}
                  className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Понятно
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
