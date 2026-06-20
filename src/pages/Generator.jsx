import { motion } from 'framer-motion';
import { startTransition, useState } from 'react';
import { FiCopy, FiEdit3, FiRefreshCw, FiZap } from 'react-icons/fi';
import Button from '../components/Button';
import { aiSamplesResponse } from '../data/products';
import useLocalStorage from '../hooks/useLocalStorage';

const initialForm = {
  productName: 'Mandua Cookies',
  ingredients: 'Finger millet, jaggery, butter, cardamom',
  weight: '250 gm',
  features: 'High fiber, traditional recipe, no preservatives',
  tone: 'premium',
};

function generateDescription({ productName, ingredients, weight, features, tone }) {
  const featureList = features
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .join(', ');

  if (tone === 'traditional') {
    return `${productName} brings the warmth of Himalayan home recipes into a ${weight} pack. Made with ${ingredients}, it carries a handcrafted village-style taste and a comforting regional identity. Best suited for buyers who value heritage, authenticity, and everyday family enjoyment. Highlights: ${featureList}.`;
  }

  if (tone === 'health') {
    return `${productName} is a clean and mindful ${weight} offering made from ${ingredients}. Designed for health-aware consumers, it focuses on balanced ingredients, natural nourishment, and functional everyday snacking. Key benefits include ${featureList}, making it a strong fit for modern wellness-led lifestyles.`;
  }

  return `${productName} is a premium Himalayan product in a ${weight} pack, crafted with ${ingredients}. It is positioned as a refined direct-to-customer offering with elevated storytelling, ingredient confidence, and a polished lifestyle appeal. Signature strengths include ${featureList}, making it ideal for aspirational gifting and conscious premium consumption.`;
}

export default function Generator() {
  const [form, setForm] = useLocalStorage('himshakti-generator-form', initialForm);
  const [output, setOutput] = useState(() => generateDescription(form));
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const aiSampleProducts = aiSamplesResponse.data;

  const handleGenerate = () => {
    startTransition(() => {
      setOutput(generateDescription(form));
      setIsEditing(false);
    });
  };

  const handleRegenerate = () => {
    const swappedTone =
      form.tone === 'premium' ? 'health' : form.tone === 'health' ? 'traditional' : 'premium';
    const nextForm = { ...form, tone: swappedTone };
    setForm(nextForm);
    startTransition(() => {
      setOutput(generateDescription(nextForm));
      setIsEditing(false);
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <motion.section
        className="glass-card p-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="subtle-label">Input Form</p>
        <h2 className="mt-2 text-2xl font-semibold text-primary">AI product description generator</h2>

        <div className="mt-6 space-y-4">
          {[
            { key: 'productName', label: 'Product Name', type: 'text' },
            { key: 'ingredients', label: 'Ingredients', type: 'text' },
            { key: 'weight', label: 'Weight', type: 'text' },
            { key: 'features', label: 'Features', type: 'textarea' },
          ].map((field) => (
            <label key={field.key} className="block">
              <span className="mb-2 block text-sm font-semibold text-primary">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  className="min-h-28 w-full rounded-[22px] border border-primary/10 bg-mist px-4 py-3 text-sm outline-none transition focus:border-primary/25 focus:bg-white"
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  value={form[field.key]}
                />
              ) : (
                <input
                  className="w-full rounded-[22px] border border-primary/10 bg-mist px-4 py-3 text-sm outline-none transition focus:border-primary/25 focus:bg-white"
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  type={field.type}
                  value={form[field.key]}
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-primary">Tone</p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { value: 'premium', label: 'Premium' },
              { value: 'traditional', label: 'Traditional' },
              { value: 'health', label: 'Health Focused' },
            ].map((tone) => (
              <button
                key={tone.value}
                className={`rounded-[22px] px-4 py-3 text-sm font-semibold transition ${
                  form.tone === tone.value
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-mist text-primary'
                }`}
                onClick={() => setForm((current) => ({ ...current, tone: tone.value }))}
                type="button"
              >
                {tone.label}
              </button>
            ))}
          </div>
        </div>

        <Button className="mt-6 px-5 py-3" onClick={handleGenerate} variant="accent">
          <FiZap />
          Generate
        </Button>
      </motion.section>

      <section className="space-y-6">
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="subtle-label">Generated Description</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary">Output studio</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="px-4 py-2" onClick={handleRegenerate} variant="ghost">
                <span className="inline-flex items-center gap-2">
                  <FiRefreshCw />
                  Regenerate
                </span>
              </Button>
              <Button
                className="px-4 py-2"
                onClick={() => setIsEditing((current) => !current)}
                variant="ghost"
              >
                <span className="inline-flex items-center gap-2">
                  <FiEdit3 />
                  {isEditing ? 'Preview' : 'Edit'}
                </span>
              </Button>
              <Button className="px-4 py-2" onClick={handleCopy}>
                <span className="inline-flex items-center gap-2">
                  <FiCopy />
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </Button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              className="mt-6 min-h-48 w-full rounded-[24px] border border-primary/10 bg-mist px-4 py-4 text-sm leading-7 outline-none focus:border-primary/20 focus:bg-white"
              onChange={(event) => setOutput(event.target.value)}
              value={output}
            />
          ) : (
            <div className="mt-6 rounded-[24px] bg-mist p-5 text-sm leading-8 text-ink/80">{output}</div>
          )}
        </motion.div>

        <motion.div
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <div className="border-b border-primary/8 px-6 py-5">
            <p className="subtle-label">Sample Products</p>
            <h3 className="mt-2 text-2xl font-semibold text-primary">AI-ready product library</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/55 text-primary/70">
                <tr>
                  {['Name', 'Weight', 'Tone', 'Description'].map((heading) => (
                    <th key={heading} className="px-6 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aiSampleProducts.map((product) => (
                  <tr key={product.name} className="border-t border-primary/8 align-top">
                    <td className="px-6 py-4 font-semibold text-primary">{product.name}</td>
                    <td className="px-6 py-4">{product.weight}</td>
                    <td className="px-6 py-4">{product.tone}</td>
                    <td className="px-6 py-4 leading-7 text-ink/72">{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
