"use client"

interface Download {
  quality: string
  size: string
  url: string
}

interface DownloadLinksProps {
  downloads: Download[]
}

export function DownloadLinks({ downloads }: DownloadLinksProps) {
  return (
    <section id="download" className="my-12">
      <h2 className="text-xl font-semibold text-white mb-4">روابط التحميل</h2>
      <table className="w-full text-sm text-white border border-gray-700">
        <thead className="bg-dark">
          <tr>
            <th className="p-2 text-right">الجودة</th>
            <th className="p-2 text-right">الحجم</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((d) => (
            <tr key={d.url} className="border-t border-gray-700">
              <td className="p-2">{d.quality}</td>
              <td className="p-2">{d.size}</td>
              <td className="p-2 text-left">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="bg-brand hover:bg-brand/90 text-white px-4 py-1 rounded text-xs">تحميل</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}