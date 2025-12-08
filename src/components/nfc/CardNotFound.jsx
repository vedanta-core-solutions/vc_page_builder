'use client';

export default function CardNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-6">
      <div className="text-text/80">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-xl font-semibold mb-2">Card Not Found</h1>
        <p>This NFC card is not registered.</p>
      </div>
    </div>
  );
}
