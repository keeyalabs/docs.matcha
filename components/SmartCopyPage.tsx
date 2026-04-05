'use client'

import clsx from 'clsx'
import { type ComponentType, useMemo } from 'react'
import { Button, Select } from 'nextra/components'
import { useCopy } from 'nextra/hooks'
import {
  ArrowRightIcon,
  ChatGPTIcon,
  ClaudeIcon,
  CopyIcon,
  LinkArrowIcon
} from 'nextra/icons'

type SmartCopyPageProps = {
  sourceCode: string
}

type ItemProps = {
  icon: ComponentType<{ width?: string; height?: string; className?: string }>
  title: string
  description: string
  isExternal?: boolean
}

function CopyMenuItem({ icon: Icon, title, description, isExternal }: ItemProps) {
  return (
    <div className="x:flex x:gap-3 x:items-center">
      <Icon width="16" />
      <div className="x:flex x:flex-col">
        <span className="x:font-medium x:flex x:gap-1">
          {title}
          {isExternal && <LinkArrowIcon height="1em" />}
        </span>
        <span className="x:text-xs">{description}</span>
      </div>
    </div>
  )
}

function decodeHtml(value: string) {
  return value
    .replace(/\u200B/g, '')
    .replace(/&#8203;/g, '')
    .replace(/&#x2D;/gi, '-')
    .replace(/&#45;/g, '-')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function normalizeText(value: string) {
  return decodeHtml(value).replace(/\s+/g, ' ').trim()
}

function extractSvgText(svg: string) {
  const label = svg.match(/aria-label="([^"]+)"/)?.[1]
  const lines = Array.from(svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g))
    .map((match) => normalizeText(match[1]))
    .filter(Boolean)

  const uniqueLines = lines.filter((line, index) => index === 0 || line !== lines[index - 1])
  const output = label ? [`Diagram: ${decodeHtml(label)}`, ...uniqueLines] : uniqueLines

  return output.join('\n')
}

function buildCopyText(sourceCode: string) {
  let cleaned = sourceCode
    .replace(/^---\n[\s\S]*?\n---\n*/m, '')
    .replace(/^import .*$/gm, '')
    .replace(/<ManualPageNav[\s\S]*?\/>/g, '')
    .replace(/<HomeFaqInline\s*\/>/g, '')
    .replace(/<HomeFaqRail\s*\/>/g, '')

  cleaned = cleaned.replace(/<svg\b[\s\S]*?<\/svg>/g, (svg) => {
    const text = extractSvgText(svg)
    return text ? `\n\n${text}\n\n` : '\n\n'
  })

  cleaned = cleaned
    .replace(/<\/?div[^>]*>/g, '')
    .replace(/^\s+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return cleaned
}

export function SmartCopyPage({ sourceCode }: SmartCopyPageProps) {
  const { copy, isCopied } = useCopy()
  const prepared = useMemo(() => buildCopyText(sourceCode), [sourceCode])

  return (
    <div className="smart-copy-page x:float-end">
      <div className="x:border x:inline-flex x:rounded-md x:items-stretch nextra-border x:overflow-hidden">
        <Button
          className={(state) =>
            clsx(
              'x:ps-2 x:pe-1 x:flex x:gap-2 x:text-sm x:font-medium x:items-center',
              isCopied && 'x:opacity-70',
              state.hover &&
                'x:bg-gray-200 x:text-gray-900 x:dark:bg-primary-100/5 x:dark:text-gray-50'
            )
          }
          onClick={() => copy(prepared)}
        >
          <CopyIcon width="16" />
          {isCopied ? 'Copied' : 'Copy page'}
        </Button>
        <Select
          anchor={{ to: 'bottom end', gap: 10 }}
          className="x:rounded-none"
          options={[
            {
              id: 'copy',
              name: (
                <CopyMenuItem
                  icon={CopyIcon}
                  title="Copy page"
                  description="Copy page as Markdown for LLMs"
                />
              )
            },
            {
              id: 'chatgpt',
              name: (
                <CopyMenuItem
                  icon={ChatGPTIcon}
                  title="Open in ChatGPT"
                  description="Ask questions about this page"
                  isExternal
                />
              )
            },
            {
              id: 'claude',
              name: (
                <CopyMenuItem
                  icon={ClaudeIcon}
                  title="Open in Claude"
                  description="Ask questions about this page"
                  isExternal
                />
              )
            }
          ]}
          value=""
          selectedOption={<ArrowRightIcon width="12" className="x:rotate-90" />}
          onChange={(value) => {
            if (value === 'copy') {
              copy(prepared)
              return
            }

            const url =
              value === 'chatgpt'
                ? 'https://chatgpt.com/?hints=search&prompt='
                : 'https://claude.ai/new?q='
            const query = `Read from ${location.href} so I can ask questions about it.`
            window.open(`${url}${encodeURIComponent(query)}`, '_blank')
          }}
        />
      </div>
    </div>
  )
}
