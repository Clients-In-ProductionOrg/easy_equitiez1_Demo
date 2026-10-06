import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Eye,
  LayoutDashboard,
  LogOut,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/finances")({
  head: () => ({
    meta: [
      { title: "Finances | EasyEquities" },
      {
        name: "description",
        content: "Review deposit and withdrawal activity for your investment account.",
      },
    ],
  }),
  component: Finances,
});

type TransactionType = "Deposit" | "Withdrawal";
type TransactionFilter = "All" | TransactionType;
type FinanceAction = "Deposit" | "Withdrawal";

type Transaction = {
  date: string;
  type: TransactionType;
  status: "Completed" | "Rejected";
  amount: string;
  institution: string;
};

const transactions: Transaction[] = [
  {
    date: "24 March 2024",
    type: "Deposit",
    status: "Completed",
    amount: "+R 36.42",
    institution: "Capitec Bank",
  },
  {
    date: "19 March 2024",
    type: "Deposit",
    status: "Completed",
    amount: "+R 10.46",
    institution: "Capitec Bank",
  },
  {
    date: "14 March 2024",
    type: "Deposit",
    status: "Completed",
    amount: "+R 10.57",
    institution: "Capitec Bank",
  },
  {
    date: "14 March 2024",
    type: "Deposit",
    status: "Rejected",
    amount: "+R 10.57",
    institution: "Local banks of South Africa",
  },
  {
    date: "27 February 2024",
    type: "Deposit",
    status: "Completed",
    amount: "+R 23.35",
    institution: "Capitec Bank",
  },
  {
    date: "04 February 2024",
    type: "Deposit",
    status: "Rejected",
    amount: "+R 23.54",
    institution: "Local banks of South Africa",
  },
  {
    date: "03 April 2023",
    type: "Withdrawal",
    status: "Completed",
    amount: "-R 70.00",
    institution: "Capitec Bank",
  },
  {
    date: "08 March 2023",
    type: "Deposit",
    status: "Completed",
    amount: "+R 126.47",
    institution: "Capitec Bank",
  },
  {
    date: "08 March 2023",
    type: "Deposit",
    status: "Rejected",
    amount: "+R 126.43",
    institution: "Local banks of South Africa",
  },
  {
    date: "08 March 2023",
    type: "Deposit",
    status: "Rejected",
    amount: "+R 126.43",
    institution: "Local banks of South Africa",
  },
  {
    date: "02 August 2022",
    type: "Withdrawal",
    status: "Completed",
    amount: "-R 27.00",
    institution: "Capitec Bank",
  },
];

const menuItems = [
  "Dashboard",
  "Finances",
  "Rewards Hub",
  "Analytics & Education",
  "Help Center",
  "Profile settings",
];

const filters: TransactionFilter[] = ["All", "Deposit", "Withdrawal"];

function Finances() {
  const [filter, setFilter] = useState<TransactionFilter>("All");
  const [action, setAction] = useState<FinanceAction | null>(null);
  const [amount, setAmount] = useState("");
  const [actionNotice, setActionNotice] = useState("");

  const visibleTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  function openAction(nextAction: FinanceAction) {
    setAmount("");
    setActionNotice("");
    setAction(nextAction);
  }

  function handleActionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActionNotice(`${action} request could not be processed.`);
  }

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
                {menuItems.map((item) =>
                  item === "Dashboard" ||
                  item === "Finances" ||
                  item === "Rewards Hub" ||
                  item === "Analytics & Education" ? (
                    <DropdownMenuItem key={item} asChild>
                      <Link
                        to={
                          item === "Dashboard"
                            ? "/dashboard"
                            : item === "Finances"
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
              href="#transaction-history"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Activity
            </a>
            <button
              type="button"
              aria-label="Notifications"
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

        <section className="py-8 sm:py-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Investment account
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Finances</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage deposits, withdrawals, and account activity.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground">
              <Eye className="size-4" aria-hidden="true" />
              Simulated account
            </span>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <Button
              onClick={() => openAction("Deposit")}
              className="h-11 rounded-lg px-5 font-bold"
            >
              <ArrowDownToLine aria-hidden="true" />
              Deposit
            </Button>
            <Button
              variant="outline"
              onClick={() => openAction("Withdrawal")}
              className="h-11 rounded-lg px-5 font-bold"
            >
              <ArrowUpFromLine aria-hidden="true" />
              Withdrawal
            </Button>
          </div>

          <section
            id="transaction-history"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold">Transaction history</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review your account deposits and withdrawals.
                </p>
              </div>
              <CircleHelp className="size-5 text-muted-foreground" aria-hidden="true" />
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Account
                </p>
                <p className="mt-2 font-bold">MT4</p>
                <p className="mt-1 text-sm text-muted-foreground">Standard 230999094</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Balance
                </p>
                <p className="mt-2 text-xl font-extrabold tabular-nums">R 0.80</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Period
                </p>
                <p className="mt-2 inline-flex items-center gap-2 font-bold">
                  <CalendarDays className="size-4 text-muted-foreground" aria-hidden="true" />
                  All time
                </p>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div aria-label="Filter transactions" className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={filter === item}
                    onClick={() => setFilter(item)}
                    className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      filter === item
                        ? "bg-primary text-primary-foreground"
                        : "border border-input bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {visibleTransactions.length} transactions
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Type
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Method
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-bold">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {visibleTransactions.map((transaction, index) => (
                    <tr key={`${transaction.date}-${transaction.type}-${index}`}>
                      <td className="whitespace-nowrap px-4 py-4 font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <Clock3 className="size-4 text-muted-foreground" aria-hidden="true" />
                          {transaction.date}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold">{transaction.type}</td>
                      <td className="px-4 py-4 text-muted-foreground">{transaction.institution}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            transaction.status === "Completed"
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-red-50 text-red-800"
                          }`}
                        >
                          {transaction.status === "Completed" ? (
                            <CheckCircle2 className="size-3.5" aria-hidden="true" />
                          ) : (
                            <XCircle className="size-3.5" aria-hidden="true" />
                          )}
                          {transaction.status}
                        </span>
                      </td>
                      <td
                        className={`whitespace-nowrap px-4 py-4 text-right font-extrabold tabular-nums ${
                          transaction.type === "Deposit" ? "text-emerald-700" : "text-foreground"
                        }`}
                      >
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleTransactions.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No transactions to display.
                </p>
              )}
            </div>
          </section>
        </section>
      </div>

      <Dialog open={action !== null} onOpenChange={(open) => !open && setAction(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{action} funds</DialogTitle>
            <DialogDescription>Enter the amount you would like to request.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleActionSubmit} className="space-y-5">
            <div>
              <label htmlFor="finance-amount" className="mb-2 block text-sm font-semibold">
                Amount
              </label>
              <div className="flex h-11 items-center rounded-lg border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                <span className="mr-2 text-sm text-muted-foreground">R</span>
                <input
                  id="finance-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className="h-full w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            {actionNotice && (
              <p role="status" className="rounded-lg bg-muted px-3 py-2 text-sm">
                {actionNotice}
              </p>
            )}
            <DialogFooter>
              <Button type="submit" className="h-10 rounded-lg px-5 font-bold">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
