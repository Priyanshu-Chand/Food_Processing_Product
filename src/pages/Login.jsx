import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="page-shell py-8 sm:py-10">
        <section className="mx-auto max-w-xl section-card px-6 py-10 sm:px-10">
          <h1 className="text-4xl font-bold text-leaf">Login</h1>
          <p className="mt-4 text-base leading-8 text-slate-700">
            This is a simple login placeholder for the Week 2 frontend deliverable.
          </p>

          <form className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-leaf">Email</span>
              <input
                className="w-full rounded-2xl border border-leaf/15 bg-soft px-4 py-3 text-sm outline-none transition focus:border-leaf"
                placeholder="Enter your email"
                type="email"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-leaf">Password</span>
              <input
                className="w-full rounded-2xl border border-leaf/15 bg-soft px-4 py-3 text-sm outline-none transition focus:border-leaf"
                placeholder="Enter your password"
                type="password"
              />
            </label>

            <button
              className="w-full rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss"
              type="submit"
            >
              Login
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
