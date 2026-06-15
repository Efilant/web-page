import Header from './components/Header';
import Background from './components/Background';
import Hero from './components/Hero';
import VisitTracker from './components/VisitTracker';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { getSiteContent } from '@/lib/siteContent';

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen lg:pl-72 relative">
      <Background />
      <VisitTracker />
      <Header />
      <Hero content={content} />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
