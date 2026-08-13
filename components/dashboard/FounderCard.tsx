'use client'

import { Mail, Phone, MapPin, Lock, Check, Clock, X } from 'lucide-react'
import type { FounderApplication, Match } from '@/lib/types'
import { labelSector, labelStage, labelLookingFor, labelDistrict } from '@/lib/options'
import Button from '@/components/ui/Button'

interface Props {
  app: FounderApplication
  match?: Match
  contactRevealed: boolean
  onExpressInterest: () => void
}

export default function FounderCard({ app, match, contactRevealed, onExpressInterest }: Props) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-ink">
            {app.ventureName || <span className="italic text-muted">Just an idea</span>}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {labelDistrict(app.district)}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
          {labelSector(app.sector)} · {labelStage(app.stage)}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium text-ink">{app.oneLiner}</p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{app.problem}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {(app.lookingFor ?? []).map((l) => (
          <span key={l} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
            {labelLookingFor(l)}
          </span>
        ))}
      </div>

      {/* Contact — gated */}
      <div className="mt-4 border-t border-line pt-4">
        {contactRevealed ? (
          <div className="space-y-1 rounded-xl bg-success/5 p-3">
            <p className="flex items-center gap-2 text-sm text-ink">
              <Mail className="h-4 w-4 text-success" aria-hidden="true" />
              {app.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-ink">
              <Phone className="h-4 w-4 text-success" aria-hidden="true" />
              {app.phone}
            </p>
          </div>
        ) : (
          <p className="flex items-center gap-2 text-xs text-muted">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            Contact details are revealed after an admin approves the match.
          </p>
        )}
      </div>

      {/* Action / status */}
      <div className="mt-4">
        {!match && (
          <Button variant="secondary" className="w-full" onClick={onExpressInterest}>
            Express interest
          </Button>
        )}
        {match?.status === 'interest' && (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-accent-soft px-3 py-2.5 text-sm text-accent">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Interest sent — awaiting admin approval
          </p>
        )}
        {(match?.status === 'admin_approved' || match?.status === 'connected') && (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-success/10 px-3 py-2.5 text-sm font-medium text-success">
            <Check className="h-4 w-4" aria-hidden="true" />
            Match approved — contact unlocked
          </p>
        )}
        {match?.status === 'declined' && (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-line px-3 py-2.5 text-sm text-muted">
            <X className="h-4 w-4" aria-hidden="true" />
            Not a match
          </p>
        )}
      </div>
    </article>
  )
}
