'use client'

import { useRef, useState } from 'react'
import { Cloud, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface UploadAreaProps {
  onUpload?: (files: File[]) => void
}

const BUCKET_NAME = 'Serverless-Media-Drop'
const MAX_FILE_SIZE = 10 * 1024 * 1024

export function UploadArea({ onUpload }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      setUploadStatus('error')
      setMessage('Please login before uploading.')
      return
    }

    const selectedFiles = Array.from(files)

    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadStatus('error')
        setMessage(`${file.name} is larger than 10MB`)
        return
      }
    }

    try {
      setUploadStatus('uploading')
      setProgress(20)
      setMessage('Uploading files...')

      for (const file of selectedFiles) {
        const filePath = `${user.id}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, file)

        if (uploadError) throw uploadError

        setProgress(70)

        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath)

        const { error: dbError } = await supabase.from('media').insert({
          user_id: user.id,
          file_name: file.name,
          file_url: data.publicUrl,
          file_type: file.type || 'unknown',
          file_size: file.size,
        })

        if (dbError) throw dbError
      }

      setProgress(100)
      setUploadStatus('success')
      setMessage('Upload successful!')
      onUpload?.(selectedFiles)

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error: any) {
      console.error('UPLOAD ERROR:', error)
      setUploadStatus('error')
      setProgress(20)
      setMessage(error?.message || 'Upload failed')
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card hover:border-primary/50'
          }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${isDragging ? 'bg-primary/20' : 'bg-primary/10'
              }`}
          >
            <Cloud className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>

          <div>
            <p className="text-foreground font-semibold">Drag and drop your files here</p>
            <p className="text-sm text-muted-foreground mt-1">or</p>
          </div>

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Choose files
          </Button>

          <p className="text-xs text-muted-foreground">
            Images, PDFs, and documents up to 10MB each
          </p>
        </div>
      </div>

      {uploadStatus !== 'idle' && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{message}</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>

          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${uploadStatus === 'success' ? 'bg-green-500' : 'bg-primary'
                }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            {uploadStatus === 'success' ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">Upload successful!</span>
              </>
            ) : uploadStatus === 'error' ? (
              <>
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">{message}</span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Processing your files...</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}