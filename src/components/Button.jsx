export default function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const variants = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5',
    accent: 'bg-accent text-white shadow-lg shadow-accent/20 hover:-translate-y-0.5',
    secondary: 'border border-primary/15 bg-white/75 text-primary hover:bg-white',
    ghost: 'bg-mist text-primary hover:bg-white',
    danger: 'bg-red-600 text-white shadow-lg shadow-red-600/20 hover:-translate-y-0.5',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
