import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BofALogo } from "@/components/BofALogo";
import { AUTH_SESSION_KEY } from "@/lib/loginCredentials";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Accounts Overview | Bank of America" },
      { name: "description", content: "View your Bank of America accounts overview." },
    ],
  }),
  component: Dashboard,
});

const accounts = {
  banking: [
    { name: "Adv Plus Banking", num: "...4521", balance: 8421.55, available: 8421.55 },
    { name: "Rewards Savings", num: "...9013", balance: 24108.12, available: 24108.12 },
  ],
  cards: [
    { name: "Customized Cash Rewards Visa", num: "...3344", balance: -842.19, available: 9157.81, limit: 10000 },
    { name: "Travel Rewards Visa", num: "...7788", balance: -210.43, available: 14789.57, limit: 15000 },
  ],
  investments: [
    { name: "Merrill Edge Self-Directed", num: "...0021", balance: 56240.88 },
    { name: "401(k) Rollover IRA", num: "...0044", balance: 437337.3 },
  ],
};

const transactions = [
  { date: "Jun 8", desc: "Whole Foods Market", cat: "Groceries", amt: -84.32 },
  { date: "Jun 7", desc: "Payroll — Acme Corp", cat: "Deposit", amt: 3250.0 },
  { date: "Jun 6", desc: "Shell Oil", cat: "Gas", amt: -52.18 },
  { date: "Jun 5", desc: "Netflix", cat: "Entertainment", amt: -15.99 },
  { date: "Jun 4", desc: "Transfer to Savings", cat: "Transfer", amt: -500.0 },
  { date: "Jun 3", desc: "Starbucks", cat: "Dining", amt: -6.75 },
];

function fmt(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function AccountGroup({
  title,
  total,
  children,
}: {
  title: string;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-bofa-border rounded shadow-sm mb-5">
      <header className="flex items-center justify-between px-5 py-3 border-b border-bofa-border bg-bofa-bg/60">
        <h3 className="text-bofa-navy font-semibold">{title}</h3>
        <div className="text-sm text-bofa-gray">
          Total: <span className="text-bofa-navy font-semibold">{fmt(total)}</span>
        </div>
      </header>
      <div className="divide-y divide-bofa-border">{children}</div>
    </section>
  );
}

function AccountRow({
  name,
  num,
  balance,
  available,
  limit,
}: {
  name: string;
  num: string;
  balance: number;
  available?: number;
  limit?: number;
}) {
  return (
    <div className="px-5 py-4 grid grid-cols-12 items-center gap-4 hover:bg-bofa-bg/50 transition-colors">
      <div className="col-span-12 md:col-span-6">
        <a href="#" className="text-bofa-blue hover:underline font-medium">
          {name}
        </a>
        <div className="text-xs text-bofa-gray mt-0.5">{num}</div>
      </div>
      <div className="col-span-6 md:col-span-3 text-right">
        <div className="text-xs text-bofa-gray uppercase tracking-wide">
          {limit ? "Current balance" : "Available balance"}
        </div>
        <div className={`font-semibold ${balance < 0 ? "text-bofa-red" : "text-bofa-navy"}`}>
          {fmt(balance)}
        </div>
      </div>
      <div className="col-span-6 md:col-span-3 text-right">
        {limit !== undefined ? (
          <>
            <div className="text-xs text-bofa-gray uppercase tracking-wide">Available credit</div>
            <div className="font-semibold text-bofa-navy">{fmt(available ?? 0)}</div>
          </>
        ) : available !== undefined ? (
          <>
            <div className="text-xs text-bofa-gray uppercase tracking-wide">Available</div>
            <div className="font-semibold text-bofa-navy">{fmt(available)}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const bankingTotal = accounts.banking.reduce((s, a) => s + a.balance, 0);
  const cardsTotal = accounts.cards.reduce((s, a) => s + a.balance, 0);
  const investTotal = accounts.investments.reduce((s, a) => s + a.balance, 0);
  const netWorth = bankingTotal + cardsTotal + investTotal;

  useEffect(() => {
    if (window.sessionStorage.getItem(AUTH_SESSION_KEY) !== "true") {
      void navigate({ to: "/" });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-bofa-bg text-foreground">
      {/* Header */}
      <header className="bg-white border-b border-bofa-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <BofALogo className="h-9" />
          <div className="flex items-center gap-5 text-sm text-bofa-navy">
            <a href="#" className="hover:underline hidden sm:inline">Customer Service</a>
            <a href="#" className="hover:underline hidden sm:inline">Help</a>
            <Link
              to="/"
              onClick={() => window.sessionStorage.removeItem(AUTH_SESSION_KEY)}
              className="hover:underline"
            >
              Sign Off
            </Link>
          </div>
        </div>
        <nav className="bg-bofa-navy">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 text-sm text-white overflow-x-auto">
            {["Accounts", "Transfers", "Bill Pay", "Deposit", "Tools & Investing", "Open an Account"].map(
              (item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`py-3 whitespace-nowrap hover:underline ${i === 0 ? "border-b-2 border-bofa-red font-semibold" : ""}`}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Greeting */}
        <div className="flex flex-wrap items-end justify-between mb-5 gap-2">
          <div>
            <h1 className="text-2xl text-bofa-navy font-light">
              Good afternoon, <span className="font-semibold">Ivana</span>
            </h1>
            <p className="text-sm text-bofa-gray">Last sign in: today at 9:42 AM ET</p>
          </div>
          <div className="bg-white border border-bofa-border rounded px-4 py-2 text-right">
            <div className="text-xs text-bofa-gray uppercase">Net worth</div>
            <div className="text-xl font-semibold text-bofa-navy">{fmt(netWorth)}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Accounts column */}
          <div className="lg:col-span-2">
            <AccountGroup title="Banking / Cash" total={bankingTotal}>
              {accounts.banking.map((a) => (
                <AccountRow key={a.num} {...a} />
              ))}
            </AccountGroup>

            <AccountGroup title="Credit Cards" total={cardsTotal}>
              {accounts.cards.map((a) => (
                <AccountRow key={a.num} {...a} />
              ))}
            </AccountGroup>

            <AccountGroup title="Investment Accounts" total={investTotal}>
              {accounts.investments.map((a) => (
                <AccountRow key={a.num} {...a} />
              ))}
            </AccountGroup>

            {/* Recent activity */}
            <section className="bg-white border border-bofa-border rounded shadow-sm">
              <header className="flex items-center justify-between px-5 py-3 border-b border-bofa-border bg-bofa-bg/60">
                <h3 className="text-bofa-navy font-semibold">Recent activity</h3>
                <a href="#" className="text-sm text-bofa-blue hover:underline">View all</a>
              </header>
              <table className="w-full text-sm">
                <thead className="text-bofa-gray text-xs uppercase">
                  <tr className="border-b border-bofa-border">
                    <th className="text-left px-5 py-2 font-medium">Date</th>
                    <th className="text-left px-5 py-2 font-medium">Description</th>
                    <th className="text-left px-5 py-2 font-medium hidden sm:table-cell">Category</th>
                    <th className="text-right px-5 py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i} className="border-b border-bofa-border last:border-0 hover:bg-bofa-bg/50">
                      <td className="px-5 py-3 text-bofa-gray whitespace-nowrap">{t.date}</td>
                      <td className="px-5 py-3 text-bofa-navy">{t.desc}</td>
                      <td className="px-5 py-3 text-bofa-gray hidden sm:table-cell">{t.cat}</td>
                      <td className={`px-5 py-3 text-right font-medium ${t.amt < 0 ? "text-bofa-navy" : "text-bofa-green"}`}>
                        {t.amt > 0 ? "+" : ""}
                        {fmt(t.amt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* Side column */}
          <aside className="space-y-5">
            <section className="bg-white border border-bofa-border rounded shadow-sm p-5">
              <h3 className="text-bofa-navy font-semibold mb-4">Quick actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {["Transfer", "Pay bills", "Deposit check", "Zelle®", "Statements", "Order checks"].map((a) => (
                  <button
                    key={a}
                    className="border border-bofa-border rounded px-3 py-3 text-sm text-bofa-navy hover:border-bofa-navy hover:bg-bofa-bg/50 transition-colors text-left"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-white border border-bofa-border rounded shadow-sm p-5">
              <h3 className="text-bofa-navy font-semibold mb-3">Rewards</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-light text-bofa-red">$248</span>
                <span className="text-sm text-bofa-gray">cash back available</span>
              </div>
              <a href="#" className="text-sm text-bofa-blue hover:underline mt-2 inline-block">
                Redeem now &gt;
              </a>
            </section>

            <section className="bg-bofa-navy text-white rounded shadow-sm p-5">
              <div className="text-xs uppercase tracking-wide opacity-80 mb-2">For you</div>
              <h3 className="text-lg font-semibold mb-2">Boost your savings</h3>
              <p className="text-sm text-white/80 mb-4">
                Open a Featured CD — earn a guaranteed rate up to 4.50% APY.
              </p>
              <a
                href="#"
                className="inline-block bg-white text-bofa-navy text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90"
              >
                Learn more
              </a>
            </section>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-bofa-border py-5 px-4 text-center text-xs text-bofa-gray">
        © 2026 Bank of America Corporation. All rights reserved. (Demo clone — not affiliated.)
      </footer>
    </div>
  );
}
