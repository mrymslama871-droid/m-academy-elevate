import { createFileRoute } from "@tanstack/react-router";
import { AlarmClock, Award, Bell, BookOpen, CreditCard, Megaphone, Video } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "الإشعارات — M_Academy" }] }),
  component: NotificationsPage,
});

const items = [
  { Icon: BookOpen, t: "درس جديد أُضيف: التفاضل والتكامل — الفصل 4", time: "منذ 12 دقيقة", tag: "درس", unread: true },
  { Icon: AlarmClock, t: "تذكير: امتحان الباب الأول غداً الساعة 7م", time: "منذ ساعة", tag: "امتحان", unread: true },
  { Icon: Video, t: "حصة لايف الآن مع د. محمد فهمي — الفيزياء", time: "منذ ساعتين", tag: "لايف" },
  { Icon: CreditCard, t: "تم تجديد اشتراكك الشهري بنجاح", time: "أمس", tag: "دفع" },
  { Icon: Megaphone, t: "إعلان: خصم 25% على جميع المواد لمدة 48 ساعة", time: "منذ يومين", tag: "إعلان" },
  { Icon: Award, t: "مبروك! حصلت على شارة "أسبوع مثالي"", time: "منذ 3 أيام", tag: "إنجاز" },
];

function NotificationsPage() {
  return (
    <>
      <PageHeader eyebrow="مركز الإشعارات" title="كل ما فاتك في مكان واحد" />
      <section className="mx-auto max-w-4xl px-6 py-14">
        <Card className="divide-y divide-border p-0">
          {items.map((n, i) => (
            <div key={i} className="flex items-start gap-4 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <n.Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{n.t}</span>
                  {n.unread && <span className="h-2 w-2 rounded-full bg-brand" />}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{n.tag}</Badge>
                  <span>{n.time}</span>
                </div>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </Card>
      </section>
    </>
  );
}
