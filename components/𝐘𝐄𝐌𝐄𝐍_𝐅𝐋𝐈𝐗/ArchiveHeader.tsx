"use client"

import Image from 'next/image'
import { ReactNode } from 'react'

interface ArchiveHeaderProps {
  title: string
  icon: ReactNode
  cover: string
}

export function ArchiveHeader({ title, icon, cover }: ArchiveHeaderProps) {
  return (
    <div
      className="archive-cover h-52 md:h-64 w-full bg-center bg-cover flex items-end"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="container mx-auto px-4 pb-4">
        <div className="flex items-center bg-dark bg-opacity-80 rounded p-4 w-max">
          <span className="text-3xl text-brand ml-3">{icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white m-0">{title}</h1>
        </div>
      </div>
    </div>
  )
}