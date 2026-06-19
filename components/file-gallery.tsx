'use client'

import { useEffect, useState } from 'react'
import { Heart, Download, Trash2, Eye, FileText, File, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FileItem {
  id: string
  user_id: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
  is_favorite: boolean
  created_at: string
}

type FilterType = 'all' | 'images' | 'pdf' | 'docs' | 'favorites'

export function FileGallery() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)

  const fetchFiles = async () => {
    setLoading(true)

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      setFiles([])
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('FETCH ERROR:', error)
      setLoading(false)
      return
    }

    setFiles(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const formatSize = (bytes: number) => {
    if (!bytes) return '0 KB'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const getFileCategory = (fileType?: string) => {
    const type = fileType || ''
    if (type.startsWith('image')) return 'image'
    if (type.toLowerCase().includes('pdf')) return 'pdf'
    return 'doc'
  }

  const filteredFiles = files.filter((file) => {
    const category = getFileCategory(file.file_type)

    if (filter === 'all') return true
    if (filter === 'images') return category === 'image'
    if (filter === 'pdf') return category === 'pdf'
    if (filter === 'docs') return category === 'doc'
    if (filter === 'favorites') return file.is_favorite
    return true
  })

  const toggleFavorite = async (file: FileItem) => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return

    const { error } = await supabase
      .from('media')
      .update({ is_favorite: !file.is_favorite })
      .eq('id', file.id)
      .eq('user_id', user.id)

    if (error) return console.error(error)

    setFiles((prev) =>
      prev.map((item) =>
        item.id === file.id ? { ...item, is_favorite: !item.is_favorite } : item
      )
    )
  }

  const deleteFile = async (file: FileItem) => {
    const confirmDelete = confirm(`Delete ${file.file_name}?`)
    if (!confirmDelete) return

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return

    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', file.id)
      .eq('user_id', user.id)

    if (error) return console.error(error)

    setFiles((prev) => prev.filter((item) => item.id !== file.id))
  }

  const getFileIcon = (fileType?: string) => {
    const category = getFileCategory(fileType)

    if (category === 'image') return <ImageIcon className="w-10 h-10" />
    if (category === 'pdf') return <File className="w-10 h-10" />
    return <FileText className="w-10 h-10" />
  }

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <p className="text-muted-foreground">Loading files...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-4 overflow-x-auto">
        {[
          { key: 'all', label: 'All' },
          { key: 'images', label: 'Images' },
          { key: 'pdf', label: 'PDFs' },
          { key: 'docs', label: 'Docs' },
          { key: 'favorites', label: 'Favorites' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key as FilterType)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${filter === item.key
                ? 'text-primary border-b-2 border-primary -mb-4'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => {
            const category = getFileCategory(file.file_type)

            return (
              <div
                key={file.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all"
              >
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  {category === 'image' ? (
                    <img
                      src={file.file_url}
                      alt={file.file_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground">
                      {getFileIcon(file.file_type)}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground truncate">
                      {file.file_name || 'Untitled file'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(file.file_size)} •{' '}
                      {file.created_at
                        ? new Date(file.created_at).toLocaleDateString()
                        : 'Recently'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(file)}
                      className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center ${file.is_favorite
                          ? 'bg-primary/20 text-primary'
                          : 'bg-secondary text-foreground'
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${file.is_favorite ? 'fill-current' : ''}`} />
                    </button>

                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </a>

                    <a
                      href={file.file_url}
                      download
                      className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground flex items-center justify-center"
                    >
                      <Download className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => deleteFile(file)}
                      className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground flex items-center justify-center hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-semibold mb-1">No files yet</h3>
          <p className="text-muted-foreground text-sm">Upload files to get started</p>
        </div>
      )}
    </div>
  )
}