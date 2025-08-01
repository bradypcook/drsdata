import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PageHeading from '@/app/components/PageHeading'
import type { Metadata } from 'next';
import DriverStandings from '../components/DriverStandings'
import ConstructorStandings from '../components/ConstructorStandings'
import DriverNationalities from '../components/DriverNationalities';

export const metadata: Metadata = {
  title: "Current Season Stats",
}

export default function CurrentSeasonStats() {
    return (
    <main>
        <Navbar />
        <PageHeading title={`${new Date().getFullYear()} Season Stats`}/>
        <DriverStandings />
        <ConstructorStandings />
        <DriverNationalities />
        <Footer />
    </main>
    )
}