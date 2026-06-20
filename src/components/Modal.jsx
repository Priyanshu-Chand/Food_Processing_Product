import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children, isOpen, title, onClose }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-[#1d2b20]/45 px-4 py-10 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-card w-full max-w-2xl p-6"
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="subtle-label">Entry Manager</p>
                <h3 className="mt-2 text-2xl font-semibold text-primary">{title}</h3>
              </div>
              <button
                className="rounded-full bg-mist px-3 py-2 text-sm font-semibold text-primary"
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
