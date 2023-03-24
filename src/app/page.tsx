import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>
        <NavBar />
        <h1>Test</h1>
      </div>
    </main>
  );
}
