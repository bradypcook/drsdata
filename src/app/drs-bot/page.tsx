import '@/app/globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import PageHeading from '@/app/components/PageHeading'
import BotInfo from '@/app/components/BotInfo'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DRSbot",
}

export default function DRSbotpage() {
    return (
    <main>
        <Navbar />
        <PageHeading title={'DRSbot'}/>
        <BotInfo 
          boxes={[
            {
              header_one: "What is DRSbot?",
              description_one: "DRSbot is a Discord Bot that serves as an extension of this website that you can put in your own Discord Server!",
              header_two: "How do I use it?",
              description_two: "Simple! Firstly, invite DRSbot to your server via the button below, and follow the necessary steps from Discord.",
              buttonText:'Click Here!',
              buttonLink:'https://discord.com/oauth2/authorize?client_id=1181768559211331684&response_type=code&redirect_uri=https%3A%2F%2Fbradypcook.github.io%2FDRSdata%2F&integration_type=0&scope=messages.read+applications.commands+activities.invites.write+applications.commands.permissions.update',
            }
          ]}/>
        <Footer />
    </main>
    )
}