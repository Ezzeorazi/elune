"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl text-red-700 mb-4">Error en el panel de admin</h1>
      <pre className="bg-red-50 border border-red-200 p-4 text-sm text-red-800 overflow-auto whitespace-pre-wrap mb-4">
        {error.message}
        {error.digest ? `\n\nDigest: ${error.digest}` : ""}
      </pre>
      <button
        onClick={reset}
        className="px-4 py-2 bg-dark text-white text-sm"
      >
        Reintentar
      </button>
    </div>
  );
}
