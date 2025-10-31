"use client"

import { useState, useMemo } from "react"
import { TenderFilters } from "./tender-filters"
import { TenderTable } from "./tender-table"
import { mockTenders } from "@/lib/mock-data"
import type { TenderCategory, TenderProcedure, TenderRegion } from "@/lib/types"

export function TendersSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<TenderCategory | "">("")
  const [selectedRegion, setSelectedRegion] = useState<TenderRegion | "">("")
  const [selectedProcedure, setSelectedProcedure] = useState<TenderProcedure | "">("")
  const [sortBy, setSortBy] = useState<"date" | "price">("date")

  const filteredAndSortedTenders = useMemo(() => {
    const filtered = mockTenders.filter((tender) => {
      const matchesSearch = tender.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || tender.category === selectedCategory
      const matchesRegion = !selectedRegion || tender.region === selectedRegion
      const matchesProcedure = !selectedProcedure || tender.procedure === selectedProcedure

      return matchesSearch && matchesCategory && matchesRegion && matchesProcedure
    })

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else {
        return b.initialPrice - a.initialPrice
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedRegion, selectedProcedure, sortBy])

  return (
    <section id="tenders" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Тендеры</h2>

        <div className="space-y-6">
          <TenderFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedProcedure={selectedProcedure}
            onProcedureChange={setSelectedProcedure}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <TenderTable tenders={filteredAndSortedTenders} />
        </div>
      </div>
    </section>
  )
}
