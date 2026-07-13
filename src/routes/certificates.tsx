import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Share2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/certificates")({
  head: () => ({ meta: [{ title: "الشهادات — M_Academy" }] }),
  component: CertificatesPage,
});

const list = [
  { t: "شهادة إتمام مادة الرياضيات", date: "12 مارس 2026", grade: "أ+" },
  { t: "شهادة إتمام مادة الفيزياء", date: "22 أبريل 2026", grade: "أ" },
  { t: "شهادة تفوق — الفصل الدراسي الأول", date: "05 يونيو 2026", grade: "ممتاز" },
];

function CertificatesPage() {
  return (
    <>
      <PageHeader eyebrow="إنجازاتك" title="شهاداتك المعتمدة" description="حمّل شهاداتك بصيغة PDF أو شاركها على منصات التواصل." />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Card key={i} className="overflow-hidden border-border/70 p-0 shadow-card">
              <div className="relative aspect-[4/3] bg-gradient-hero p-6 text-primary-foreground">
                <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-70" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <div className="text-xs opacity-80">M_Academy</div>
                    <Award className="h-6 w-6 text-gold" />
                  </div>
                  <div className="my-auto text-center">
                    <div className="text-xs opacity-80">شهادة</div>
                    <div className="mt-1 text-lg font-black">{c.t}</div>
                    <div className="mt-3 text-xs opacity-80">التقدير: <span className="font-bold text-gold">{c.grade}</span></div>
                  </div>
                  <div className="text-center text-[10px] opacity-70">تاريخ الإصدار: {c.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4">
                <Button size="sm" className="flex-1 bg-gradient-primary text-primary-foreground gap-2" onClick={() => toast.success("جاري تحميل الشهادة...")}>
                  <Download className="h-4 w-4" /> تحميل PDF
                </Button>
                <Button size="sm" variant="outline" className="gap-2"><Share2 className="h-4 w-4" /> مشاركة</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
