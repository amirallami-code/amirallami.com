import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Certificates from '@/components/Certificates';
import MyGithub from '@/components/MyGithub';

export default function Home() {
  return (
      <>
          <Hero />
          <About />
          <TechStack />
          <Certificates />
          <MyGithub />
      </>
  );
}
