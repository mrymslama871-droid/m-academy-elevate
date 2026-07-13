import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Radio, Video } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { schedule } from "@/lib/data";

export const Route = createFileRoute("/schedule")({
  head: () => ({ meta: [{ title: "جدول الحصص — M_Academy" }] }),
  component: SchedulePage,
});

function typeIcon(t: string) {
  if (t === "لايف") return { Icon: Radio, cls: "text-rose-500" };
  if (t === "امتحان") return { Icon: Calendar, cls: "text-gold" };
  return { Icon: Video, cls: "text-brand" };
}

function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="جدول الأسبوع"
        title="جدول الحصص الأسبوعي"
        description="لا تفوّت أي حصة — كل شيء منظم في مكان واحد مع تذكيرات آلية."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {schedule.map((d) => (
            <Card key={d.day} className="overflow-hidden border-border/70 p-0 shadow-card">
              <div className="flex items-center justify-between bg-gradient-primary px-5 py-3 text-primary-foreground">
                <span className="font-extrabold">{d.day}</span>
                <Badge className="bg-white/20 text-white hover:bg-white/25">{d.items.length} حصة</Badge>
              </div>
              <ul className="divide-y divide-border">
                {d.items.map((it, i) => {
                  const { Icon, cls } = typeIcon(it.type);
                  return (
                    <li key={i} className="flex items-center justify-between gap-3 p-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-10 w-10 place-items-center rounded-xl bg-muted ${cls}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold">{it.subject}</div>
                          <div className="text-xs text-muted-foreground">{it.teacher}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{it.time}</div>
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{it.type}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
