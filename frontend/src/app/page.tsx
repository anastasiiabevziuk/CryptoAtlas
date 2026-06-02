import ChartContainer from '@/components/UI/ChartContainer/ChartContainer';
import CryptoMap from '@/components/MarketStat/CryptoMap/CryptoMap';
import MarketCapChart from '@/components/MarketStat/Charts/MarketCap/MarketCapChart';
import styles from './page.module.css';
export default function Home() {
  return (
    <main className={styles.main_content}>
      <div >
        <section>

          <ChartContainer
            title="Global Crypto Regulatory Landscape"
            subtitle="A visual analysis of cryptocurrency legal status by country, ranging from full legal tender to complete prohibition"
          >
            <CryptoMap />
          </ChartContainer>
        </section>

        <aside >

          <ChartContainer
            title="Top Assets by Market Cap"
            subtitle="A comparative view of the leading cryptocurrencies based on their total market capitalization"
          >
            <MarketCapChart />
          </ChartContainer>
        </aside>
      </div>
    </main>
  );
}