'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'What is Matcha and who is it for?',
    answer: (
      <p>Matcha is an observability layer for AI workloads. It helps researchers and engineers understand how their training runs use compute.</p>
    )
  },
  {
    question: 'Does Matcha change my training?',
    answer: <p>No. Matcha runs alongside your workload and does not modify execution.</p>
  },
  {
    question: 'What does Matcha measure today?',
    answer: (
      <ul>
        <li>total energy</li>
        <li>runtime and average power</li>
        <li>step-level efficiency</li>
      </ul>
    )
  },
  {
    question: 'Does Matcha run locally?',
    answer: <p>Yes. Matcha is local-first. No data is sent unless enabled.</p>
  },
  {
    question: 'Is Matcha only for training?',
    answer: <p>Training is the starting point. Support for inference and agents is coming next.</p>
  },
  {
    question: 'Why not just use runtime or GPU utilization?',
    answer: <p>Runtime and utilization are indirect. Matcha measures energy directly, making efficiency and tradeoffs easier to see.</p>
  },
  {
    question: 'How is Matcha different from tools like nvidia-smi or NVML?',
    answer: (
      <>
        <p>Those tools expose raw metrics.</p>
        <p>Matcha turns them into workload-level insights you can compare and reason about.</p>
      </>
    )
  }
] as const

function HomeFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="home-faq">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
            </button>
            <div className="faq-panel" aria-hidden={!isOpen}>
              <div className="faq-answer">{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function HomeFaqRail() {
  const pathname = usePathname()

  if (pathname !== '/') return null

  return (
    <div className="home-rail">
      <h3>FAQs</h3>
      <HomeFaqAccordion />
    </div>
  )
}

export function HomeFaqInline() {
  return (
    <div className="home-faq-inline">
      <h2>FAQs</h2>
      <HomeFaqAccordion />
    </div>
  )
}
