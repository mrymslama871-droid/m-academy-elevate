import { createFileRoute, Link } from "@tanstack/react-router";
import { AlarmClock, CheckCircle2, FileText, Play, RotateCcw, Timer, Trophy } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/exams")({
  head: () => ({ meta: [{ title: "الامتحانات — M_Academy" }] }),
  component: ExamsPage,
});

const kinds = [
  { icon: Timer, title: "امتحان يومي", text: "اختبار قصير كل يوم لتثبيت المعلومات." },
  { icon: FileText, title: "امتحان على الدرس", text: "أسئلة على كل درس بعد مشاهدته." },
  { icon: FileText, title: "امتحان على الباب", text: "امتحان شامل بعد إنهاء كل باب." },
  { icon: Trophy, title: "الامتحان النهائي", text: "امتحان تراكمي شامل للمنهج." },
];

const upcoming = [
  { title: "امتحان الباب الأول — رياضيات", date: "17 يوليو 2026", time: "07:00 م", duration: "45 دقيقة", questions: 25 },
  { title: "امتحان الدرس 4 — فيزياء", date: "18 يوليو 2026", time: "05:00 م", duration: "20 دقيقة", questions: 15 },
  { title: "الامتحان النهائي — كيمياء", date: "25 يوليو 2026", time: "08:00 م", duration: "90 دقيقة", questions: 60 },
];

const results = [
  { title: "امتحان الباب الثالث — إنجليزي", score: 92, total: 100, status: "ممتاز" },
  { title: "امتحان الدرس 2 — عربي", score: 78, total: 100, status: "جيد جداً" },
  { title: "امتحان الباب الأول — أحياء", score: 88, total: 100, status: "ممتاز" },
];

function ExamsPage() {
  return (
    <>
      <PageHeader
        eyebrow="نظام الامتحانات"
        title="امتحانات دقيقة وتصحيح فوري"
        description="بنك أسئلة عشوائي، مؤقت زمني، تصحيح تلقائي، وعرض الإجابات الصحيحة مع تقرير مفصل عن أدائك."
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kinds.map((k) => (
            <Card key={k.title} className="border-border/70 bg-gradient-card p-5 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <k.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-extrabold">{k.title}</div>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">{k.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-extrabold">امتحانات قادمة</h2>
            <div className="space-y-3">
              {upcoming.map((e, i) => (
                <Card key={i} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <div className="font-bold">{e.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><AlarmClock className="h-3.5 w-3.5" /> {e.date} — {e.time}</span>
                      <span>{e.duration}</span>
                      <span>{e.questions} سؤال</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary text-primary-foreground gap-2">
                    <Play className="h-4 w-4" /> ابدأ الامتحان
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-extrabold">نتائجي السابقة</h2>
            <div className="space-y-3">
              {results.map((r, i) => (
                <Card key={i} className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-bold">{r.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">التقييم: {r.status}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gradient">{r.score}<span className="text-sm text-muted-foreground">/{r.total}</span></div>
                    </div>
                  </div>
                  <Progress value={r.score} className="mt-3 h-2" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-2"><CheckCircle2 className="h-4 w-4" /> عرض الإجابات</Button>
                    <Button variant="outline" size="sm" className="gap-2"><RotateCcw className="h-4 w-4" /> إعادة الامتحان</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-hero p-8 text-primary-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black">بنك الأسئلة العشوائي</h3>
              <p className="mt-1 text-primary-foreground/80">أكثر من 12,000 سؤال متنوع مع إمكانية توليد امتحان مخصص.</p>
            </div>
            <Link to="/exams">
              <Button className="bg-white text-primary hover:bg-white/90">توليد امتحان مخصص</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
