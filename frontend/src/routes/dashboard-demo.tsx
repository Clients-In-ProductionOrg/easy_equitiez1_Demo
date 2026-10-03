import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CircleHelp,
  Eye,
  LayoutDashboard,
  LogOut,
  Plus,
  Wallet,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard-demo")({
  head: () => ({
    meta: [
      { title: "Portfolio preview | EasyEquities" },
      {
        name: "description",
        content:
          "Preview the EasyEquities portfolio interface with clearly identified sample data.",
      },
    ],
  }),
  component: DashboardDemo,
});

const holdings = [
  { name: "Global Equity Fund", ticker: "SAMPLE · ETF", value: "R 62,180.00", change: "+4.8%" },
  { name: "Balanced Growth Fund", ticker: "SAMPLE · FUND", value: "R 41,520.00", change: "+3.2%" },
  {
    name: "Local Bond Fund",
    ticker: "SAMPLE · BOND",
    value: "R 24,750.00",
    change: "+1.1%",
  },
];

const activity = [
  { title: "Monthly contribution", date: "Sample activity · 24 Sep", amount: "+R 1,000.00" },
  { title: "Fund purchase", date: "Sample activity · 18 Sep", amount: "−R 500.00" },
  { title: "Investment distribution", date: "Sample activity · 12 Sep", amount: "+R 86.40" },
];

function DashboardDemo() {
  const [notice, setNotice] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <Link to="/" aria-label="EasyEquities home" className="inline-flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <span className="text-xl leading-none text-primary">
              <span className="font-extrabold">Easy</span>
              <span className="font-light">Equities</span>
            </span>
          </Link>

          <nav aria-label="Portfolio navigation" className="flex items-center gap-2 sm:gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Portfolio</span>
            </a>
            <a
              href="#activity"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Activity
            </a>
            <button
              type="button"
              aria-label="Preview notifications"
              className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
            >
              <Bell className="size-5" aria-hidden="true" />
            </button>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-input px-3 py-2 text-sm font-bold hover:bg-muted"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back to login</span>
            </Link>
          </nav>
        </header>

        <section id="portfolio" className="py-8 sm:py-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Investment account
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My portfolio</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Portfolio overview · Values shown in South African rand
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
              <Eye className="size-4" aria-hidden="true" />
              Preview account
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:col-span-2 xl:col-span-1">
              <p className="text-sm font-semibold text-muted-foreground">Portfolio value</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight">R 128,450.75</p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                <ArrowUpRight className="size-4" aria-hidden="true" />R 4,280.50 (3.45%)
                <span className="font-medium text-muted-foreground">total return</span>
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">Available cash</p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight">R 8,240.00</p>
              <p className="mt-3 text-sm text-muted-foreground">Ready to invest</p>
            </article>

            <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-sm font-semibold text-muted-foreground">Total invested</p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight">R 116,000.00</p>
              <p className="mt-3 text-sm text-muted-foreground">Across this portfolio</p>
            </article>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold">Portfolio performance</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Value over time · Preview data
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNotice(
                        "Transfers are unavailable: this preview is not connected to an account.",
                      )
                    }
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm font-bold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Add money
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNotice(
                        "Orders are unavailable: this preview is not connected to a broker.",
                      )
                    }
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Invest
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-muted/50 p-3 sm:p-5">
                <svg
                  viewBox="0 0 720 240"
                  role="img"
                  aria-label="Illustrative fictional portfolio trend line"
                  className="h-52 w-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 205H720M0 155H720M0 105H720M0 55H720"
                    stroke="currentColor"
                    strokeOpacity=".12"
                  />
                  <path
                    d="M0 190 C48 172 62 182 98 158 S154 162 195 142 S242 151 282 123 S340 141 378 111 S428 127 468 92 S520 112 560 77 S615 87 650 55 S690 66 720 28"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="720" cy="28" r="7" fill="var(--primary)" />
                </svg>
                <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold">Investments</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Current holdings</p>
                </div>
              </div>

              <ul className="divide-y divide-border">
                {holdings.map((holding) => (
                  <li key={holding.ticker} className="flex items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{holding.name}</p>
                      <p className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground">
                        {holding.ticker}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold">{holding.value}</p>
                      <p className="mt-1 text-xs font-bold text-emerald-700">{holding.change}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Investment names and figures are illustrative preview data, not live holdings.
              </p>
            </section>
          </div>

          <section
            id="activity"
            className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold">Recent activity</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Latest account activity · Preview data
                </p>
              </div>
              <CircleHelp className="size-5 text-muted-foreground" aria-hidden="true" />
            </div>
            <ul className="divide-y divide-border">
              {activity.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      {item.amount.startsWith("+") ? (
                        <ArrowDownLeft className="size-5" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold">{item.amount}</p>
                </li>
              ))}
            </ul>
          </section>

          {notice && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-6"
            >
              {notice}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
