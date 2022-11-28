import Head from 'next/head'
import Navbar from "../components/navbar";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Aziel</title>
        <meta name="description" content="Aziel Website" />
        <link rel="icon" href="/Aziel.webp" />
      </Head>
      <a> home </a>
      <footer className={styles.footer}>

          Copyright © 2022 Aziel, owned by Vital Development.

      </footer>
    </div>
  )
}
