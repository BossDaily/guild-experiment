import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <h1 >Test</h1>
    </main>
  )
}
