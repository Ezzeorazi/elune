"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // Hard redirect so the browser applies the Set-Cookie before the next request.
      // Using router.replace() can race against cookie propagation and fail the first time.
      window.location.href = "/admin";
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Contraseña incorrecta");
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#F5F1EB] flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <div className="text-center mb-10">
          <img
            src="/isotipo-elune-flor-loto.svg"
            alt="ELUNÈ"
            className="h-12 w-auto mx-auto mb-5"
          />
          <h1
            className="text-3xl text-[#2C2825] tracking-[0.15em]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            ELUNÈ
          </h1>
          <p
            className="text-xs text-[#6F6963] mt-2 tracking-[0.35em] uppercase"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs tracking-[0.3em] uppercase text-[#6F6963] mb-2"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#DDD2C4] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#C7AA7A] transition-colors duration-200"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
              placeholder="••••••••"
              autoFocus
              required
            />
          </div>

          {error && (
            <p
              className="text-red-400 text-sm"
              style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C2825] text-[#F5F1EB] text-sm tracking-[0.25em] uppercase py-3.5 hover:bg-[#C7AA7A] transition-colors duration-300 disabled:opacity-50"
            style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p
          className="text-center text-xs text-[#6F6963]/50 mt-8 tracking-wide"
          style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
        >
          Acceso restringido
        </p>
      </div>
    </div>
  );
}
