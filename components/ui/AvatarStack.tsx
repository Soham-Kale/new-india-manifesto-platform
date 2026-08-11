const DEFAULT_FACES = [
  '/images/social-activities.jpg',
  '/images/rally.jpg',
  '/images/community.jpg',
]

/**
 * Overlapping circular avatars + a count label — the Politian "56k+ people" proof.
 * `tone` controls text colour for light vs dark/photo backgrounds.
 */
// export default function AvatarStack({
//   faces = DEFAULT_FACES,
//   count = '56k+',
//   label = 'people in the movement',
//   tone = 'dark',
// }: {
//   faces?: string[]
//   count?: string
//   label?: string
//   tone?: 'light' | 'dark'
// }) {
//   const ring = tone === 'light' ? 'ring-white/70' : 'ring-canvas'
//   const countCls = tone === 'light' ? 'text-white' : 'text-ink'
//   const labelCls = tone === 'light' ? 'text-white/70' : 'text-muted'
//   return (
//     <div className="flex items-center gap-3.5">
//       <div className="flex -space-x-3">
//         {faces.map((src, i) => (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img
//             key={src + i}
//             src={src}
//             alt=""
//             aria-hidden="true"
//             className={`h-11 w-11 rounded-full object-cover ring-2 ${ring}`}
//           />
//         ))}
//       </div>
//       <div className="leading-tight">
//         <p className={`font-display text-lg font-bold ${countCls}`}>{count}</p>
//         <p className={`text-xs uppercase tracking-wide ${labelCls}`}>{label}</p>
//       </div>
//     </div>
//   )
// }
