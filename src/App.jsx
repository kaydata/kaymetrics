import { useState } from 'react'
import styles from './App.module.css'

const dashboards = [
  {
    id: 1,
    title: 'World Cup 2026',
    description:
      'Live standings, match results, top scorers and group stage tracker for the 2026 FIFA World Cup',
    category: 'Sports',
    link: 'https://worldcup-ochre.vercel.app',
    live: true,
  },
  {
    id: 2,
    title: 'Spotify Dashboard',
    description: 'Deep dives into listening trends, top artists, and the data behind the music',
    category: 'Music',
    link: null,
    live: false,
  },
  {
    id: 3,
    title: 'Netflix Insights',
    description: 'Trending titles, viewership patterns, and what the world is watching right now',
    category: 'Entertainment',
    link: null,
    live: false,
  },
  {
    id: 4,
    title: 'Amazon Tracker',
    description: 'Price trends, bestseller rankings, and marketplace dynamics across categories',
    category: 'E-Commerce',
    link: null,
    live: false,
  },
  {
    id: 5,
    title: 'YouTube Analytics',
    description: 'Channel growth, video performance, and trending content breakdown by niche',
    category: 'Social',
    link: null,
    live: false,
  },
  {
    id: 6,
    title: 'eBay Market Watch',
    description: 'Sold listings, price history, and demand signals across collectibles and goods',
    category: 'E-Commerce',
    link: null,
    live: false,
  },
]

const categories = ['All', ...new Set(dashboards.map((d) => d.category))]

function HeartbeatLine() {
  return (
    <svg
      className={styles.heartbeatLine}
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="pulseGlow" x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static metallic base line */}
      <line x1="0" y1="15" x2="1200" y2="15" stroke="#1f3a6e" strokeWidth="1" />

      {/* Traveling ECG pulse */}
      <g>
        <polyline
          points="0,15 22,15 28,11 32,15 38,2 44,27 49,9 54,15 90,15"
          stroke="#94a3b8"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pulseGlow)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-90 0"
          to="1200 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}

function KayMetricsLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="KayMetrics — Built for Decisions, Not Decorations"
    >
      {/* K vertical bar */}
      <rect x="103" y="8" width="17" height="104" rx="3" fill="white" />

      {/* K upper arm — white diagonal going upper-right */}
      <line x1="120" y1="12" x2="192" y2="55" stroke="white" strokeWidth="15" strokeLinecap="round" />

      {/* K lower arm — descending graph line going lower-right */}
      <polyline
        points="120,65 137,65 155,93 169,78 188,107"
        stroke="#3b82f6"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dot at bottom of graph line */}
      <circle cx="192" cy="107" r="7" fill="#3b82f6" />

      {/* KAYMETRICS wordmark */}
      <text
        x="160"
        y="152"
        textAnchor="middle"
        fill="white"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="4"
      >
        <tspan fill="white" fontWeight="800">KAY</tspan><tspan fill="#cbd5e1">METRICS</tspan>
      </text>

      {/* Tagline */}
      <text
        x="160"
        y="182"
        textAnchor="middle"
        fill="#64748b"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="8"
        fontWeight="400"
        letterSpacing="1.8"
      >
        BUILT FOR DECISIONS, NOT DECORATION
      </text>
    </svg>
  )
}

function DashboardCard({ dashboard }) {
  return (
    <div className={`${styles.card} ${!dashboard.live ? styles.cardMuted : ''}`}>
      <img src="/logos/kaymetrics-logo-fav.png" alt="" className={styles.cardKMark} />
      <span
        className={styles.categoryTag}
        data-coming={!dashboard.live ? 'true' : undefined}
      >
        {dashboard.category}
      </span>
      <h3 className={styles.cardTitle}>{dashboard.title}</h3>
      <p className={styles.cardDesc}>{dashboard.description}</p>
      {dashboard.live ? (
        <a
          href={dashboard.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewBtn}
        >
          <span className={styles.viewBtnText}>View Dashboard →</span>
</a>
      ) : (
        <span className={styles.comingSoonBadge}>Coming Soon</span>
      )}
    </div>
  )
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visible =
    activeFilter === 'All'
      ? dashboards
      : dashboards.filter((d) => d.category === activeFilter)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img src="/logos/kaymetrics-logo-fav.png" alt="KayMetrics" className={styles.headerIcon} />
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>Services</a>
            <a href="mailto:info@kaymetrics.com" className={styles.navLink}>Get in Touch</a>
            <a href="#" className={styles.navLink}>FAQs</a>
          </nav>
        </div>
        <HeartbeatLine />
      </header>

      <section className={styles.hero}>
        <img
          src="/logos/kms-logo.png"
          alt="KayMetrics"
          className={styles.heroLogo}
        />
        <p className={styles.heroSub}>Built for Decisions, Not Decorations</p>
      </section>

      <main className={styles.main}>
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterChip} ${activeFilter === cat ? styles.filterChipActive : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.map((d) => (
            <DashboardCard key={d.id} dashboard={d} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerCopy}>© 2026 KayMetrics</p>
        <div className={styles.footerLinks}>
          <a
            href="https://www.linkedin.com/in/deliverymanager-projectmanager/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerIconLink}
            aria-label="LinkedIn"
          >
            <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://vm.tiktok.com/ZNR39JFkt/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerIconLink}
            aria-label="TikTok"
          >
            <svg className={styles.footerIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
