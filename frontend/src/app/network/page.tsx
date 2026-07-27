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
                Crypto Market Ecosystem: Regulators, Assets & Liquidity
              </div>
            }
            subtitle="An interactive graph tracking liquidity flows and regulatory pressure (SEC, CFTC, MiCA) across key cryptocurrency assets."
          >
            <CryptoGraph />
          </ChartContainer>
        </section>
      </div>
    </main>
  );
}