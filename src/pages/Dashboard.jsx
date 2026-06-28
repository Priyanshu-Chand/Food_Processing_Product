import { motion } from 'framer-motion';
import ChartCard from '../components/ChartCard';
import ErrorState from '../components/ErrorState';
import Loader from '../components/Loader';
import useApiResource from '../hooks/useApiResource';

export default function Dashboard() {
  const {
    data: dashboard,
    isLoading: dashboardLoading,
    error: dashboardError,
    refetch: refetchDashboard,
  } = useApiResource('/dashboard', {
    stats: [],
    salesSeries: [],
    categoryMix: [],
    inventoryStatus: [],
  });
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useApiResource('/products', []);
  const { stats, salesSeries, categoryMix, inventoryStatus } = dashboard;
  const isLoading = dashboardLoading || productsLoading;
  const error = dashboardError || productsError;

  if (isLoading) {
    return <Loader message="Loading analytics and catalog data from the backend." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          refetchDashboard();
          refetchProducts();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary/55">{stat.label}</p>
            <p className="mt-4 font-display text-4xl text-primary">{stat.value}</p>
            <p className="mt-3 text-sm text-ink/65">{stat.delta}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <ChartCard
          data={salesSeries}
          dataKey="revenue"
          subtitle="Revenue"
          title="Monthly sales trend"
          variant="area"
          xKey="name"
        />
        <ChartCard
          data={categoryMix}
          subtitle="Mix"
          title="Category contribution"
          variant="pie"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="glass-card p-6">
          <p className="subtle-label">Top Products</p>
          <h3 className="mt-2 text-2xl font-semibold text-primary">Best performing launches</h3>
          <div className="mt-6 space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-[22px] bg-mist px-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${product.imageGradient}`}
                  />
                  <div>
                    <p className="font-semibold text-primary">{product.name}</p>
                    <p className="text-sm text-ink/65">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-accent">#{index + 1}</p>
                  <p className="text-sm text-ink/65">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChartCard
          data={salesSeries}
          dataKey="orders"
          subtitle="Orders"
          title="Customer order volume"
          variant="bar"
          xKey="name"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ChartCard
          data={inventoryStatus}
          subtitle="Inventory"
          title="Stock health overview"
          variant="pie"
        />
        <div className="glass-card p-6">
          <p className="subtle-label">Operations Notes</p>
          <h3 className="mt-2 text-2xl font-semibold text-primary">Where the platform creates value</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              'Direct catalog and WhatsApp conversion reduce distributor dependency.',
              'AI descriptions upgrade product presentation for online-first buyers.',
              'Inventory and economics tools turn waste and margin into visible metrics.',
            ].map((note) => (
              <div key={note} className="rounded-[24px] bg-mist p-4 text-sm leading-7 text-ink/72">
                {note}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
