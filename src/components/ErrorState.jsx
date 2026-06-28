import Button from './Button';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="glass-card flex min-h-48 flex-col items-center justify-center gap-5 p-8 text-center">
      <div>
        <p className="subtle-label">Request Error</p>
        <p className="mt-3 max-w-xl text-sm leading-7 text-ink/72">
          {message || 'Something went wrong while loading the latest data.'}
        </p>
      </div>
      {onRetry ? (
        <Button onClick={onRetry} variant="accent">
          Try Again
        </Button>
      ) : null}
    </div>
  );
}
