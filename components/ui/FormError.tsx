import { AlertCircle } from 'lucide-react'

export default function FormError({
  message,
  id,
}: {
  message?: string
  id?: string
}) {
  if (!message) return null
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-xs text-danger animate-fade-in"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
