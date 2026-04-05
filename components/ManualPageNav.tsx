import Link from 'next/link'

type NavLink = {
  href: string
  label: string
}

type ManualPageNavProps = {
  prev?: NavLink
  next?: NavLink
}

export function ManualPageNav({ prev, next }: ManualPageNavProps) {
  if (!prev && !next) return null

  return (
    <nav className="custom-page-nav" aria-label="Page navigation">
      {prev ? (
        <Link className="custom-page-nav__link custom-page-nav__link--prev" href={prev.href}>
          <span className="custom-page-nav__title">← {prev.label}</span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link className="custom-page-nav__link custom-page-nav__link--next" href={next.href}>
          <span className="custom-page-nav__title">
            {next.label} <span aria-hidden="true">→</span>
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
