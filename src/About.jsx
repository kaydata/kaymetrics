import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroHeading}>
          About Kay<span className={styles.metricsBlue}>Metrics</span>
        </h1>
      </section>

      <div className={styles.content}>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>The Name</h2>
          <p className={styles.body}>
            KayMetrics starts with <strong>Kay</strong>, short for Kaylan, my son's name.
            It ends with <strong>Metrics</strong>, because whether you're running a project,
            a business, or a football team, life is full of them.
          </p>
          <p className={styles.body}>
            Putting the two together felt right. Something personal driving something purposeful.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Why This Exists</h2>
          <p className={styles.body}>
            After years delivering projects across SaaS, ecommerce, hospitality, and sports tech,
            one thing was consistent across all of it: the teams that made the best decisions were
            the ones who could actually see their data clearly.
          </p>
          <p className={styles.body}>
            Not buried in spreadsheets. Not locked in reports nobody reads. Actually visible,
            interactive, and built for the moment a decision needs to be made.
          </p>
          <p className={styles.body}>
            I kept seeing the same gap. The data existed, the insight was there, but the bridge
            between the two wasn't. So I decided to build that bridge, one dashboard at a time.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>What KayMetrics Is</h2>
          <p className={styles.body}>
            KayMetrics is a growing portfolio of interactive data dashboards. Each one takes a
            dataset (sports, music, business) and turns it into something you can actually
            explore, question, and learn from.
          </p>
          <p className={styles.body}>
            Every dashboard is built for decisions, not decoration.
          </p>
        </section>

        <div className={styles.divider} />

        <section className={styles.founderSection}>
          <div className={styles.founderText}>
            <h2 className={styles.sectionHeading}>Who's Behind It</h2>
            <p className={styles.body}>
              I'm <strong>Kelvin</strong>, a project manager and data builder based in the UK.
              I've spent the last five years delivering digital products across multiple industries,
              and I'm now channelling that into building things I genuinely care about.
            </p>
            <p className={styles.body}>
              KayMetrics is that thing.
            </p>
            <p className={styles.body}>
              If you've got an idea for a dashboard, a dataset worth exploring, or just want to
              follow the journey, you're in the right place.
            </p>
          </div>
          <div className={styles.founderPhotoWrap}>
            <img
              src="/logos/founder.png"
              alt="Kelvin, Founder of KayMetrics"
              className={styles.founderPhoto}
            />
          </div>
        </section>

        <div className={styles.divider} />

        <p className={styles.closing}>Built for Decisions, Not Decorations.</p>

      </div>
    </div>
  )
}
