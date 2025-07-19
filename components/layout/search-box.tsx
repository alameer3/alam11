"use client"

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

export function SearchBox() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSearch = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`search-box px-5 ${isOpen ? 'open' : ''}`}>
      <div className="container search-container">
        <form action="/search" className="search-form" method="get">
          <label htmlFor="searchBoxInput" className="flex items-center h-full w-full m-0">
            <button type="submit" className="px-3 ml-2 text-3xl text-white">
              <Search className="w-6 h-6" />
            </button>
            <input
              type="search"
              name="q"
              id="searchBoxInput"
              placeholder="ابحث هنا"
              className="flex-1 py-3 px-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </label>
        </form>
        <div className="search-toggle" onClick={toggleSearch}>
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}