import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutFounders from '../components/about/AboutFounders';
import AboutTalks from '../components/about/AboutTalks';
import AboutStance from '../components/about/AboutStance';
import AboutCta from '../components/about/AboutCta';
import Footer from '../components/Footer';

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = t('aboutPage.metaTitle');

    return () => {
      document.title = previousTitle;
    };
  }, [t]);

  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutFounders />
      <AboutTalks />
      <AboutStance />
      <AboutCta />
      <Footer />
    </>
  );
}
