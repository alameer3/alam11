"use client"

import { Select } from '@/components/ui/select'
import { useState } from 'react'

interface Option {
  label: string
  value: string
}

interface FilterBarProps {
  categories: Option[]
  qualities: Option[]
  years: Option[]
  onChange: (state: { category: string; quality: string; year: string }) => void
}

export function FilterBar({ categories, qualities, years, onChange }: FilterBarProps) {
  const [category, setCategory] = useState('all')
  const [quality, setQuality] = useState('all')
  const [year, setYear] = useState('all')

  const emit = (c: string, q: string, y: string) => onChange({ category: c, quality: q, year: y })

  return (
    <div className="filter-bar bg-dark p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <select
        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-brand"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          emit(e.target.value, quality, year)
        }}
      >
        {categories.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-brand"
        value={quality}
        onChange={(e) => {
          setQuality(e.target.value)
          emit(category, e.target.value, year)
        }}
      >
        {qualities.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-brand"
        value={year}
        onChange={(e) => {
          setYear(e.target.value)
          emit(category, quality, e.target.value)
        }}
      >
        {years.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}