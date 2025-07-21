"use client"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex justify-center mt-8 space-x-2 rtl:space-x-reverse">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border border-gray-700 text-sm hover:bg-brand hover:text-white transition-colors ${p === page ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300'}`}
        >
          {p}
        </button>
      ))}
    </nav>
  )
}