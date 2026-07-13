import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Bell, BookOpen, CreditCard, GraduationCap, LifeBuoy, ShieldCheck, Ticket, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { RequireAuth } from "@/components/site/RequireAuth";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "لوحة الإدارة — M_Academy" }] }),
  component: () => (
    <RequireAuth role="admin">
      <AdminDashboard />
    </RequireAuth>
  ),
});

const modules = [
  { Icon: GraduationCap, t: "إدارة المدرسين", c: 150 },
  { Icon: Users, t: "إدارة الطلاب", c: 25400 },
  { Icon: BookOpen, t: "إدارة المواد", c: 312 },
  { Icon: CreditCard, t: "إدارة المدفوعات", c: 1240 },
  { Icon: BarChart3, t: "التحليلات والتقارير", c: null },
  { Icon: Ticket, t: "الكوبونات", c: 42 },
  { Icon: Bell, t: "الإشعارات", c: null },
  { Icon: LifeBuoy, t: "تذاكر الدعم", c: 18 },
  { Icon: ShieldCheck, t: "صلاحيات المستخدمين", c: null },
];

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant">
        <p className="text-sm text-primary-foreground/80">لوحة التحكم</p>
        <h1 className="mt-1 text-3xl font-black">مركز إدارة M_Academy</h1>
        <p className="mt-2 text-primary-foreground/85">نظرة شاملة على أداء المنصة وعملياتها.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { l: "إجمالي المستخدمين", v: "25,690" },
          { l: "الإيرادات (الشهر)", v: "1.24M ج.م" },
          { l: "الاشتراكات النشطة", v: "18,420" },
          { l: "معدل الاحتفاظ", v: "94%" },
        ].map((s) => (
          <Card key={s.l} className="p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="mt-2 text-2xl font-black text-gradient">{s.v}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.t} className="group p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <m.Icon className="h-5 w-5" />
              </div>
              {m.c != null && <Badge variant="secondary">{m.c.toLocaleString("ar-EG")}</Badge>}
            </div>
            <h3 className="mt-4 text-lg font-extrabold">{m.t}</h3>
            <Button variant="outline" size="sm" className="mt-4">فتح</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
