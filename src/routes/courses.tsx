import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Filter, Play, Search, Star, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "المواد الدراسية — M_Academy" }] }),
  component: CoursesPage,
});

const subjects = ["الكل", ...Array.from(new Set(courses.map((c) => c.subject)))];

function CoursesPage() {
  const [q, setQ] = useState("");
  const [sub, setSub] = useState("الكل");

  const list = useMemo(
    () => courses.filter((c) => (sub === "الكل" || c.subject === sub) && c.title.includes(q)),
    [q, sub],
  );

  return (
    <>
      <PageHeader
        eyebrow="المكتبة الدراسية"
        title="كل المواد الدراسية في مكان واحد"
        description="اختر مادتك، تابع الفصول والدروس، وحمّل ملفاتك، وتفاعل مع مدرسك وزملائك."
      />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <Card className="glass p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن مادة..." className="border-0 bg-transparent focus-visible:ring-0" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    sub === s ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Card key={c.id} className="group overflow-hidden border-border/70 p-0 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className={`relative aspect-video bg-gradient-to-br ${c.color}`}>
                <div className="absolute inset-0 bg-black/10" />
                {c.tag && <Badge className="absolute top-3 end-3 bg-gold text-primary hover:bg-gold">{c.tag}</Badge>}
                <div className="absolute bottom-3 start-3 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {c.subject}
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
                  <Link to="/courses/$id" params={{ id: c.id }}>
                    <Button size="sm" className="bg-gradient-primary text-primary-foreground">اعرف المزيد</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
          {list.length === 0 && (
            <Card className="col-span-full p-10 text-center text-muted-foreground">لا توجد نتائج مطابقة.</Card>
          )}
        </div>
      </section>
    </>
  );
}
