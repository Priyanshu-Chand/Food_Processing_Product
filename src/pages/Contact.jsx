import { FiMapPin, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import MapComponent from '../components/MapComponent';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function Contact() {
  return (
    <div className="section-shell pb-20 pt-10 md:pt-14">
      <motion.section
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MapComponent />
        <div className="glass-card p-6 md:p-8">
          <p className="subtle-label">Contact HimShakti</p>
          <h1 className="section-title mt-3">Factory location, direct contact, and customer support.</h1>
          <p className="mt-4 text-sm leading-7 text-ink/72">
            Customers can use this page to connect directly with HimShakti without going through
            distributors or retail intermediaries.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] bg-mist p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Address</p>
              <p className="mt-2 flex items-start gap-3 text-sm text-ink/80">
                <FiMapPin className="mt-1 shrink-0 text-primary" />
                Haldwani, Uttarakhand, India
              </p>
            </div>
            <div className="rounded-[24px] bg-mist p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/55">Phone</p>
              <p className="mt-2 flex items-center gap-3 text-sm text-ink/80">
                <FiPhone className="text-primary" />
                +91 8384821028
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5"
              href={buildWhatsAppLink({
                productName: 'General Inquiry',
                quantity: 1,
                address: '',
              })}
              rel="noreferrer"
              target="_blank"
            >
              <FiMessageCircle />
              Start WhatsApp Conversation
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
