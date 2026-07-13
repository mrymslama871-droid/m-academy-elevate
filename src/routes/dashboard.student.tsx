import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  Heart,
  Home,
  ListChecks,
  LineChart,
  Play,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/data";
import { RequireAuth } from "@/components/site/RequireAuth";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "لوحة الطالب — M_Academy" }] }),
  component: () => (
    <RequireAuth role="student">
      <StudentDashboard />
    </RequireAuth>
  ),
});

const nav = [
  { Icon: Home, label: "نظرة عامة" },
  { Icon: BookOpen, label: "موادي" },
  { Icon: Play, label: "متابعة التعلم" },
  { Icon: ListChecks, label: "الواجبات" },
  { Icon: Award, label: "الشهادات" },
  { Icon: LineChart, label: "التقدم" },
  { Icon: Trophy, label: "الدرجات" },
  { Icon: Calendar, label: "الجدول" },
  { Icon: Heart, label: "المفضلة" },
  { Icon: CreditCard, label: "المدفوعات" },
];

function StudentDashboard() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="p-3">
          <nav className="flex flex-col gap-1">
            {nav.map((n, i) => (
              <button
                key={i}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  i === 0 ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-accent"
                }`}
              >
                <n.Icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>
        </Card>
      </aside>

      <div className="space-y-6">
        <div className="rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-primary-foreground/80">أهلاً مرة أخرى</p>
              <h1 className="mt-1 text-3xl font-black">محمد أحمد 👋</h1>
              <p className="mt-2 text-primary-foreground/85">أكملت 68% من هدفك الأسبوعي — استمر!</p>
            </div>
            <div className="w-full max-w-xs">
              <div className="mb-2 flex justify-between text-sm">
                <span>الهدف الأسبوعي</span><span>68%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-l from-gold to-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { l: "موادي", v: "6", Icon: BookOpen },
            { l: "شهادات", v: "3", Icon: Award },
            { l: "نقاطي", v: "2,480", Icon: Trophy },
            { l: "ترتيبي", v: "#124", Icon: Users },
          ].map((s) => (
            <Card key={s.l} className="p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <s.Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-2xl font-black">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold">تابع التعلم</h3>
            <Link to="/courses"><Button variant="outline" size="sm">كل المواد</Button></Link>
          </div>
          <div className="mt-4 space-y-3">
            {courses.slice(0, 3).map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-4">
                <div className={`h-16 w-24 shrink-0 rounded-lg bg-gradient-to-br ${c.color}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.teacher}</div>
                  <Progress value={Math.floor(Math.random() * 60) + 20} className="mt-2 h-1.5" />
                </div>
                <Button size="sm" className="bg-gradient-primary text-primary-foreground gap-2">
                  <Play className="h-4 w-4" /> متابعة
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-extrabold">واجباتي</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["واجب رياضيات — الباب الأول", "واجب فيزياء — الفصل 3", "واجب إنجليزي — قراءة"].map((t, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <span>{t}</span>
                  <Badge variant="secondary">مطلوب</Badge>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-extrabold">شهاداتي</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["شهادة إتمام مادة الأحياء", "شهادة تفوق — الفصل الأول", "شارة أسبوع مثالي"].map((t, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <span className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> {t}</span>
                  <Link to="/certificates"><Button size="sm" variant="outline">عرض</Button></Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
