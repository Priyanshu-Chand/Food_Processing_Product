import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
