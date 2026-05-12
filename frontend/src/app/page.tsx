export default function Home() {
  return (
    <main className="main-content">
      <div className="top-row">
        <section className="map-section">

          <div style={{ padding: '40px', border: '1px dashed var(--border-color)' }}>
            <h2>World Map Section</h2>
            <p>D3.js Visualization will be initialized here.</p>
          </div>
        </section>

        <aside className="sidebar-section">

          <div style={{ padding: '20px', border: '1px solid var(--border-color)' }}>
            <h3>Market Stats</h3>
          </div>
        </aside>
      </div>
    </main>
  );
}