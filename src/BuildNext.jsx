import { useState, useEffect, useRef } from 'react'
import styles from './BuildNext.module.css'

const API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_ID}`
const HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
}

const DASHBOARDS = [
  { name: 'World Cup 2026',    status: 'Live Now' },
  { name: 'Spotify Dashboard', status: 'Coming Next' },
  { name: 'Netflix Insights',  status: 'Coming Soon' },
  { name: 'Amazon Tracker',    status: 'Coming Soon' },
  { name: 'YouTube Analytics', status: 'Coming Soon' },
  { name: 'eBay Market Watch', status: 'Coming Soon' },
]

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BuildNext() {
  const [ideaType, setIdeaType] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', email: '', dashboard: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [boardFilter, setBoardFilter] = useState('most-voted')
  const [newIdeaId, setNewIdeaId] = useState(null)
  const [votedIds, setVotedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('km_voted') || '{}') } catch { return {} }
  })
  const boardRef = useRef(null)

  useEffect(() => { fetchIdeas() }, [])

  async function fetchIdeas() {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}?pageSize=100`, { headers: HEADERS })
      const data = await res.json()
      setIdeas(data.records || [])
    } catch (e) {
      console.error('Failed to fetch ideas', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          records: [{
            fields: {
              'Idea Name': form.title,
              'Type': ideaType === 'new' ? 'New Dashboard' : 'Improvement',
              'Dashboard': form.dashboard || undefined,
              'Description': form.description,
              'Email': form.email || undefined,
              'Votes': 1,
              'Status': 'Under Review',
            },
          }],
        }),
      })
      const data = await res.json()
      const createdId = data.records?.[0]?.id
      setSubmitted(true)
      setForm({ title: '', description: '', email: '', dashboard: '' })
      setBoardFilter('newest')
      await fetchIdeas()
      if (createdId) {
        setNewIdeaId(createdId)
        setTimeout(() => setNewIdeaId(null), 4000)
      }
      setTimeout(() => boardRef.current?.scrollIntoView({ behavior: 'smooth' }), 400)
    } catch (e) {
      console.error('Submission failed', e)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVote(idea) {
    if (votedIds[idea.id]) return
    const currentVotes = idea.fields.Votes || 0
    try {
      await fetch(`${API_URL}/${idea.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ fields: { Votes: currentVotes + 1 } }),
      })
      const newVoted = { ...votedIds, [idea.id]: true }
      setVotedIds(newVoted)
      localStorage.setItem('km_voted', JSON.stringify(newVoted))
      setIdeas(prev => prev.map(i => i.id === idea.id
        ? { ...i, fields: { ...i.fields, Votes: currentVotes + 1 } }
        : i
      ))
    } catch (e) {
      console.error('Vote failed', e)
    }
  }

  const displayedIdeas = [...ideas]
    .filter(i => {
      if (boardFilter === 'new-dashboards') return i.fields.Type === 'New Dashboard'
      if (boardFilter === 'improvements') return i.fields.Type === 'Improvement'
      return true
    })
    .sort((a, b) => {
      if (boardFilter === 'newest') return new Date(b.createdTime) - new Date(a.createdTime)
      return (b.fields.Votes || 0) - (a.fields.Votes || 0)
    })

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>What Should I Build Next?</h1>
        <p className={styles.heroSub}>
          KayMetrics is built in public, and that means you get a say in what comes next.
          Got an idea for a new dashboard or a way to make an existing one better? Drop it below,
          vote on what you want to see, and I'll build the most wanted idea next.
        </p>
        <p className={styles.heroNote}>
          Every idea submitted goes live instantly. Every vote counts. The top idea each month gets built.
        </p>
      </section>

      {/* Form */}
      <div className={styles.formSection}>

        {!submitted ? (
          <>
            {/* Step 1 — type selector */}
            <p className={styles.stepLabel}>Step 1: What type of idea is this?</p>
            <div className={styles.typeCards}>
              <button
                className={`${styles.typeCard} ${ideaType === 'new' ? styles.typeCardActive : ''}`}
                onClick={() => setIdeaType('new')}
              >
                <span className={styles.typeCardTitle}>New Dashboard</span>
                <span className={styles.typeCardDesc}>I have an idea for a brand new dashboard</span>
              </button>
              <button
                className={`${styles.typeCard} ${ideaType === 'improve' ? styles.typeCardActive : ''}`}
                onClick={() => setIdeaType('improve')}
              >
                <span className={styles.typeCardTitle}>Improve a Dashboard</span>
                <span className={styles.typeCardDesc}>I want to suggest a feature or improvement</span>
              </button>
            </div>

            {/* Step 2 — form fields */}
            {ideaType && (
              <form className={styles.form} onSubmit={handleSubmit}>

                {ideaType === 'improve' && (
                  <div className={styles.field}>
                    <label className={styles.label}>Which dashboard?</label>
                    <select
                      className={styles.select}
                      value={form.dashboard}
                      onChange={e => setForm(f => ({ ...f, dashboard: e.target.value }))}
                      required
                    >
                      <option value="">Select a dashboard</option>
                      {DASHBOARDS.map(d => (
                        <option key={d.name} value={d.name}>{d.name} ({d.status})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={styles.field}>
                  <label className={styles.label}>What would you like to see?</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={ideaType === 'new' ? 'e.g. Premier League stats dashboard' : 'e.g. Top scorers filter by position'}
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Tell me more: why does this matter?</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="What would this help you understand or decide?"
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    Email{' '}
                    <span className={styles.labelOptional}>Optional: get notified if your idea wins</span>
                  </label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>

                <button className={styles.submitBtn} type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit My Idea →'}
                </button>
              </form>
            )}
          </>
        ) : (
          <div className={styles.successMsg}>
            <p className={styles.successTitle}>Your idea is live!</p>
            <p className={styles.successBody}>Scroll down to see it on the board and share it with someone who'd vote for it.</p>
            <button className={styles.anotherBtn} onClick={() => { setSubmitted(false); setIdeaType(null) }}>
              Submit another idea
            </button>
          </div>
        )}
      </div>

      {/* Idea Board */}
      <div className={styles.board} ref={boardRef}>
        <h2 className={styles.boardHeading}>The Idea Board</h2>

        <div className={styles.boardFilters}>
          {[
            { key: 'most-voted', label: 'Most Voted' },
            { key: 'newest', label: 'Newest' },
            { key: 'new-dashboards', label: 'New Dashboards' },
            { key: 'improvements', label: 'Improvements' },
          ].map(f => (
            <button
              key={f.key}
              className={`${styles.filterChip} ${boardFilter === f.key ? styles.filterChipActive : ''}`}
              onClick={() => setBoardFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className={styles.loadingText}>Loading ideas...</p>
        ) : displayedIdeas.length === 0 ? (
          <p className={styles.emptyText}>No ideas yet. Be the first to submit one above.</p>
        ) : (
          <div className={styles.ideaGrid}>
            {displayedIdeas.map(idea => {
              const voted = !!votedIds[idea.id]
              const votes = idea.fields.Votes || 0
              const isNew = idea.fields.Type === 'New Dashboard'
              const isHighlighted = idea.id === newIdeaId
              return (
                <div key={idea.id} className={`${styles.ideaCard} ${isHighlighted ? styles.ideaCardNew : ''}`}>
                  <div className={styles.ideaCardTop}>
                    <div className={styles.tags}>
                      <span className={`${styles.typeTag} ${isNew ? styles.typeTagNew : styles.typeTagImprove}`}>
                        {idea.fields.Type || 'Idea'}
                      </span>
                      {idea.fields.Dashboard && (
                        <span className={styles.dashTag}>
                          {isNew ? 'For: ' : ''}{idea.fields.Dashboard}
                        </span>
                      )}
                    </div>
                    <button
                      className={`${styles.voteBtn} ${voted ? styles.voteBtnVoted : ''}`}
                      onClick={() => handleVote(idea)}
                      disabled={voted}
                      title={voted ? 'Already voted' : 'Upvote this idea'}
                    >
                      <span className={styles.voteArrow}>▲</span>
                      <span className={styles.voteCount}>{votes}</span>
                    </button>
                  </div>

                  <h3 className={styles.ideaTitle}>{idea.fields['Idea Name']}</h3>
                  <p className={styles.ideaDesc}>{idea.fields.Description}</p>

                  <div className={styles.ideaMeta}>
                    <span className={`${styles.statusTag} ${styles[`status_${(idea.fields.Status || 'Under Review').replace(/\s/g, '_')}`]}`}>
                      {idea.fields.Status || 'Under Review'}
                    </span>
                    <span className={styles.ideaDate}>{formatDate(idea.createdTime)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <p className={styles.boardNote}>
          Ideas are reviewed monthly. The most voted idea gets built next, and if it was yours, I'll let you know.
        </p>
      </div>

    </div>
  )
}
