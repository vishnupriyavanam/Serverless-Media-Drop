'use client'

import { useEffect, useState } from 'react'
import { Upload, HardDrive, Image, File } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function StatCards() {
  const [totalUploads, setTotalUploads] = useState(0)
  const [storageUsed, setStorageUsed] = useState('0 KB')
  const [images, setImages] = useState(0)
  const [documents, setDocuments] = useState(0)

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB'

    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`

    const mb = kb / 1024
    if (mb < 1024) return `${mb.toFixed(1)} MB`

    return `${(mb / 1024).toFixed(1)} GB`
  }

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('file_type, file_size')

    if (error) {
      console.error('STATS ERROR:', error)
      return
    }

    const files = data || []

    const totalSize = files.reduce(
      (sum, file) => sum + Number(file.file_size || 0),
      0
    )

    const imageCount = files.filter((file) =>
      file.file_type?.startsWith('image')
    ).length

    const documentCount = files.length - imageCount

    setTotalUploads(files.length)
    setStorageUsed(formatSize(totalSize))
    setImages(imageCount)
    setDocuments(documentCount)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const stats = [
    {
      label: 'Total Uploads',
      value: totalUploads,
      icon: <Upload className="w-5 h-5" />,
      color: 'from-blue-500/20 to-blue-600/5',
    },
    {
      label: 'Storage Used',
      value: storageUsed,
      icon: <HardDrive className="w-5 h-5" />,
      color: 'from-purple-500/20 to-purple-600/5',
    },
    {
      label: 'Images',
      value: images,
      icon: <Image className="w-5 h-5" />,
      color: 'from-green-500/20 to-green-600/5',
    },
    {
      label: 'Documents',
      value: documents,
      icon: <File className="w-5 h-5" />,
      color: 'from-orange-500/20 to-orange-600/5',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-card border border-border rounded-lg p-6 bg-gradient-to-br ${stat.color}`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {stat.icon}
            </div>
          </div>

          <p className="text-muted-foreground text-sm font-medium mb-1">
            {stat.label}
          </p>

          <p className="text-foreground text-2xl font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}