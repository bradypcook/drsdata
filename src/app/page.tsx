import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home - DRSdata",
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <MainPage />
      <Footer />
    </main>
  );
}

