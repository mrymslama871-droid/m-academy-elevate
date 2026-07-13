import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, DollarSign, FileText, Megaphone, MessageSquare, PlayCircle, Upload, Users, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { RequireAuth } from "@/components/site/RequireAuth";

export const Route = createFileRoute("/dashboard/teacher")({
  head: () => ({ meta: [{ title: "لوحة المدرس — M_Academy" }] }),
  component: () => (
    <RequireAuth role="teacher">
      <TeacherDashboard />
    </RequireAuth>
  ),
});

const actions = [
  { Icon: Upload, t: "رفع فيديو" },
  { Icon: FileText, t: "رفع PDF" },
  { Icon: PlayCircle, t: "إنشاء امتحان" },
  { Icon: FileText, t: "إنشاء واجب" },
  { Icon: Megaphone, t: "إعلان" },
  { Icon: Video, t: "حصة لايف" },
];

function TeacherDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant">
        <p className="text-sm text-primary-foreground/80">أهلاً</p>
        <h1 className="mt-1 text-3xl font-black">د. أحمد السيد</h1>
        <p className="mt-2 text-primary-foreground/85">لديك 3 واجبات بحاجة تصحيح و12 سؤال جديد من الطلاب.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { l: "الطلاب", v: "24,800", Icon: Users },
          { l: "المواد", v: "12", Icon: FileText },
          { l: "إيرادات الشهر", v: "184,300 ج.م", Icon: DollarSign },
          { l: "متوسط التقييم", v: "4.9", Icon: BarChart3 },
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

      <Card className="mt-6 p-6">
        <h3 className="text-lg font-extrabold">إجراءات سريعة</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {actions.map((a) => (
            <button key={a.t} className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <a.Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold">{a.t}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-extrabold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-brand" /> أسئلة الطلاب</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "ممكن توضيح المثال 4 في الباب الثالث؟",
              "متى موعد الامتحان الشامل؟",
              "الحل الصحيح للتمرين رقم 12؟",
            ].map((q, i) => (
              <li key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                <span>{q}</span>
                <Button size="sm" variant="outline">رد</Button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-extrabold">تحليلات الأداء</h3>
          <div className="mt-4 space-y-3">
            {[
              { l: "متوسط الحضور", v: "88%" },
              { l: "إتمام الدروس", v: "72%" },
              { l: "متوسط الدرجات", v: "84/100" },
            ].map((s) => (
              <div key={s.l} className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
                <span className="text-sm">{s.l}</span>
                <Badge className="bg-gradient-primary text-primary-foreground">{s.v}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
