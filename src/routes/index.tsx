import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BofALogo } from "@/components/BofALogo";
import { AUTH_SESSION_KEY, isValidLogin } from "@/lib/loginCredentials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank of America | Online Banking | Sign In" },
      { name: "description", content: "Sign in to your Bank of America online banking account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidLogin(userId, password)) {
      setError("The User ID or password you entered does not match our records.");
      return;
    }

    window.sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    void navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-foreground">
      {/* FDIC banner */}
      <div className="bg-bofa-bg text-[11px] text-bofa-gray py-2 px-4 text-center border-b border-bofa-border">
        Bank of America deposit products:{" "}
        <span className="font-bold text-bofa-navy">FDIC</span> FDIC-Insured – Backed by the full
        faith and credit of the U.S. Government
      </div>

      {/* Top nav */}
      <header className="border-b border-bofa-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <BofALogo className="h-9" />
          <nav className="hidden md:flex items-center gap-6 text-sm text-bofa-navy">
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">En español</a>
          </nav>
        </div>
        <div className="bg-bofa-navy">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 text-sm text-white">
            {["Personal", "Wealth Management", "Business", "Corporations & Institutions"].map(
              (item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`py-3 hover:underline ${i === 0 ? "border-b-2 border-bofa-red font-semibold" : ""}`}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </header>

      {/* Hero / login section */}
      <main className="flex-1 bg-gradient-to-b from-bofa-navy to-bofa-navy-light">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          {/* Login card */}
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="bg-bofa-red h-2" />
            <div className="p-6">
              <h1 className="text-xl font-semibold text-bofa-navy mb-5">Sign in to Online Banking</h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {error && (
                  <div
                    role="alert"
                    className="border border-bofa-red bg-red-50 px-3 py-2 text-sm text-bofa-red"
                  >
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-bofa-navy mb-1">
                    User ID
                  </label>
                  <input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(event) => {
                      setUserId(event.target.value);
                      setError("");
                    }}
                    className="w-full border border-bofa-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bofa-blue"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-bofa-navy mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    className="w-full border border-bofa-border rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bofa-blue"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-bofa-navy">
                  <input type="checkbox" className="accent-bofa-navy" />
                  Save this User ID
                </label>

                <button
                  type="submit"
                  className="block w-full text-center bg-bofa-navy hover:bg-bofa-navy-light text-white font-semibold py-2.5 rounded-full transition-colors"
                >
                  Log in
                </button>

                <div className="text-sm space-y-2 pt-2">
                  <a href="#" className="block text-bofa-blue hover:underline">Forgot ID/Password?</a>
                  <a href="#" className="block text-bofa-blue hover:underline">Problem signing in?</a>
                  <a href="#" className="block text-bofa-blue hover:underline">Not enrolled? Enroll now.</a>
                </div>
              </form>
            </div>
            <div className="border-t border-bofa-border px-6 py-4 flex items-center gap-2 text-sm text-bofa-navy">
              <span className="w-6 h-6 rounded-full border-2 border-bofa-navy flex items-center justify-center text-xs font-bold">$</span>
              Open an account
            </div>
          </div>

          {/* Promo */}
          <div className="md:col-span-2 text-white flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Choose the card that works for you
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl">
              Earn cash back, travel rewards, or a low intro APR. No annual fee on our most popular cards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { pct: "6%", label: "cash back offer" },
                { pct: "2%", label: "cash back offer" },
                { pct: "1.5", label: "points per $1" },
                { pct: "0%", label: "intro APR offer" },
              ].map((c) => (
                <div key={c.label} className="bg-white/10 backdrop-blur-sm rounded p-4 text-center">
                  <div className="text-3xl font-light">
                    {c.pct}
                    {c.pct !== "1.5" && <span className="text-lg align-top">%</span>}
                  </div>
                  <div className="text-xs text-white/80 mt-1">{c.label}</div>
                  <div className="text-[11px] text-white/60 mt-2">No annual fee.</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo strip */}
        <div className="bg-bofa-bg border-y border-bofa-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-3 text-bofa-navy text-sm">
            <span className="w-7 h-7 rounded-full border-2 border-bofa-red flex items-center justify-center text-bofa-red font-bold">$</span>
            <span className="font-semibold">CASH OFFER UP TO $500</span>
            <span>for new checking customers</span>
            <a href="#" className="text-bofa-blue hover:underline">See details &gt;</a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bofa-bg text-xs text-bofa-gray py-6 px-4 text-center border-t border-bofa-border">
        <p className="max-w-3xl mx-auto">
          Investing involves risk. There is always the potential of losing money when you invest in securities.
        </p>
        <p className="mt-3 hidden">© 2026 Bank of America Corporation. All rights reserved. (Demo clone — not affiliated.)</p>
      </footer>
    </div>
  );
}
