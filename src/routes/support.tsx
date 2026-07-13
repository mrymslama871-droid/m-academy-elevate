import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, LifeBuoy, MessageCircle, MessageSquare, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "الدعم — M_Academy" }] }),
  component: SupportPage,
});

const channels = [
  { Icon: MessageSquare, t: "اسأل المدرس", d: "أرسل سؤالك مباشرة لمدرس المادة." },
  { Icon: LifeBuoy, t: "الدعم الفني", d: "مشاكل تقنية؟ فريقنا مستعد." },
  { Icon: Phone, t: "واتساب", d: "تواصل معنا على واتساب مباشرة." },
  { Icon: Send, t: "الدردشة المباشرة", d: "شات فوري مع فريق الدعم." },
  { Icon: MessageCircle, t: "نموذج الاتصال", d: "أرسل رسالة مفصلة عبر النموذج." },
  { Icon: HelpCircle, t: "مركز المساعدة", d: "استعرض الأسئلة الشائعة." },
];

function SupportPage() {
  return (
    <>
      <PageHeader eyebrow="مركز الدعم" title="نحن هنا لمساعدتك" description="اختر القناة الأنسب لك، سنرد خلال أقل من 24 ساعة." />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <Card key={c.t} className="border-border/70 bg-gradient-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <c.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold">{c.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              <Button variant="outline" className="mt-4">فتح</Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
