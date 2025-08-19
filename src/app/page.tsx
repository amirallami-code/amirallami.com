import Navbar from '@/components/Navbar';

export default function Home() {
  return (
      <>
          <header>
              <Navbar />
          </header>
          <main>
              <section id="hero" className="w-full h-[1500px]"></section>
              <section id="about" className="w-full h-[1500px] bg-primary"></section>
              <section id="tech-stack" className="w-full h-[1500px]"></section>
              <section id="certificates" className="w-full h-[1500px]"></section>
              <section id="github" className="w-full h-[1500px]"></section>
              <section id="contact" className="w-full h-[1500px]"></section>
          </main>
      </>
  );
}
