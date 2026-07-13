import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Star, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teachers } from "@/lib/data";

export const Route = createFileRoute("/teachers")({
  head: () => ({ meta: [{ title: "المدرسين — M_Academy" }] }),
  component: TeachersPage,
});

function TeachersPage() {
  return (
    <>
      <PageHeader
        eyebrow="فريق التدريس"
        title="تعرّف على نخبة المدرسين"
        description="مدرسون معتمدون بخبرة سنوات طويلة في تحقيق أعلى الدرجات لطلابهم."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t) => (
            <Card key={t.id} className="group relative overflow-hidden border-border/70 bg-gradient-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className={`pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${t.color} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />
              <div className="relative flex items-center gap-4">
                <div className={`grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br ${t.color} text-2xl font-black text-white shadow-glow`}>
                  {t.name.split(" ")[1]?.[0] ?? "م"}
                </div>
                <div>
                  <div className="text-lg font-extrabold">{t.name}</div>
                  <div className="text-sm text-brand">{t.subject}</div>
                </div>
              </div>
              <p className="relative mt-4 text-sm leading-7 text-muted-foreground">{t.bio}</p>
              <div className="relative mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted/50 p-2"><Star className="mx-auto h-4 w-4 fill-gold text-gold" /><div className="mt-1 font-bold">{t.rating}</div></div>
                <div className="rounded-lg bg-muted/50 p-2"><Users className="mx-auto h-4 w-4 text-brand" /><div className="mt-1 font-bold">{t.students.toLocaleString("ar-EG")}</div></div>
                <div className="rounded-lg bg-muted/50 p-2"><BookOpen className="mx-auto h-4 w-4 text-primary" /><div className="mt-1 font-bold">{t.courses}</div></div>
              </div>
              <Button className="relative mt-5 w-full bg-gradient-primary text-primary-foreground">عرض المواد</Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
