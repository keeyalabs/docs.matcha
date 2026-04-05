import type { MDXComponents } from 'nextra/mdx-components'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { DocsWrapper } from '@/components/DocsWrapper'

export function useMDXComponents(components: MDXComponents) {
  return getThemeComponents({
    wrapper: DocsWrapper as MDXComponents['wrapper'],
    ...components
  } as MDXComponents)
}
