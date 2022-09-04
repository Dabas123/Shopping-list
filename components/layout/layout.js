import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './layout.module.css';

export const siteTitle = 'Shopping list';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Shopping list app"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <h1>Welcome to Shopping list app</h1>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <Link href='privacy-policy'><a>Privacy policy</a></Link>
        </div>
        <div className={styles.footerRow}> <div>Copyright © 2022 <a href='https://utenasoft.hu' rel="noreferrer" target="_blank">utenasoft.hu</a></div></div>
      </footer>
    </div>
  );
}
