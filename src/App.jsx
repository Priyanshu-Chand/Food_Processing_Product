import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AdminProducts from './pages/AdminProducts';
import Inventory from './pages/Inventory';
import Generator from './pages/Generator';
import Packaging from './pages/Packaging';
import Economics from './pages/Economics';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-sm uppercase tracking-[0.4em] text-primary/70">Route not found</p>
      <h1 className="font-display text-4xl text-primary">Let&apos;s head back to the mountains.</h1>
      <NavLink className="rounded-full bg-primary px-5 py-3 font-semibold text-white" to="/">
        Return Home
      </NavLink>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate replace to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="ai-generator" element={<Generator />} />
        <Route path="packaging" element={<Packaging />} />
        <Route path="economics" element={<Economics />} />
      </Route>
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
