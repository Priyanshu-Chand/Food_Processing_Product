import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiBox,
  FiCpu,
  FiDroplet,
  FiHome,
  FiPackage,
  FiPieChart,
  FiSettings,
} from 'react-icons/fi';

const mainLinks = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FiHome },
  { label: 'Products', to: '/admin/products', icon: FiBox },
  { label: 'AI Generator', to: '/admin/ai-generator', icon: FiCpu },
  { label: 'Inventory', to: '/admin/inventory', icon: FiDroplet },
  { label: 'Analytics', to: '/admin/dashboard', icon: FiBarChart2 },
  { label: 'Packaging', to: '/admin/packaging', icon: FiPackage },
  { label: 'Economics', to: '/admin/economics', icon: FiPieChart },
];

const secondaryLinks = [
  { label: 'Reports', icon: FiBarChart2 },
  { label: 'Settings', icon: FiSettings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/50 bg-[#f4efe2]/70 px-5 py-6 backdrop-blur-xl lg:block">
      <div className="glass-card mb-6 p-5">
        <p className="subtle-label">HimShakti</p>
        <h2 className="mt-2 font-display text-3xl text-primary">Control Center</h2>
        <p className="mt-2 text-sm text-ink/65">
          Direct sales, AI content, inventory visibility, and product profitability in one place.
        </p>
      </div>

      <nav className="space-y-2">
        {mainLinks.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-ink/75 hover:bg-white/60 hover:text-primary'
              }`
            }
            to={to}
          >
            <Icon className="text-base" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary/55">
          Workspace
        </p>
        <div className="space-y-2">
          {secondaryLinks.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-ink/60"
            >
              <span className="flex items-center gap-3">
                <Icon className="text-base" />
                {label}
              </span>
              <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-primary/60">
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
