import ChartContainer from '@/components/UI/ChartContainer/ChartContainer';
import CryptoMap from '@/components/MarketStat/CryptoMap/CryptoMap';
import styles from './page.module.css';
export default function Home() {
  return (
    <main className={styles.main_content}>
      <div >
        <section>

          <ChartContainer
            title="Global Crypto Adoption"
            subtitle="Hover over countries to see market activity"
          >
            <CryptoMap />
          </ChartContainer>
        </section>

        <aside >

          <div style={{ padding: '20px', border: '1px solid var(--border-color)' }}>
            <h3>Market Stats</h3>
          </div>
        </aside>
      </div>
    </main>
  );
}