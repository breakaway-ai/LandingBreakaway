'use client';

import Navbar from '@/components/Navbar';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutFounders from '@/components/about/AboutFounders';
import AboutTalks from '@/components/about/AboutTalks';
import AboutStance from '@/components/about/AboutStance';
import AboutCta from '@/components/about/AboutCta';
import Footer from '@/components/Footer';
import HashScroll from '@/components/HashScroll';

export default function AboutPage() {
  return (
    <>
      <HashScroll scrollToTop />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutFounders />
        <AboutTalks />
        <AboutStance />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
