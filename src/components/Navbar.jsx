import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Login', to: '/login' },
];

export default function Navbar() {
  return (
    <header className="border-b border-leaf/10 bg-cream/95">
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <NavLink className="text-2xl font-bold tracking-wide text-leaf" to="/">
          HimShakti
        </NavLink>

        <nav className="flex flex-wrap items-center justify-start gap-2 sm:gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-leaf text-white' : 'bg-white/70 text-leaf hover:bg-soft'
                }`
              }
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
