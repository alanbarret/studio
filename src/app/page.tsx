import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import Plans from '@/components/landing/plans';
import Faq from '@/components/landing/faq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Benefits />
        <Plans />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
