'use client'

import { useEffect, useRef, useState } from 'react'
import { FileVideo, X, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

const ACCEPTED = ['video/mp4', 'video/quicktime', 'video/webm']
const ACCEPT_ATTR = '.mp4,.mov,.webm,video/mp4,video/quicktime,video/webm'
const MAX_MB = 200

interface Props {
  onSelect: (file: File, url: string, duration: number) => void
  onCancel: () => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function VideoUploader({ onSelect, onCancel }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const progressTimer = useRef<number | null>(null)

  useEffect(() => {
    inputRef.current?.click()
    return () => {
      if (progressTimer.current) window.clearInterval(progressTimer.current)
    }
  }, [])

  const reset = () => {
    if (url) URL.revokeObjectURL(url)
    setFile(null)
    setUrl(null)
    setDuration(0)
    setDone(false)
    setProgress(0)
    setError(null)
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const selected = files[0]
    const okType = ACCEPTED.includes(selected.type) || /\.(mp4|mov|webm)$/i.test(selected.name)
    if (!okType) {
      setError('Please choose an MP4, MOV, or WebM file.')
      return
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setError(`Please choose a file under ${MAX_MB} MB.`)
      return
    }

    setError(null)
    const objectUrl = URL.createObjectURL(selected)
    setFile(selected)
    setUrl(objectUrl)
    setDone(false)
    setProgress(0)

    const probe = document.createElement('video')
    probe.preload = 'metadata'
    probe.onloadedmetadata = () => setDuration(Math.round(probe.duration) || 0)
    probe.src = objectUrl

    // Simulated upload progress (no real backend in this phase).
    let pct = 0
    progressTimer.current = window.setInterval(() => {
      pct += Math.random() * 18 + 8
      if (pct >= 100) {
        pct = 100
        if (progressTimer.current) window.clearInterval(progressTimer.current)
        setDone(true)
      }
      setProgress(Math.round(pct))
    }, 180)
  }

  const handleConfirm = () => {
    if (file && url) onSelect(file, url, duration)
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!file && (
        <div className="text-center">
          <p className="text-sm text-muted">
            Choose an <strong className="text-ink">MP4</strong>,{' '}
            <strong className="text-ink">MOV</strong>, or{' '}
            <strong className="text-ink">WebM</strong> file.
          </p>
          {error && <p className="mt-2 text-xs text-danger">{error}</p>}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button onClick={() => inputRef.current?.click()}>Choose File</Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {file && (
        <div className="animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <FileVideo className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{file.name}</p>
              <p className="text-xs text-muted">
                {formatBytes(file.size)}
                {duration ? ` · ${duration}s` : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Remove video"
              className="rounded-lg p-1.5 text-muted transition hover:bg-line hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4">
            {!done ? (
              <>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">Uploading… {progress}%</p>
              </>
            ) : (
              <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Upload complete
              </p>
            )}
          </div>

          {error && <p className="mt-2 text-xs text-danger">{error}</p>}

          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={handleConfirm} disabled={!done}>
              Use This Video
            </Button>
            <Button variant="secondary" onClick={() => inputRef.current?.click()}>
              Replace
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
