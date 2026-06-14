import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="page-shell py-8 sm:py-10">
        <section className="section-card px-6 py-10 sm:px-10">
          <h1 className="text-4xl font-bold text-leaf">About HimShakti</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
            HimShakti is a rural food processing unit focused on creating value-added Himalayan
            products.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
