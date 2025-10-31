"use client"

import { useState } from "react"
import type { TenderItem } from "@/lib/types"

interface SpecificationTableProps {
  items: TenderItem[]
}

export function SpecificationTable({ items }: SpecificationTableProps) {
  const [prices, setPrices] = useState<Record<string, number>>({})

  const handlePriceChange = (itemId: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setPrices((prev) => ({ ...prev, [itemId]: numValue }))
  }

  const calculateItemTotal = (itemId: string, quantity: number) => {
    const price = prices[itemId] || 0
    return price * quantity
  }

  const calculateGrandTotal = () => {
    return items.reduce((total, item) => {
      return total + calculateItemTotal(item.id, item.quantity)
    }, 0)
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">№</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Наименование товара</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Единица измерения</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Количество</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Цена товара, руб</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Стоимость товара</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700">{item.unit}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-900">{item.quantity}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={prices[item.id] || ""}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                  {calculateItemTotal(item.id, item.quantity).toLocaleString("ru-RU", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 border-t-2 border-gray-400">
              <td colSpan={5} className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                Итоговая сумма, руб
              </td>
              <td className="px-4 py-3 text-base text-right font-bold text-gray-900">
                {calculateGrandTotal().toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
