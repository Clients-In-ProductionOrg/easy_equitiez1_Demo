import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/profile-settings")({
  head: () => ({
    meta: [
      { title: "Profile Settings | EasyEquities" },
      {
        name: "description",
        content: "Review profile, verification, security, and subscription settings.",
      },
    ],
  }),
  component: ProfileSettings,
});

const menuItems = [
  "Dashboard",
  "Finances",
  "Rewards Hub",
  "Analytics & Education",
  "Help Center",
  "Profile settings",
];

function ProfileSettings() {
  const [notice, setNotice] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);

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
                  item === "Analytics & Education" ||
                  item === "Help Center" ||
                  item === "Profile settings" ? (
                    <DropdownMenuItem key={item} asChild>
                      <Link
                        to={
                          item === "Dashboard"
                            ? "/dashboard"
                            : item === "Finances"
                              ? "/finances"
                              : item === "Rewards Hub"
                                ? "/rewards-hub"
                                : item === "Analytics & Education"
                                  ? "/analytics-education"
                                  : item === "Help Center"
                                    ? "/help-center"
                                    : "/profile-settings"
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
            <Link
              to="/finances"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Activity
            </Link>
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
                Account
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Profile</h1>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    aria-label="Profile avatar"
                    className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <UserRound className="size-10" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold">Alex Morgan</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Registered: 09.05.2022</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-extrabold">Verification</h2>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-4" aria-hidden="true" />
                      Email
                    </dt>
                    <dd className="mt-2 break-all font-semibold">a••••••@example.com</dd>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-4">
                    <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4" aria-hidden="true" />
                      Phone number
                    </dt>
                    <dd className="mt-2 font-semibold">+27 •• ••• ••43</dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <MapPin className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-extrabold">Contacts</h2>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm text-muted-foreground">Country</dt>
                    <dd className="mt-1 font-semibold">South Africa</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Address</dt>
                    <dd className="mt-1 font-semibold">Giyani, Limpopo, South Africa</dd>
                  </div>
                </dl>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">Social networks</p>
                  <p className="mt-1 text-sm font-semibold">No social accounts connected</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice("Profile contact editing is not available yet.")}
                  className="mt-5 inline-flex h-9 items-center rounded-lg border border-input px-4 text-sm font-bold transition hover:bg-muted"
                >
                  Edit
                </button>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <LockKeyhole className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-extrabold">Security</h2>
                </div>
                <div className="divide-y divide-border">
                  <div className="flex items-center justify-between gap-3 py-4 first:pt-0">
                    <div>
                      <p className="text-sm text-muted-foreground">Confirmation method</p>
                      <p className="mt-1 font-semibold">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Password</p>
                      <p className="mt-1 font-semibold">••••••••••</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-input px-3 py-2 text-sm font-bold hover:bg-muted"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4">
                    <div>
                      <p className="text-sm font-semibold">Two-factor authentication</p>
                      <p className="mt-1 text-sm text-muted-foreground">Not enabled</p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      Off
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-4 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold">Login history</p>
                      <p className="mt-1 text-sm text-muted-foreground">Recent account access</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-bold text-primary hover:bg-primary/5"
                    >
                      View history
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <CreditCard className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="text-lg font-extrabold">Subscriptions</h2>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 size-4 text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Email notifications</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Receive account updates by email
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Turn email notifications ${emailNotifications ? "off" : "on"}`}
                    aria-pressed={emailNotifications}
                    onClick={() => setEmailNotifications((enabled) => !enabled)}
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition ${
                      emailNotifications
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-background text-muted-foreground"
                    }`}
                  >
                    {emailNotifications && <Check className="size-4" aria-hidden="true" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice("Subscription preferences are saved for this session.")}
                  className="mt-5 inline-flex h-9 items-center rounded-lg border border-input px-4 text-sm font-bold transition hover:bg-muted"
                >
                  Edit
                </button>
              </section>
            </div>
          </div>

          {notice && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              {notice}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
