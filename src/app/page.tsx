import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';

export default function Home() {
  return (
      <>
          <header>
              <Navbar />
          </header>
          <main>
              <Hero />
              <About />
          </main>
      </>
  );
}
