import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GeistPixelGrid } from 'geist/font/pixel'
import { HomeFaqRail } from '@/components/HomeFaq'
import { TocTitle } from '@/components/TocTitle'
import { getPageMap } from 'nextra/page-map'
import { Layout, Navbar } from 'nextra-theme-docs'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Matcha',
    template: '%s | Matcha'
  },
  description: 'Energy observability for AI workloads.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className={GeistMono.variable}>
        <Layout
          copyPageButton={false}
          darkMode={false}
          docsRepositoryBase="https://github.com/usematcha/usematcha.dev"
          editLink={null}
          feedback={{ content: null }}
          footer={null}
          navigation={false}
          navbar={
            <Navbar
              align="left"
              logo={
                <span className="brand-lockup">
                  <span className={`brand-mark ${GeistPixelGrid.className}`}>matcha</span>
                </span>
              }
          logoLink="https://usematcha.dev"
        >
          <a
            className="nav-icon-link nav-icon-link-docs"
            href="/"
            aria-label="Documentation"
            title="Documentation"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 2.8h7.5L21 8.3v9.9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4.8a2 2 0 0 1 2-2Zm7.5 0v4.4a1 1 0 0 0 1 1H21M9.5 11.2h5.6M9.5 14.6h5.6M9.5 18h3.3"
                  />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.6 6.2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10.2"
              />
              <circle cx="11.1" cy="7.7" r="1.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </a>
          <a
            className="nav-icon-link nav-icon-link-github"
            href="https://github.com/keeyalabs/usematcha"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58l-.02-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.37-1.33-1.73-1.33-1.73-1.09-.73.08-.72.08-.72 1.2.09 1.84 1.22 1.84 1.22 1.08 1.83 2.83 1.3 3.52.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.31-5.47-5.86 0-1.3.47-2.37 1.23-3.21-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.6 11.6 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.13 3.18.77.84 1.23 1.91 1.23 3.21 0 4.56-2.8 5.56-5.48 5.85.43.37.82 1.09.82 2.2l-.01 3.26c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"
              />
            </svg>
          </a>
          <a
            className="nav-link-secondary nav-icon-link"
            href="https://pypi.org/project/usematcha/"
            aria-label="PyPI"
            title="PyPI"
          >
            <img className="pypi-mark" src="/pypi-logo.png" alt="" />
          </a>
        </Navbar>
      }
      nextThemes={{ forcedTheme: 'light' }}
          pageMap={pageMap}
          search={null}
          sidebar={{
            autoCollapse: false,
            defaultMenuCollapseLevel: 1,
            defaultOpen: true,
            toggleButton: true
          }}
          toc={{
            backToTop: 'Back to top',
            extraContent: <HomeFaqRail />,
            title: <TocTitle />
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
