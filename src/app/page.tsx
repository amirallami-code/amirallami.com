import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';

export default function Home() {
  return (
      <>
          <header>
              <Navbar />
          </header>
          <main>
              <Hero />
              <About />
              <TechStack />
          </main>
      </>
  );
}
