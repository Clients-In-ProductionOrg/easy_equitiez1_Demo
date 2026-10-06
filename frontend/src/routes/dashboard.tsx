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
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Portfolio | EasyEquities" },
      {
        name: "description",
        content: "View your EasyEquities investment portfolio and account activity.",
      },
    ],
  }),
  component: Dashboard,
});

const holdings = [
  { name: "Global Equity Fund", ticker: "ETF", value: "R 62,180.00", change: "+4.8%" },
  { name: "Balanced Growth Fund", ticker: "FUND", value: "R 41,520.00", change: "+3.2%" },
  {
    name: "Local Bond Fund",
    ticker: "BOND",
    value: "R 24,750.00",
    change: "+1.1%",
  },
];

const activity = [
  { title: "Monthly contribution", date: "24 Sep", amount: "+R 1,000.00" },
  { title: "Fund purchase", date: "18 Sep", amount: "−R 500.00" },
  { title: "Investment distribution", date: "12 Sep", amount: "+R 86.40" },
];

const dashboardMenuItems = [
  "Dashboard",
  "Finances",
  "Rewards Hub",
  "Analytics & Education",
  "Help Center",
  "Profile settings",
];

const initialChartValues = Array.from(
  { length: 36 },
  (_, index) => 50 + index * 0.7 + Math.sin(index * 0.6) * 4 + Math.sin(index * 0.18) * 6,
);

function Dashboard() {
  const [notice, setNotice] = useState("");
  const [chartValues, setChartValues] = useState(initialChartValues);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      setChartValues((values) => {
        const previous = values[values.length - 1];
        const next = previous + Math.sin(tick * 1.7) * 1.1 + Math.cos(tick * 0.63) * 0.7;
        return [...values.slice(1), next];
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  const chartMin = Math.min(...chartValues) - 5;
  const chartMax = Math.max(...chartValues) + 5;
  const chartPoints = chartValues.map((value, index) => ({
    x: 76 + (index / (chartValues.length - 1)) * 650,
    y: 28 + (1 - (value - chartMin) / (chartMax - chartMin)) * 176,
  }));
  const chartPath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const chartAreaPath = `${chartPath} L726 210 L76 210 Z`;
  const finalPoint = chartPoints[chartPoints.length - 1];
  const yAxisTicks = [0, 1, 2, 3].map((tick) => {
    const ratio = tick / 3;
    const value = chartMax - ratio * (chartMax - chartMin);
    const portfolioValue = 128450.75 + (value - chartValues[chartValues.length - 1]) * 12;

    return {
      y: 28 + ratio * 176,
      label: `R${Math.round(portfolioValue / 1000)}k`,
    };
  });
  const xAxisTicks = ["60s", "45s", "30s", "15s", "Now"];
  const displayedValue =
    128450.75 +
    (chartValues[chartValues.length - 1] - initialChartValues[initialChartValues.length - 1]) * 12;

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open portfolio menu"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  <LayoutDashboard className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Portfolio</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {dashboardMenuItems.map((item) =>
                  item === "Finances" ||
                  item === "Rewards Hub" ||
                  item === "Analytics & Education" ? (
                    <DropdownMenuItem key={item} asChild>
                      <Link
                        to={
                          item === "Finances"
                            ? "/finances"
                            : item === "Rewards Hub"
                              ? "/rewards-hub"
                              : "/analytics-education"
                        }
                      >
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
                Portfolio
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">My portfolio</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Portfolio overview · Values shown in South African rand
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
              <Eye className="size-4" aria-hidden="true" />
              Investment account
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
                  <p className="mt-1 text-sm text-muted-foreground">Portfolio value over time</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/finances"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm font-bold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Add funds
                  </Link>
                  <button
                    type="button"
                    onClick={() => setNotice("Withdrawals are currently unavailable.")}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Withdraw funds
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card p-4 sm:p-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Portfolio value
                    </p>
                    <p className="mt-1 font-mono text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
                      R{" "}
                      {displayedValue.toLocaleString("en-ZA", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                    <span
                      aria-hidden="true"
                      className="chart-live-dot size-2 rounded-full bg-emerald-500"
                    />
                    Portfolio performance
                  </span>
                </div>
                <div className="mt-4 rounded-lg bg-muted/35 px-1 pt-2">
                  <svg
                    viewBox="0 0 760 250"
                    role="img"
                    aria-label="Portfolio performance chart with South African rand values on the vertical axis and time in seconds on the horizontal axis."
                    className="h-56 w-full text-muted-foreground"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="portfolio-area-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity=".2" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {yAxisTicks.map((tick) => (
                      <g key={tick.y}>
                        <path
                          d={`M70 ${tick.y}H738`}
                          stroke="currentColor"
                          strokeOpacity=".14"
                          strokeDasharray="3 7"
                        />
                        <text
                          x="3"
                          y={tick.y + 4}
                          fill="currentColor"
                          fontSize="11"
                          fontWeight="600"
                        >
                          {tick.label}
                        </text>
                      </g>
                    ))}
                    <path d={chartAreaPath} fill="url(#portfolio-area-fill)" />
                    <path
                      d={chartPath}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {xAxisTicks.map((tick, index) => {
                      const x = 76 + (index / (xAxisTicks.length - 1)) * 650;
                      return (
                        <g key={tick}>
                          <path d={`M${x} 210V215`} stroke="currentColor" strokeOpacity=".4" />
                          <text
                            x={x}
                            y="235"
                            fill="currentColor"
                            fontSize="11"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {tick}
                          </text>
                        </g>
                      );
                    })}
                    <circle
                      cx={finalPoint.x}
                      cy={finalPoint.y}
                      r="4"
                      fill="var(--primary)"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="mt-2 flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Elapsed time</span>
                  <span>Portfolio value (ZAR)</span>
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
            </section>
          </div>

          <section
            id="activity"
            className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold">Recent activity</h2>
                <p className="mt-1 text-sm text-muted-foreground">Latest account activity</p>
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
