"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface CustomMultiSelectProps {
  label: string
  value: string[]
  onChange: (value: string[]) => void
  options: { value: string; label: string; category?: string }[]
  placeholder?: string
  required?: boolean
  showSelectAll?: boolean
}

export function CustomMultiSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  showSelectAll = true,
}: CustomMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const handleSelectAll = () => {
    if (value.length === options.length) {
      onChange([])
    } else {
      onChange(options.map((opt) => opt.value))
    }
  }

  const getDisplayText = () => {
    if (value.length === 0) return placeholder || "Выберите"
    if (value.length === 1) return "Выбрана 1 группа"
    if (value.length < 5) return `Выбрано ${value.length} группы`
    return `Выбрано ${value.length} групп`
  }

  const groupedOptions = options.reduce(
    (acc, option) => {
      const category = option.category || "default"
      if (!acc[category]) acc[category] = []
      acc[category].push(option)
      return acc
    },
    {} as Record<string, typeof options>,
  )

  return (
    <div ref={selectRef} className="relative">
      <label className="block text-sm font-medium mb-2">
        {label} {required && "*"}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className={`text-sm ${value.length === 0 ? "text-muted-foreground" : "text-foreground"}`}>
          {getDisplayText()}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 space-y-3">
              {showSelectAll && (
                <label className="flex items-center gap-2 cursor-pointer font-medium border-b border-border pb-3 hover:bg-primary/10 px-2 py-1 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={value.length === options.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm">Выбрать всё</span>
                </label>
              )}

              {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                <div key={category}>
                  {category !== "default" && (
                    <div className="font-semibold text-sm text-accent mb-2 mt-2">{category}</div>
                  )}
                  <div className="space-y-2 pl-2">
                    {categoryOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 px-2 py-1 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={value.includes(option.value)}
                          onChange={() => handleToggle(option.value)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
