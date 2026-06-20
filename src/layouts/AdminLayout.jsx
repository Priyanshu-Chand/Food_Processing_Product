import { Outlet, useLocation } from 'react-router-dom';
import { FiBell, FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

const pageMeta = {
  '/admin/dashboard': {
    title: 'Growth Dashboard',
    summary: 'Track sales momentum, top-performing products, and platform health.',
  },
  '/admin/products': {
    title: 'Product Catalog Manager',
    summary: 'Review direct-to-customer products, pricing, positioning, and launch readiness.',
  },
  '/admin/inventory': {
    title: 'Inventory Control',
    summary: 'Monitor raw materials, finished goods, and expiry-driven waste risk.',
  },
  '/admin/ai-generator': {
    title: 'AI Description Studio',
    summary: 'Generate richer product stories for modern direct-to-customer selling.',
  },
  '/admin/packaging': {
    title: 'Packaging Research',
    summary: 'Compare premium organic packaging directions for core product lines.',
  },
  '/admin/economics': {
    title: 'Unit Economics',
    summary: 'Calculate product profitability with visual cost breakdowns.',
  },
};

export default function AdminLayout() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? pageMeta['/admin/dashboard'];

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/50 bg-background/80 backdrop-blur-xl">
            <div className="flex flex-col gap-4 px-5 py-4 md:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
                  HimShakti Admin
                </p>
                <h1 className="font-display text-3xl text-primary">{meta.title}</h1>
                <p className="max-w-2xl text-sm text-ink/70">{meta.summary}</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="glass-card flex min-w-[220px] items-center gap-2 px-4 py-3 text-sm text-ink/60">
                  <FiSearch className="text-base text-primary" />
                  <input
                    className="w-full bg-transparent outline-none placeholder:text-ink/40"
                    placeholder="Search modules, products..."
                    type="text"
                  />
                </label>
                <button className="glass-card grid h-11 w-11 place-items-center text-primary transition hover:-translate-y-0.5">
                  <FiBell />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-6 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
