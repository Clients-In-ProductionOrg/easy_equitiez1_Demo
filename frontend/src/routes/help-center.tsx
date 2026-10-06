import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Bot, ChevronRight, LayoutDashboard, LogOut, Send, Wallet } from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center | EasyEquities" },
      {
        name: "description",
        content: "Chat with Maya for help finding account and platform information.",
      },
    ],
  }),
  component: HelpCenter,
});

const mayaAvatar =
  "https://cdn.files-text.com/us-south1/api/lc/img/16620801/0980e0230c3857e158757ce69cc0c0ba.jpeg";

const menuItems = [
  "Dashboard",
  "Finances",
  "Rewards Hub",
  "Analytics & Education",
  "Help Center",
  "Profile settings",
];

type ChatMessage = {
  id: number;
  sender: "maya" | "visitor";
  text: string;
  link?: { label: string; href: string };
};

function getMayaReply(message: string): Omit<ChatMessage, "id" | "sender"> {
  const query = message.toLowerCase();

  if (query.includes("deposit") || query.includes("withdraw") || query.includes("finance")) {
    return {
      text: "You can find deposit and withdrawal options in Finances.",
      link: { label: "Open Finances", href: "/finances" },
    };
  }

  if (query.includes("vps") || query.includes("server") || query.includes("reward")) {
    return {
      text: "VPS service information is available in Rewards Hub.",
      link: { label: "Open Rewards Hub", href: "/rewards-hub" },
    };
  }

  if (
    query.includes("learn") ||
    query.includes("course") ||
    query.includes("calendar") ||
    query.includes("education")
  ) {
    return {
      text: "Explore courses and market calendars in Analytics & Education.",
      link: { label: "Open Analytics & Education", href: "/analytics-education" },
    };
  }

  if (query.includes("profile") || query.includes("password") || query.includes("email")) {
    return {
      text: "Profile and security preferences are grouped in Profile settings.",
      link: { label: "Open Profile settings", href: "/profile-settings" },
    };
  }

  if (query.includes("portfolio") || query.includes("dashboard") || query.includes("balance")) {
    return {
      text: "Your portfolio overview is available from the dashboard.",
      link: { label: "Open Dashboard", href: "/dashboard" },
    };
  }

  return {
    text: "I can help you find Finances, Rewards Hub, Analytics & Education, Profile settings, or your Dashboard. What would you like to open?",
  };
}

function HelpCenter() {
  const [chatOpen, setChatOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const nextId = messages.length;
    const reply = getMayaReply(text);
    setMessages((current) => [
      ...current,
      { id: nextId, sender: "visitor", text },
      { id: nextId + 1, sender: "maya", ...reply },
    ]);
    setDraft("");
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

        <section className="mx-auto max-w-3xl py-10 sm:py-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-4 border-b border-border p-5 sm:p-6">
              <img
                src={mayaAvatar}
                alt="Maya"
                className="size-14 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Help Center
                </p>
                <h1 className="mt-1 text-2xl font-extrabold">Maya</h1>
              </div>
              <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Chat assistant
              </span>
            </div>

            {!chatOpen ? (
              <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
                <img
                  src={mayaAvatar}
                  alt=""
                  aria-hidden="true"
                  className="mx-auto size-24 rounded-full object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="mx-auto mt-7 max-w-lg rounded-2xl bg-muted/60 p-5 text-left">
                  <p className="text-lg font-bold">Hello there! 👋</p>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    Have any questions? Feel free to send us a message — we’re here and happy to
                    help!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMessages([
                      {
                        id: 0,
                        sender: "maya",
                        text: "Hi! I’m Maya. Ask me about your dashboard, finances, VPS service, learning resources, or profile settings.",
                      },
                    ]);
                    setChatOpen(true);
                  }}
                  className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-extrabold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Bot className="size-5" aria-hidden="true" />
                  Let&apos;s chat
                </button>
              </div>
            ) : (
              <div className="flex min-h-[440px] flex-col">
                <div
                  aria-live="polite"
                  aria-label="Chat messages"
                  className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === "visitor" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "maya" && (
                        <img
                          src={mayaAvatar}
                          alt=""
                          aria-hidden="true"
                          className="size-9 shrink-0 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.sender === "visitor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        {message.link && (
                          <Link
                            to={message.link.href}
                            className="mt-2 inline-flex items-center gap-1 font-bold text-primary underline underline-offset-2"
                          >
                            {message.link.label}
                            <ChevronRight className="size-4" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex gap-2 border-t border-border p-4 sm:p-5"
                >
                  <label htmlFor="help-message" className="sr-only">
                    Type your message
                  </label>
                  <input
                    id="help-message"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type your message..."
                    className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!draft.trim()}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="size-4" aria-hidden="true" />
                  </button>
                </form>
              </div>
            )}

            <div className="border-t border-border px-5 py-3 text-right text-xs text-muted-foreground">
              Powered by EasyEquities
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
