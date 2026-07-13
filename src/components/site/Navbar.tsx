import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  GraduationCap,
  Home,
  LogIn,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/courses", label: "المواد الدراسية" },
  { to: "/exams", label: "الامتحانات" },
  { to: "/schedule", label: "جدول الحصص" },
  { to: "/teachers", label: "المدرسين" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight">
                M<span className="text-gradient">_Academy</span>
              </span>
              <span className="text-[10px] text-muted-foreground">منصة التعلم الاحترافية</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="mx-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="ms-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="بحث"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hidden md:inline-flex" aria-label="الإشعارات">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 end-2 h-2 w-2 rounded-full bg-brand" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="الوضع الليلي" className="hidden md:inline-flex">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/profile" className="hidden md:inline-flex">
              <Button variant="ghost" size="icon" aria-label="الملف الشخصي">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login" className="hidden md:inline-flex">
              <Button variant="ghost" className="gap-2">
                <LogIn className="h-4 w-4" />
                تسجيل الدخول
              </Button>
            </Link>
            <Link to="/register" className="hidden md:inline-flex">
              <Button className="gap-2 bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
                <UserPlus className="h-4 w-4" />
                إنشاء حساب
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="القائمة"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border/60 bg-background/70 px-4 py-3">
            <div className="mx-auto flex max-w-3xl items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="ابحث عن مادة، مدرس، أو درس..." className="border-0 bg-transparent focus-visible:ring-0" />
              <Sparkles className="h-4 w-4 text-brand" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile */}
      {open && (
        <div className="lg:hidden">
          <div className="glass border-b border-border/60 px-4 py-4">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    pathname === l.to ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/60",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-border" />
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={toggle} className="gap-2">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  الوضع
                </Button>
                <Link to="/notifications" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Bell className="h-4 w-4" /> الإشعارات
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <User className="h-4 w-4" /> حسابي
                  </Button>
                </Link>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="h-4 w-4" /> دخول
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full gap-2 bg-gradient-primary text-primary-foreground">
                    <BookOpen className="h-4 w-4" /> إنشاء حساب
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
