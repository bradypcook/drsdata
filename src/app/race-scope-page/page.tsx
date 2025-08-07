import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PageHeading from '@/app/components/PageHeading'
import RaceScope from '@/app/components/RaceScope'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "RaceScope",
}

export default function RaceScopePage() {
    return (
    <main>
      <Navbar />
      <PageHeading title={'RaceScope'}/>
      <RaceScope />
      <Footer />
    </main>
    )
}