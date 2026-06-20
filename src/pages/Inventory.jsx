import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiAlertTriangle, FiClock, FiEdit3, FiPackage, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import Button from '../components/Button';
import ChartCard from '../components/ChartCard';
import Modal from '../components/Modal';
import { inventoryResponse } from '../data/products';
import useLocalStorage from '../hooks/useLocalStorage';

const rawMaterialTemplate = {
  batch: '',
  item: '',
  entryDate: '',
  expiryDate: '',
  quantity: '',
};

const finishedGoodsTemplate = {
  product: '',
  productionDate: '',
  shelfLifeDays: 90,
  stock: '',
};

function getDaysLeft(dateString) {
  const today = new Date();
  const targetDate = new Date(dateString);
  const difference = targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getStatusFromDays(daysLeft) {
  if (daysLeft < 7) {
    return { label: 'Critical', className: 'bg-red-100 text-red-700' };
  }
  if (daysLeft < 15) {
    return { label: 'Warning', className: 'bg-amber-100 text-amber-700' };
  }
  return { label: 'Safe', className: 'bg-emerald-100 text-emerald-700' };
}

function getFinishedExpiryDate(productionDate, shelfLifeDays) {
  const date = new Date(productionDate);
  date.setDate(date.getDate() + Number(shelfLifeDays || 0));
  return date.toISOString().slice(0, 10);
}

function getInventoryHealth(rawEntries, finishedEntries) {
  const combined = [
    ...rawEntries.map((item) => getStatusFromDays(getDaysLeft(item.expiryDate)).label),
    ...finishedEntries.map((item) =>
      getStatusFromDays(getDaysLeft(getFinishedExpiryDate(item.productionDate, item.shelfLifeDays))).label,
    ),
  ];

  return ['Safe', 'Warning', 'Critical'].map((label) => ({
    name: label,
    value: combined.filter((item) => item === label).length,
  }));
}

function InventoryForm({ entryType, formState, setFormState, onSubmit }) {
  const fields =
    entryType === 'raw'
      ? [
          ['batch', 'Batch ID', 'text'],
          ['item', 'Item Name', 'text'],
          ['entryDate', 'Entry Date', 'date'],
          ['expiryDate', 'Expiry Date', 'date'],
          ['quantity', 'Quantity', 'text'],
        ]
      : [
          ['product', 'Product Name', 'text'],
          ['productionDate', 'Production Date', 'date'],
          ['shelfLifeDays', 'Shelf Life (days)', 'number'],
          ['stock', 'Stock', 'text'],
        ];

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(([key, label, type]) => (
          <label key={key} className={key === 'item' || key === 'product' ? 'md:col-span-2' : ''}>
            <span className="mb-2 block text-sm font-semibold text-primary">{label}</span>
            <input
              className="w-full rounded-[22px] border border-primary/10 bg-mist px-4 py-3 text-sm outline-none transition focus:border-primary/25 focus:bg-white"
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  [key]: type === 'number' ? Number(event.target.value) : event.target.value,
                }))
              }
              required
              type={type}
              value={formState[key]}
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="accent">
          Save Entry
        </Button>
      </div>
    </form>
  );
}

export default function Inventory() {
  const [rawEntries, setRawEntries] = useLocalStorage(
    'himshakti-raw-materials',
    inventoryResponse.data.rawMaterials,
  );
  const [finishedEntries, setFinishedEntries] = useLocalStorage(
    'himshakti-finished-goods',
    inventoryResponse.data.finishedGoods,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalState, setModalState] = useState({
    isOpen: false,
    entryType: 'raw',
    mode: 'create',
    editingId: null,
  });
  const [rawForm, setRawForm] = useState(rawMaterialTemplate);
  const [finishedForm, setFinishedForm] = useState(finishedGoodsTemplate);

  const filteredRawEntries = useMemo(() => {
    return rawEntries.filter((entry) => {
      const matchesSearch = `${entry.batch} ${entry.item}`.toLowerCase().includes(searchTerm.toLowerCase());
      const status = getStatusFromDays(getDaysLeft(entry.expiryDate)).label.toLowerCase();
      const matchesStatus = statusFilter === 'all' ? true : status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rawEntries, searchTerm, statusFilter]);

  const filteredFinishedEntries = useMemo(() => {
    return finishedEntries.filter((entry) => {
      const haystack = `${entry.product} ${entry.stock}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      if (statusFilter === 'all') {
        return matchesSearch;
      }
      const finishedStatus = getStatusFromDays(
        getDaysLeft(getFinishedExpiryDate(entry.productionDate, entry.shelfLifeDays)),
      ).label.toLowerCase();
      return matchesSearch && finishedStatus === statusFilter;
    });
  }, [finishedEntries, searchTerm, statusFilter]);

  const healthData = useMemo(
    () => getInventoryHealth(rawEntries, finishedEntries),
    [rawEntries, finishedEntries],
  );

  const alertItems = useMemo(
    () =>
      rawEntries
        .map((item) => ({ ...item, daysLeft: getDaysLeft(item.expiryDate) }))
        .filter((item) => item.daysLeft < 15),
    [rawEntries],
  );

  const openCreateModal = (entryType) => {
    setModalState({ isOpen: true, entryType, mode: 'create', editingId: null });
    if (entryType === 'raw') {
      setRawForm(rawMaterialTemplate);
    } else {
      setFinishedForm(finishedGoodsTemplate);
    }
  };

  const openEditModal = (entryType, entry) => {
    setModalState({ isOpen: true, entryType, mode: 'edit', editingId: entry.id });
    if (entryType === 'raw') {
      setRawForm(entry);
    } else {
      setFinishedForm(entry);
    }
  };

  const closeModal = () => {
    setModalState((current) => ({ ...current, isOpen: false }));
  };

  const saveRawEntry = (event) => {
    event.preventDefault();
    if (modalState.mode === 'edit') {
      setRawEntries((current) =>
        current.map((entry) => (entry.id === modalState.editingId ? { ...rawForm, id: entry.id } : entry)),
      );
    } else {
      setRawEntries((current) => [{ ...rawForm, id: `rm-${Date.now()}` }, ...current]);
    }
    closeModal();
  };

  const saveFinishedEntry = (event) => {
    event.preventDefault();
    if (modalState.mode === 'edit') {
      setFinishedEntries((current) =>
        current.map((entry) =>
          entry.id === modalState.editingId ? { ...finishedForm, id: entry.id } : entry,
        ),
      );
    } else {
      setFinishedEntries((current) => [{ ...finishedForm, id: `fg-${Date.now()}` }, ...current]);
    }
    closeModal();
  };

  const deleteEntry = (entryType, entryId) => {
    if (!window.confirm('Delete this inventory entry?')) {
      return;
    }

    if (entryType === 'raw') {
      setRawEntries((current) => current.filter((entry) => entry.id !== entryId));
    } else {
      setFinishedEntries((current) => current.filter((entry) => entry.id !== entryId));
    }
  };

  const modalTitle =
    modalState.entryType === 'raw'
      ? `${modalState.mode === 'edit' ? 'Edit' : 'Add'} raw material entry`
      : `${modalState.mode === 'edit' ? 'Edit' : 'Add'} finished goods entry`;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            label: 'Raw Material Batches',
            value: rawEntries.length,
            text: 'Track batch-level expiry and quantity before waste builds up.',
            icon: FiPackage,
          },
          {
            label: 'Expiring Soon',
            value: alertItems.length,
            text: 'Prioritize production planning for time-sensitive inventory.',
            icon: FiClock,
          },
          {
            label: 'Waste Alerts',
            value: `${healthData.find((item) => item.name === 'Critical')?.value ?? 0} critical`,
            text: 'Color-coded stock health turns expiry risk into actionable operations.',
            icon: FiAlertTriangle,
          },
        ].map(({ label, value, text, icon: Icon }, index) => (
          <motion.div
            key={label}
            className="glass-card p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
          >
            <Icon className="text-2xl text-accent" />
            <p className="mt-4 text-sm uppercase tracking-[0.28em] text-primary/55">{label}</p>
            <p className="mt-3 font-display text-4xl text-primary">{value}</p>
            <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ChartCard
          data={healthData}
          subtitle="Stock Health"
          title="Inventory overview by status"
          variant="pie"
        />

        <div className="glass-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="subtle-label">Inventory Controls</p>
              <h3 className="mt-2 text-2xl font-semibold text-primary">Search, filter, and manage entries</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => openCreateModal('raw')} variant="accent">
                <FiPlus />
                Add Raw Material
              </Button>
              <Button onClick={() => openCreateModal('finished')} variant="secondary">
                <FiPlus />
                Add Finished Good
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
            <label className="flex items-center gap-3 rounded-[22px] border border-primary/10 bg-mist px-4 py-3">
              <FiSearch className="text-primary" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/45"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search batch, item, product, stock..."
                type="text"
                value={searchTerm}
              />
            </label>

            <select
              className="rounded-[22px] border border-primary/10 bg-mist px-4 py-3 text-sm font-semibold text-primary outline-none"
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value="all">All statuses</option>
              <option value="safe">Safe</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="glass-card overflow-hidden">
          <div className="flex flex-col gap-2 border-b border-primary/8 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="subtle-label">Raw Material Tracker</p>
              <h3 className="mt-2 text-2xl font-semibold text-primary">Batch monitoring</h3>
            </div>
            <p className="text-sm text-ink/60">{filteredRawEntries.length} visible entries</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/55 text-primary/70">
                <tr>
                  {['Batch', 'Item', 'Entry', 'Expiry', 'Qty', 'Status', 'Actions'].map((heading) => (
                    <th key={heading} className="px-6 py-4 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRawEntries.map((entry) => {
                  const status = getStatusFromDays(getDaysLeft(entry.expiryDate));
                  return (
                    <tr key={entry.id} className="border-t border-primary/8">
                      <td className="px-6 py-4 font-semibold text-primary">{entry.batch}</td>
                      <td className="px-6 py-4">{entry.item}</td>
                      <td className="px-6 py-4">{entry.entryDate}</td>
                      <td className="px-6 py-4">{entry.expiryDate}</td>
                      <td className="px-6 py-4">{entry.quantity}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button
                            className="px-3 py-2"
                            onClick={() => openEditModal('raw', entry)}
                            variant="ghost"
                          >
                            <FiEdit3 />
                          </Button>
                          <Button
                            className="px-3 py-2"
                            onClick={() => deleteEntry('raw', entry.id)}
                            variant="danger"
                          >
                            <FiTrash2 />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <p className="subtle-label">Waste Alerts</p>
            <h3 className="mt-2 text-2xl font-semibold text-primary">Use these batches first</h3>
            <div className="mt-5 space-y-4">
              {alertItems.length ? (
                alertItems.map((item) => (
                  <div key={item.id} className="rounded-[24px] bg-mist p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-primary/55">Expiring Soon</p>
                    <h4 className="mt-2 text-lg font-semibold text-primary">{item.item}</h4>
                    <p className="mt-1 text-sm text-ink/70">
                      {item.batch} has {item.daysLeft} days left. Use immediately in active production.
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] bg-mist p-4 text-sm text-ink/70">
                  No urgent raw material alerts right now.
                </div>
              )}
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="flex flex-col gap-2 border-b border-primary/8 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="subtle-label">Finished Goods Tracker</p>
                <h3 className="mt-2 text-2xl font-semibold text-primary">Production stock</h3>
              </div>
              <p className="text-sm text-ink/60">{filteredFinishedEntries.length} visible entries</p>
            </div>
            <div className="divide-y divide-primary/8">
              {filteredFinishedEntries.map((entry) => {
                const expiryDate = getFinishedExpiryDate(entry.productionDate, entry.shelfLifeDays);
                const status = getStatusFromDays(getDaysLeft(expiryDate));

                return (
                  <div key={entry.id} className="space-y-4 px-6 py-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-semibold text-primary">{entry.product}</p>
                        <p className="text-sm text-ink/65">
                          Produced {entry.productionDate} • Shelf life {entry.shelfLifeDays} days •
                          Expires {expiryDate}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                          {entry.stock}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="px-3 py-2"
                        onClick={() => openEditModal('finished', entry)}
                        variant="ghost"
                      >
                        <FiEdit3 />
                        Edit
                      </Button>
                      <Button
                        className="px-3 py-2"
                        onClick={() => deleteEntry('finished', entry.id)}
                        variant="danger"
                      >
                        <FiTrash2 />
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={modalTitle}>
        {modalState.entryType === 'raw' ? (
          <InventoryForm
            entryType="raw"
            formState={rawForm}
            onSubmit={saveRawEntry}
            setFormState={setRawForm}
          />
        ) : (
          <InventoryForm
            entryType="finished"
            formState={finishedForm}
            onSubmit={saveFinishedEntry}
            setFormState={setFinishedForm}
          />
        )}
      </Modal>
    </div>
  );
}
