"use client"

import { type Tender, REGION_LABELS, CATEGORY_LABELS, PROCEDURE_LABELS } from "@/lib/types"
import { Eye } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface TenderTableProps {
  tenders: Tender[]
}

export function TenderTable({ tenders }: TenderTableProps) {
  const { user } = useAuth()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleViewTender = (tenderId: string) => {
    if (!user) {
      router.push("/registration")
    } else {
      router.push(`/tenders/${tenderId}`)
    }
  }

  if (tenders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground text-lg">Тендеры не найдены</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">№ Лота</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Наименование закупки</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Начальная цена</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Категория</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Тип процедуры</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Регион</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Дата проведения</th>
              <th className="px-6 py-4 text-left text-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender, index) => (
              <tr
                key={tender.id}
                className={`transition-colors hover:bg-primary/5 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 text-sm font-medium">{tender.lotNumber}</td>
                <td className="px-6 py-4 text-sm">{tender.name}</td>
                <td className="px-6 py-4 text-sm font-medium">{formatPrice(tender.initialPrice)}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground">
                    {CATEGORY_LABELS[tender.category]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{PROCEDURE_LABELS[tender.procedure]}</td>
                <td className="px-6 py-4 text-sm">{REGION_LABELS[tender.region]}</td>
                <td className="px-6 py-4 text-sm">{formatDate(tender.date)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewTender(tender.id)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-primary/10 transition-colors"
                    title="Просмотреть тендер"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
