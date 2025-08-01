import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PageHeading from '@/app/components/PageHeading'
import CareerWins from '@/app/components/CareerWins'
import FastestLaps from '@/app/components/FastestLaps'
import RaceLookup from '@/app/components/RaceLookup'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Time Stats",
}

export default function AllTimeStats() {
    return (
    <main>
      <Navbar />
      <PageHeading title={'All Time Stats'}/>
      <CareerWins />
      <FastestLaps />
      <RaceLookup />
      <Footer />
    </main>
    )
}