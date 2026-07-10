import ChartContainer from '@/components/UI/ChartContainer/ChartContainer';
import CryptoMap from '@/components/MarketStat/CryptoMap/CryptoMap';
import MarketCapChart from '@/components/MarketStat/Charts/MarketCap/MarketCapChart';
import FearGreedGauge from '@/components/MarketStat/Charts/FearGreed/FearGreedGauge';
import VolumeChart from '@/components/MarketStat/Charts/TransactionVolume/VolumeChart';
import styles from './page.module.css';


export default function Home() {
  return (
    <main className={styles.main_content}>
      <div className={styles.grid_layout}>
        <section>

          <ChartContainer
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Global Crypto Regulatory Landscape
                <span className={styles.zoom_hint}>
                  Scroll to zoom
                </span>
              </div>
            }
            subtitle="A visual analysis of cryptocurrency legal status by country, ranging from full legal tender to complete prohibition"
          >
            <CryptoMap />
          </ChartContainer>
        </section>

        <aside className={styles.sidebar} >

          <ChartContainer
            title="Top Assets by Market Cap"
            subtitle="A comparative view of the leading cryptocurrencies based on their total market capitalization"
          >
            <MarketCapChart />
          </ChartContainer>

          {/* <ChartContainer
            title="Crypto Fear & Greed Index"
            subtitle="Track market sentiment in real-time to gauge investor psychology"
          >
            <FearGreedGauge />
          </ChartContainer> */}

          <ChartContainer
            title="Bitcoin Transaction Volume"
            subtitle="Aggregated 24h trading activity across major exchanges (7-day history)"
          >
            <VolumeChart />
          </ChartContainer>

        </aside>
      </div>
    </main>
  );
}