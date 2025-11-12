import Header from './components/Header';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Clubs from './components/Clubs';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen lg:pl-72 relative">
      <Background />
      <Header />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Clubs />
      <Projects />
      <Awards />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
