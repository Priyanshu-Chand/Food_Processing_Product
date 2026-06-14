import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const dashboardCards = [
  {
    title: 'Products',
    description: 'Product-related information and summaries will appear here.',
  },
  {
    title: 'Inventory',
    description: 'Inventory-related tools and updates will appear here.',
  },
  {
    title: 'Orders',
    description: 'Order summaries and business updates will appear here.',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="page-shell py-8 sm:py-10">
        <section className="section-card px-6 py-10 sm:px-10">
          <h1 className="text-4xl font-bold text-leaf">HimShakti Dashboard</h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            Business analytics and management tools will appear here.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((item) => (
            <Card key={item.title} description={item.description} title={item.title} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
