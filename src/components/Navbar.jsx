import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';

export default function Navbar() {
  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-white/50 bg-background/80 backdrop-blur-xl"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <Link className="flex items-center gap-3" to="/">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/20">
            HS
          </div>
          <div>
            <p className="font-display text-2xl leading-none text-primary">HimShakti</p>
            <p className="text-xs uppercase tracking-[0.35em] text-primary/65">Digital Growth</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink className="text-sm font-semibold text-ink/75 transition hover:text-primary" to="/">
            Home
          </NavLink>
          <NavLink className="text-sm font-semibold text-ink/75 transition hover:text-primary" to="/products">
            Products
          </NavLink>
          <NavLink className="text-sm font-semibold text-ink/75 transition hover:text-primary" to="/contact">
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            className="hidden rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5 md:inline-flex"
            to="/products"
          >
            Explore Products
          </NavLink>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
            href="https://wa.me/919000000000?text=Hello%20HimShakti%2C%20I%20want%20to%20know%20more%20about%20your%20products."
            rel="noreferrer"
            target="_blank"
          >
            <FiMessageCircle />
            Order WhatsApp
            <FiArrowRight />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
