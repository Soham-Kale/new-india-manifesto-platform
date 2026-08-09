'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Circle, Square, RotateCcw, Check, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const MAX_SECONDS = 60

interface Props {
  onUse: (file: File, url: string, duration: number) => void
  onCancel: () => void
}

type Phase = 'preview' | 'recording' | 'review'

function pickMimeType(): string {
  const candidates = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ]
  for (const type of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type
    }
  }
  return ''
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function VideoRecorder({ onUse, onCancel }: Props) {
  const liveVideoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const elapsedRef = useRef(0)

  const [phase, setPhase] = useState<Phase>('preview')
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [recorded, setRecorded] = useState<{ file: File; url: string; duration: number } | null>(
    null,
  )

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  const initCamera = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      })
      streamRef.current = stream
      if (liveVideoRef.current) liveVideoRef.current.srcObject = stream
    } catch (err) {
      const name = (err as DOMException)?.name
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        setError(
          'Camera and microphone access was blocked. Please allow permissions, or upload a video instead.',
        )
      } else if (name === 'NotFoundError') {
        setError('No camera or microphone was found. Please upload a video instead.')
      } else {
        setError('We could not access your camera. Please upload a video instead.')
      }
    }
  }, [])

  useEffect(() => {
    void initCamera()
    return () => {
      stopTimer()
      stopStream()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase === 'preview' && streamRef.current && liveVideoRef.current) {
      liveVideoRef.current.srcObject = streamRef.current
    }
  }, [phase])

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      recorderRef.current.stop()
    }
    stopTimer()
  }, [stopTimer])

  const startRecording = useCallback(() => {
    if (!streamRef.current) return
    const mimeType = pickMimeType()
    let recorder: MediaRecorder
    try {
      recorder = mimeType
        ? new MediaRecorder(streamRef.current, { mimeType })
        : new MediaRecorder(streamRef.current)
    } catch {
      setError('Recording is not supported in this browser. Please upload a video.')
      return
    }

    chunksRef.current = []
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    recorder.onstop = () => {
      const type = mimeType || 'video/webm'
      const blob = new Blob(chunksRef.current, { type })
      const ext = type.includes('mp4') ? 'mp4' : 'webm'
      const file = new File([blob], `introduction.${ext}`, { type })
      const url = URL.createObjectURL(blob)
      setRecorded((prev) => {
        if (prev) URL.revokeObjectURL(prev.url)
        return { file, url, duration: elapsedRef.current }
      })
      setPhase('review')
    }

    recorderRef.current = recorder
    recorder.start()
    setElapsed(0)
    elapsedRef.current = 0
    setPhase('recording')

    timerRef.current = window.setInterval(() => {
      elapsedRef.current += 1
      setElapsed(elapsedRef.current)
      if (elapsedRef.current >= MAX_SECONDS) stopRecording()
    }, 1000)
  }, [stopRecording])

  const handleRecordAgain = useCallback(() => {
    if (recorded) URL.revokeObjectURL(recorded.url)
    setRecorded(null)
    setElapsed(0)
    elapsedRef.current = 0
    setPhase('preview')
  }, [recorded])

  const handleUse = useCallback(() => {
    if (!recorded) return
    stopStream()
    onUse(recorded.file, recorded.url, recorded.duration)
  }, [recorded, onUse, stopStream])

  const handleCancel = useCallback(() => {
    stopTimer()
    stopStream()
    if (recorded) URL.revokeObjectURL(recorded.url)
    onCancel()
  }, [onCancel, recorded, stopStream, stopTimer])

  if (error) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <p className="text-sm text-danger">{error}</p>
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" onClick={handleCancel}>
            Back to options
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-black">
      <div className="relative aspect-video w-full">
        <video
          ref={liveVideoRef}
          autoPlay
          playsInline
          muted
          className={`h-full w-full object-cover ${phase === 'review' ? 'hidden' : 'block'} -scale-x-100`}
        />
        {phase === 'review' && recorded && (
          <video src={recorded.url} controls playsInline className="h-full w-full object-cover" />
        )}

        {phase === 'recording' && (
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-medium tabular-nums text-white">
              {formatTime(elapsed)} / {formatTime(MAX_SECONDS)}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCancel}
          aria-label="Cancel recording"
          className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white/90 backdrop-blur transition hover:bg-black/70"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 bg-canvas p-4">
        {phase === 'preview' && (
          <Button onClick={startRecording}>
            <Circle className="h-4 w-4 fill-red-500 text-red-500" aria-hidden="true" />
            Start Recording
          </Button>
        )}
        {phase === 'recording' && (
          <Button variant="secondary" onClick={stopRecording}>
            <Square className="h-4 w-4 fill-ink text-ink" aria-hidden="true" />
            Stop Recording
          </Button>
        )}
        {phase === 'review' && (
          <>
            <Button variant="secondary" onClick={handleRecordAgain}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Record Again
            </Button>
            <Button onClick={handleUse}>
              <Check className="h-4 w-4" aria-hidden="true" />
              Use This Video
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
