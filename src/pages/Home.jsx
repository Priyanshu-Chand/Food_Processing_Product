import Card from '../components/Card';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const offerings = [
  {
    title: 'Himalayan Millet Products',
    description: 'Traditional millet snacks made from local ingredients.',
  },
  {
    title: 'Natural Fruit Processing',
    description: 'Fresh Himalayan fruits converted into juices and products.',
  },
  {
    title: 'Traditional Pickles',
    description: 'Authentic homemade recipes with natural flavors.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="page-shell py-8 sm:py-10">
        <Hero />

        <section className="mt-10">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-leaf">Our Core Product Areas</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Week 2 deliverable focuses on the basic frontend presentation for HimShakti.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {offerings.map((item) => (
              <Card key={item.title} description={item.description} title={item.title} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
