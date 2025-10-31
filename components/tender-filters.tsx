"use client"

import { Search } from "lucide-react"
import { CustomSelect } from "./custom-select"
import {
  type TenderCategory,
  type TenderProcedure,
  type TenderRegion,
  REGION_LABELS,
  CATEGORY_LABELS,
  PROCEDURE_LABELS,
} from "@/lib/types"

interface TenderFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategory: TenderCategory | ""
  onCategoryChange: (value: TenderCategory | "") => void
  selectedRegion: TenderRegion | ""
  onRegionChange: (value: TenderRegion | "") => void
  selectedProcedure: TenderProcedure | ""
  onProcedureChange: (value: TenderProcedure | "") => void
  sortBy: "date" | "price"
  onSortChange: (value: "date" | "price") => void
}

export function TenderFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRegion,
  onRegionChange,
  selectedProcedure,
  onProcedureChange,
  sortBy,
  onSortChange,
}: TenderFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по наименованию закупки..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CustomSelect
          label="Категория"
          value={selectedCategory}
          onChange={(value) => onCategoryChange(value as TenderCategory | "")}
          options={[
            { value: "", label: "Все категории" },
            { value: "materials", label: CATEGORY_LABELS.materials },
            { value: "contracting", label: CATEGORY_LABELS.contracting },
          ]}
          placeholder="Все категории"
        />

        <CustomSelect
          label="Регион"
          value={selectedRegion}
          onChange={(value) => onRegionChange(value as TenderRegion | "")}
          options={[
            { value: "", label: "Все регионы" },
            ...Object.entries(REGION_LABELS).map(([key, label]) => ({
              value: key,
              label,
            })),
          ]}
          placeholder="Все регионы"
        />

        <CustomSelect
          label="Тип процедуры"
          value={selectedProcedure}
          onChange={(value) => onProcedureChange(value as TenderProcedure | "")}
          options={[
            { value: "", label: "Все типы" },
            { value: "auction", label: PROCEDURE_LABELS.auction },
            { value: "request_for_proposals", label: PROCEDURE_LABELS.request_for_proposals },
          ]}
          placeholder="Все типы"
        />

        <CustomSelect
          label="Сортировка"
          value={sortBy}
          onChange={(value) => onSortChange(value as "date" | "price")}
          options={[
            { value: "date", label: "По дате" },
            { value: "price", label: "По цене" },
          ]}
        />
      </div>
    </div>
  )
}
