import ChartContainer from '@/components/UI/ChartContainer/ChartContainer';
import CryptoGraph from '@/components/MarketStat/CryptoGraph/CryptoGraph';
import styles from './page.module.css';


export default function NetworkPage() {
  return (
    <main className={styles.main_content}>
      <div className={styles.grid_layout}>
        <section>

          <ChartContainer
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              </div>
            }
            subtitle="An interactive map of cryptocurrency market interconnections, tracking the impact of regulators, institutional players, and liquidity flows between key blockchain assets."
          >
            <CryptoGraph />
          </ChartContainer>
        </section>
      </div>
    </main>
  );
}