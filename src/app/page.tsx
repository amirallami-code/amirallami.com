import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Certificates from '@/components/Certificates';
import MyGithub from '@/components/MyGithub';
import Footer from '@/components/Footer';

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
              <Certificates />
              <MyGithub />
          </main>
          <footer>
              <Footer />
          </footer>
      </>
  );
}
