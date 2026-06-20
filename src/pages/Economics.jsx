import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ChartCard from '../components/ChartCard';
import useLocalStorage from '../hooks/useLocalStorage';

const initialValues = {
  product: 'Mandua Cookies',
  sellingPrice: 150,
  rawMaterialCost: 20,
  packagingCost: 35,
  labourCost: 20,
  utilityCost: 10,
};

export default function Economics() {
  const [values, setValues] = useLocalStorage('himshakti-economics', initialValues);

  const totalCost =
    Number(values.rawMaterialCost) +
    Number(values.packagingCost) +
    Number(values.labourCost) +
    Number(values.utilityCost);
  const profit = Number(values.sellingPrice) - totalCost;
  const margin = Number(values.sellingPrice) > 0 ? (profit / Number(values.sellingPrice)) * 100 : 0;

  const costBreakdown = useMemo(
    () => [
      { name: 'Raw Material', value: Number(values.rawMaterialCost) },
      { name: 'Packaging', value: Number(values.packagingCost) },
      { name: 'Labour', value: Number(values.labourCost) },
      { name: 'Utilities', value: Number(values.utilityCost) },
    ],
    [values],
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="subtle-label">Calculator</p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">Unit economics dashboard</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['product', 'Product'],
              ['sellingPrice', 'Selling Price'],
              ['rawMaterialCost', 'Raw Material Cost'],
              ['packagingCost', 'Packaging Cost'],
              ['labourCost', 'Labour Cost'],
              ['utilityCost', 'Utility Cost'],
            ].map(([key, label]) => (
              <label key={key} className={key === 'product' ? 'md:col-span-2' : ''}>
                <span className="mb-2 block text-sm font-semibold text-primary">{label}</span>
                <input
                  className="w-full rounded-[22px] border border-primary/10 bg-mist px-4 py-3 text-sm outline-none transition focus:border-primary/25 focus:bg-white"
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [key]:
                        key === 'product' ? event.target.value : Number(event.target.value),
                    }))
                  }
                  type={key === 'product' ? 'text' : 'number'}
                  value={values[key]}
                />
              </label>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          {[
            { label: 'Total Cost', value: `Rs ${totalCost}` },
            { label: 'Profit', value: `Rs ${profit}` },
            { label: 'Profit Margin', value: `${margin.toFixed(1)}%` },
          ].map((card) => (
            <div key={card.label} className="glass-card p-5">
              <p className="text-sm uppercase tracking-[0.28em] text-primary/55">{card.label}</p>
              <p className="mt-4 font-display text-4xl text-primary">{card.value}</p>
            </div>
          ))}

          <div className="glass-card md:col-span-3 p-6">
            <p className="subtle-label">Cost Breakdown</p>
            <h3 className="mt-2 text-2xl font-semibold text-primary">{values.product}</h3>
            <div className="mt-6 space-y-4">
              {costBreakdown.map((item) => {
                const width = totalCost > 0 ? (item.value / totalCost) * 100 : 0;
                return (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold text-primary">
                      <span>{item.name}</span>
                      <span>Rs {item.value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-mist">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard data={costBreakdown} subtitle="Pie Chart" title="Cost share by component" variant="pie" />
        <ChartCard data={costBreakdown} subtitle="Bar Chart" title="Cost comparison" variant="bar" />
      </section>
    </div>
  );
}
