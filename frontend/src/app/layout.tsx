import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = { title: 'CryptoAtlas' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                  try {
                      const saved = localStorage.getItem('theme');
                      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      const theme = saved || (prefersDark ? 'dark' : 'light');
                      document.documentElement.classList.add(theme + '-theme');
                  } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body>
        <ThemeProvider>
          <div className="app-wrapper">
            <Header />

            <main className="main-content">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}