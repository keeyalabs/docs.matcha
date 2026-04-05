'use client'

import { usePathname } from 'next/navigation'

export function TocTitle() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return <>On this page</>
}
