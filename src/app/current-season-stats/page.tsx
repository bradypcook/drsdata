import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PageHeading from '@/app/components/PageHeading'
import type { Metadata } from 'next';
import DriverStandings from '../components/DriverStandings'
import ConstructorStandings from '../components/ConstructorStandings'

export const metadata: Metadata = {
  title: "Current Season Standings",
}

export default function CurrentSeasonStats() {
    return (
    <main>
        <Navbar />
        <PageHeading title={`${new Date().getFullYear()} Season Standings`}/>
        <DriverStandings />
        <ConstructorStandings />
        <Footer />
    </main>
    )
}