export default function Loader({ message = 'Loading live data...' }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
      <div>
        <p className="subtle-label">Syncing</p>
        <p className="mt-3 text-sm leading-7 text-ink/72">{message}</p>
      </div>
    </div>
  );
}
