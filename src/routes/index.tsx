import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  LineChart,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, teachers } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M_Academy — الرئيسية" },
      { name: "description", content: "منصة تعليمية عربية احترافية لتفوق الطلاب — مواد، امتحانات، وتقارير متابعة." },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: Clock, title: "مرونة كاملة في المذاكرة", text: "ذاكر في أي وقت ومن أي مكان ومن أي جهاز." },
  { icon: BookOpen, title: "شرح بسيط ومفهوم", text: "شرح احترافي يناسب جميع المستويات بطريقة سهلة وبسيطة." },
  { icon: Target, title: "امتحانات دورية", text: "اختبارات بعد كل درس وكل باب مع تصحيح فوري." },
  { icon: LineChart, title: "متابعة مستمرة", text: "تقارير توضح مستواك ونسبة إنجازك ونقاط ضعفك." },
  { icon: GraduationCap, title: "أفضل المدرسين", text: "تعلم مع نخبة من أفضل المدرسين أصحاب الخبرة." },
  { icon: Trophy, title: "تحفيز وإنجاز", text: "لوحة شرف وشارات ونقاط تحفيزية للوصول لأفضل النتائج." },
];

const stats = [
  { value: 25000, suffix: "+", label: "طالب" },
  { value: 150, suffix: "+", label: "مدرس" },
  { value: 300, suffix: "+", label: "مادة تعليمية" },
  { value: 1500, suffix: "+", label: "فيديو" },
  { value: 98, suffix: "%", label: "رضا الطلاب" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1600;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString("ar-EG")}
      {suffix}
    </span>
  );
}

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
        <div className="pointer-events-none absolute -bottom-40 -end-40 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 -start-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div className="text-center lg:text-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              المنصة التعليمية رقم 1 في الوطن العربي
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              ليه تشترك <span className="bg-gradient-to-l from-gold to-white bg-clip-text text-transparent">معانا؟</span>
            </h1>
            <p className="mt-6 text-lg leading-9 text-primary-foreground/85">
              إحنا مش مجرد منصة تعليمية... <br className="hidden sm:block" />
              إحنا شركاء نجاحك. هتلاقي أفضل المدرسين، شرح بسيط، امتحانات دورية،
              متابعة مستمرة، وتقارير تساعدك تحقق أعلى الدرجات.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant gap-2">
                  <Zap className="h-4 w-4" /> ابدأ التعلم مجاناً
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="gap-2 border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/15">
                  <Play className="h-4 w-4" /> استعرض المواد
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80 lg:justify-start">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> دفع آمن</span>
              <span className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> شهادات معتمدة</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> +25 ألف طالب</span>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-l from-brand/40 to-primary-glow/40 blur-2xl" />
            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-elegant">
                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70">درسك الحالي</div>
                    <div className="font-bold">التفاضل والتكامل — الفصل 3</div>
                  </div>
                </div>
                <Badge className="bg-gold/90 text-primary hover:bg-gold">جديد</Badge>
              </div>
              <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary/60 to-brand/60">
                <div className="grid h-full place-items-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-primary shadow-glow">
                    <Play className="h-7 w-7 fill-current" />
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs">
                {[
                  { icon: Clock, label: "62 ساعة" },
                  { icon: BookOpen, label: "84 درس" },
                  { icon: Star, label: "4.9/5" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white/10 p-3">
                    <s.icon className="mx-auto h-4 w-4 text-gold" />
                    <div className="mt-1 font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <div className="mb-1 flex justify-between text-xs text-primary-foreground/80">
                  <span>نسبة الإنجاز</span>
                  <span>68%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-l from-gold to-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">مميزات M_Academy</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            كل ما تحتاجه <span className="text-gradient">للتفوق</span> في مكان واحد
          </h2>
          <p className="mt-4 text-muted-foreground">
            تجربة تعليمية متكاملة مصممة لتناسب أسلوبك وترفع مستواك.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group relative overflow-hidden border-border/70 bg-gradient-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* MOTIVATIONAL */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center text-primary-foreground shadow-elegant sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-70" />
            <div className="pointer-events-none absolute -bottom-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <Sparkles className="mx-auto h-8 w-8 text-gold" />
              <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                أنت أقرب لنجاحك مما تتخيل
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-primary-foreground/85">
                ابدأ اليوم... كل خطوة صغيرة بتقربك من حلمك الكبير. <br />
                النجاح يبدأ بقرار. وأنت تقدر تحققه.
              </p>
              <Link to="/register">
                <Button size="lg" className="mt-8 bg-white text-primary hover:bg-white/90 shadow-glow">
                  اتخذ قرارك الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-card p-6 text-center shadow-card"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
              <div className="text-3xl font-black text-gradient sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">المواد المميزة</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">أشهر المواد الدراسية</h2>
          </div>
          <Link to="/courses">
            <Button variant="outline">عرض الكل</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c) => (
            <Card key={c.id} className="group overflow-hidden border-border/70 bg-card p-0 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className={`relative aspect-video bg-gradient-to-br ${c.color}`}>
                <div className="absolute inset-0 bg-black/10" />
                {c.tag && (
                  <Badge className="absolute top-3 end-3 bg-gold text-primary hover:bg-gold">{c.tag}</Badge>
                )}
                <div className="absolute bottom-3 start-3 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {c.subject} • {c.grade}
                </div>
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-primary shadow-glow">
                    <Play className="h-6 w-6 fill-current" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 min-h-[3rem] text-base font-extrabold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.teacher}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {c.rating}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.students.toLocaleString("ar-EG")}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {c.lessons} درس</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-primary">{c.price} ج.م</span>
                    {c.oldPrice && <span className="text-xs text-muted-foreground line-through">{c.oldPrice}</span>}
                  </div>
                  <Link to="/courses">
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground">اشترك</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">نخبة المدرسين</span>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">تعلم مع الأفضل</h2>
          </div>
          <Link to="/teachers"><Button variant="outline">كل المدرسين</Button></Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.slice(0, 3).map((t) => (
            <Card key={t.id} className="border-border/70 bg-gradient-card p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${t.color} text-white shadow-glow text-xl font-black`}>
                  {t.name.split(" ")[1]?.[0] ?? "م"}
                </div>
                <div>
                  <div className="font-extrabold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">مدرس {t.subject}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{t.bio}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {t.rating}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3.5 w-3.5" /> {t.students.toLocaleString("ar-EG")} طالب</span>
                <span className="flex items-center gap-1 text-muted-foreground"><BookOpen className="h-3.5 w-3.5" /> {t.courses} مادة</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { icon: BarChart3, title: "لوحة تحكم الطالب", link: "/dashboard/student", text: "تابع تقدمك، درجاتك وشهاداتك." },
            { icon: GraduationCap, title: "لوحة المدرس", link: "/dashboard/teacher", text: "ارفع الفيديوهات وأنشئ الامتحانات." },
            { icon: ShieldCheck, title: "لوحة الإدارة", link: "/dashboard/admin", text: "إدارة كاملة للمنصة والمستخدمين." },
          ].map((c, i) => (
            <Link key={i} to={c.link}>
              <Card className="group h-full border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                <div className="mt-4 text-sm font-semibold text-primary group-hover:underline">فتح اللوحة ←</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
