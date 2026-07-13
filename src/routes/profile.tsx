import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, Camera, Edit3, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "الملف الشخصي — M_Academy" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <>
      <PageHeader eyebrow="حسابي" title="الملف الشخصي" description="بياناتك، تقدمك، وشاراتك في مكان واحد." />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-14 lg:grid-cols-[320px_1fr]">
        <Card className="p-6 text-center">
          <div className="relative mx-auto h-28 w-28">
            <div className="grid h-full w-full place-items-center rounded-3xl bg-gradient-primary text-4xl font-black text-primary-foreground shadow-glow">
              م
            </div>
            <button className="absolute -bottom-2 end-0 grid h-9 w-9 place-items-center rounded-full border border-border bg-card shadow-card">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 text-lg font-extrabold">محمد أحمد</div>
          <div className="text-sm text-muted-foreground">طالب — الثانوية العامة</div>
          <Badge className="mt-3 bg-gradient-primary text-primary-foreground">Premium</Badge>

          <div className="mt-6 space-y-2 text-start text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> m.ahmed@example.com</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +20 100 111 2222</div>
            <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> الجيزة، مصر</div>
          </div>
          <Button variant="outline" className="mt-6 w-full gap-2"><Edit3 className="h-4 w-4" /> تعديل البيانات</Button>
        </Card>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { l: "المواد المشترك بها", v: "6", Icon: BookOpen },
              { l: "الشهادات", v: "3", Icon: Award },
              { l: "نقاطي", v: "2,480", Icon: Trophy },
              { l: "الترتيب", v: "#124", Icon: Trophy },
            ].map((s) => (
              <Card key={s.l} className="p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <s.Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-2xl font-black">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-extrabold">تقدمي الحالي</h3>
            <div className="mt-4 space-y-4">
              {[
                { s: "الرياضيات", p: 72 },
                { s: "الفيزياء", p: 58 },
                { s: "الكيمياء", p: 34 },
                { s: "الإنجليزي", p: 90 },
              ].map((c) => (
                <div key={c.s}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-semibold">{c.s}</span>
                    <span className="text-muted-foreground">{c.p}%</span>
                  </div>
                  <Progress value={c.p} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-extrabold">اللوحات المتاحة</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { l: "لوحة الطالب", to: "/dashboard/student" },
                { l: "لوحة المدرس", to: "/dashboard/teacher" },
                { l: "لوحة الإدارة", to: "/dashboard/admin" },
              ].map((d) => (
                <Link key={d.to} to={d.to}>
                  <Button variant="outline" className="w-full">{d.l}</Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
