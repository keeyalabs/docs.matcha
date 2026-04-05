'use client'

import cn from 'clsx'
import { cloneElement, type ReactNode } from 'react'
import { SkipNavContent } from 'nextra/components'
import { removeLinks } from 'nextra/remove-links'
// @ts-ignore internal Nextra import used to preserve wrapper behavior while customizing copy logic
import { Breadcrumb, Pagination, Sidebar, TOC } from '../node_modules/nextra-theme-docs/dist/components/index.js'
// @ts-ignore internal Nextra import used to preserve wrapper behavior while customizing copy logic
import { TOCProvider, useConfig, useThemeConfig } from '../node_modules/nextra-theme-docs/dist/stores/index.js'
import { SmartCopyPage } from '@/components/SmartCopyPage'

type WrapperProps = {
  toc: Array<{ value: string | ReactNode }>
  children: ReactNode
  metadata: {
    filePath?: string
    title?: string
    timestamp?: string
    searchable?: boolean
  }
  bottomContent?: ReactNode
  sourceCode?: string
}

function DocsClientWrapper({ children, metadata, bottomContent, sourceCode }: Omit<WrapperProps, 'toc'>) {
  const {
    activeType,
    activeThemeContext: themeContext,
    activePath
  } = useConfig().normalizePagesResult
  const themeConfig = useThemeConfig()
  const date = themeContext.timestamp && metadata.timestamp

  return (
    <>
      {(themeContext.layout === 'default' || themeContext.toc) && (
        <nav
          className="nextra-toc x:order-last x:max-xl:hidden x:w-64 x:shrink-0 x:print:hidden"
          aria-label="table of contents"
        >
          {themeContext.toc && <TOC filePath={metadata.filePath} pageTitle={metadata.title} />}
        </nav>
      )}
      <article
        className={cn(
          'x:w-full x:min-w-0 x:break-words x:min-h-[calc(100vh-var(--nextra-navbar-height))]',
          'x:text-slate-700 x:dark:text-slate-200 x:pb-8 x:px-4 x:pt-4 x:md:px-12',
          themeContext.typesetting === 'article' && 'nextra-body-typesetting-article'
        )}
      >
        {themeContext.breadcrumb && activeType !== 'page' && <Breadcrumb activePath={activePath} />}
        {themeContext.copyPage && sourceCode && <SmartCopyPage sourceCode={sourceCode} />}
        {children}
        {date ? (
          <div className="x:mt-12 x:mb-8 x:text-xs x:text-gray-600 x:text-end x:dark:text-gray-400">
            {cloneElement(themeConfig.lastUpdated, { date: new Date(date) })}
          </div>
        ) : (
          <div className="x:mt-16" />
        )}
        {themeContext.pagination && activeType !== 'page' && <Pagination />}
        {bottomContent}
      </article>
    </>
  )
}

export function DocsWrapper({
  toc,
  children,
  metadata,
  bottomContent,
  sourceCode,
  ...props
}: WrapperProps & Record<string, unknown>) {
  const cleanedToc = toc.map((item) => ({
    ...item,
    value: typeof item.value === 'string' ? removeLinks(item.value) : item.value
  }))

  return (
    <div className="x:mx-auto x:flex x:max-w-(--nextra-content-width)" {...props}>
      <TOCProvider value={cleanedToc}>
        <Sidebar />
        <DocsClientWrapper metadata={metadata} bottomContent={bottomContent} sourceCode={sourceCode}>
          <SkipNavContent />
          <main data-pagefind-body={metadata.searchable !== false || undefined}>{children}</main>
        </DocsClientWrapper>
      </TOCProvider>
    </div>
  )
}
