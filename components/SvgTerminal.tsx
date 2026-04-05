type OutputLine =
  | string
  | {
      text: string
      tone?: 'default' | 'muted' | 'dim'
    }

type SvgTerminalProps = {
  commands?: string[]
  outputs?: OutputLine[]
  showPrompt?: boolean
}

const WIDTH = 760
const INNER_X = 40
const INNER_Y = 24
const INNER_WIDTH = 680
const LINE_HEIGHT = 28

function normalizeOutput(line: OutputLine) {
  if (typeof line === 'string') {
    return { text: line, tone: 'default' as const }
  }

  return { text: line.text, tone: line.tone ?? 'default' }
}

export function SvgTerminal({
  commands = [],
  outputs = [],
  showPrompt = true
}: SvgTerminalProps) {
  const normalizedOutputs = outputs.map(normalizeOutput)
  const commandCount = commands.length
  const outputCount = normalizedOutputs.length
  const lineCount = commandCount + outputCount
  const separator = commandCount > 0 && outputCount > 0
  const height = 56 + lineCount * LINE_HEIGHT + (separator ? 20 : 0)

  let currentY = INNER_Y + 26

  const commandNodes = commands.map((command, index) => {
    const y = currentY
    currentY += LINE_HEIGHT

    return (
      <g key={`command-${index}`}>
        {showPrompt ? (
          <>
            <text className="mono-dim" x="60" y={y} dominantBaseline="central">
              $
            </text>
            <text className="mono" x="76" y={y} dominantBaseline="central">
              {command}
            </text>
          </>
        ) : (
          <text className="mono" x="60" y={y} dominantBaseline="central">
            {command}
          </text>
        )}
      </g>
    )
  })

  const separatorY = separator ? currentY + 8 : null
  if (separator) currentY += 28

  const outputNodes = normalizedOutputs.map((line, index) => {
    const y = currentY
    currentY += LINE_HEIGHT
    const className =
      line.tone === 'muted' ? 'mono-muted' : line.tone === 'dim' ? 'mono-dim' : 'mono'

    return (
      <text key={`output-${index}`} className={className} x="60" y={y} dominantBaseline="central">
        {line.text}
      </text>
    )
  })

  return (
    <div className="svg-terminal">
      <svg width="100%" viewBox={`0 0 ${WIDTH} ${height}`} xmlns="http://www.w3.org/2000/svg" aria-label="Terminal output">
        <style>
          {`
            text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
            .mono { font-size: 12px; font-weight: 400; fill: #2C2C2A; font-family: "SF Mono", "Fira Code", "Consolas", monospace; }
            .mono-dim { font-size: 12px; font-weight: 400; fill: #888780; font-family: "SF Mono", "Fira Code", "Consolas", monospace; }
            .mono-muted { font-size: 12px; font-weight: 400; fill: #B4B2A9; font-family: "SF Mono", "Fira Code", "Consolas", monospace; }
            .terminal { fill: #F8F7F4; stroke: #D3D1C7; stroke-width: 0.5; }
          `}
        </style>

        <rect className="terminal" x={INNER_X} y={INNER_Y} width={INNER_WIDTH} height={height - INNER_Y * 2} rx="8" />
        {commandNodes}
        {separatorY ? (
          <line
            x1="60"
            y1={separatorY}
            x2="700"
            y2={separatorY}
            stroke="#D3D1C7"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />
        ) : null}
        {outputNodes}
      </svg>
    </div>
  )
}
