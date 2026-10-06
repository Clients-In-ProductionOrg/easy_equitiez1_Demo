import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calculator, Eye, EyeOff, LockKeyhole, TrendingUp } from "lucide-react";
import { useState, type FormEvent } from "react";
import { brokerPartners } from "@/lib/broker-partners";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in | EasyEquities" },
      {
        name: "description",
        content: "Log in to EasyEquities and continue your investment journey.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void navigate({ to: "/dashboard" });
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-16">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <Link
            to="/"
            aria-label="EasyEquities home"
            className="mb-12 inline-flex items-center gap-1 text-3xl leading-none text-primary"
          >
            <Calculator className="mr-1 size-7" aria-hidden="true" />
            <span className="font-extrabold">Easy</span>
            <span className="font-light">Equities</span>
          </Link>

          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
            Welcome back
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Log in to your account
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Choose a company, then enter your login details.
          </p>

          <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-bold text-foreground">
                Choose a company
              </label>
              <select
                id="company"
                name="company"
                defaultValue=""
                className="h-12 w-full rounded-lg border border-input bg-card px-4 text-base text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="" disabled>
                  Select the company you want to log in to
                </option>
                {brokerPartners.map((partner) => (
                  <option key={partner.name} value={partner.name}>
                    {partner.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-foreground">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-12 w-full rounded-lg border border-input bg-card px-4 text-base text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="text-sm font-bold text-foreground">
                  Password
                </label>
                <span className="text-xs font-medium text-muted-foreground">
                  Password recovery coming soon
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-input bg-card px-4 pr-12 text-base text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" aria-hidden="true" />
                  ) : (
                    <Eye className="size-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <LockKeyhole className="size-4" aria-hidden="true" />
              Log in
            </button>
          </form>

          <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
            Your investments are important. Never share your password with anyone.
          </p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            New to EasyEquities?{" "}
            <Link to="/register" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-accent px-12 py-16 text-accent-foreground lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-80 rounded-full border-[48px] border-primary/30"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-24 size-96 rounded-full border-[56px] border-primary/20"
        />
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/15">
            <TrendingUp className="size-6" aria-hidden="true" />
          </span>
          <span className="text-sm font-extrabold uppercase tracking-[0.16em]">
            Your future, invested
          </span>
        </div>

        <div className="relative z-10 max-w-xl py-16">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white/70">
            Make today count
          </p>
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight xl:text-6xl">
            Small steps.
            <br />
            Big possibilities.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
            Get back to a simpler way to invest in the things you believe in.
          </p>
          <div className="mt-12 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15">
              <LockKeyhole className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold">Your account, your way</p>
              <p className="mt-1 text-sm leading-6 text-white/70">
                A platform built to make investing more accessible.
              </p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/60">
          Investing involves risk. The value of your investments may go up or down.
        </p>
      </aside>
    </main>
  );
}
