import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "الأسئلة الشائعة — M_Academy" }] }),
  component: FaqPage,
});

const faqs = [
  { q: "كيف أشترك في المنصة؟", a: "أنشئ حساباً جديداً، اختر المادة أو خطة الاشتراك المناسبة، ثم أكمل عملية الدفع." },
  { q: "هل يمكنني إلغاء الاشتراك؟", a: "نعم، يمكنك إلغاء أو استرداد الاشتراك خلال 14 يوماً من تاريخ الشراء." },
  { q: "هل تعمل المنصة على الموبايل؟", a: "نعم، المنصة متجاوبة بالكامل على جميع الأجهزة." },
  { q: "هل الشهادات معتمدة؟", a: "نعم، تصدر الشهادات باسم M_Academy وتحمل توقيعاً رقمياً." },
  { q: "هل هناك امتحانات تجريبية؟", a: "نعم، بعد كل درس وباب، بالإضافة إلى امتحان نهائي شامل." },
];

function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="مركز المساعدة" title="الأسئلة الشائعة" />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card p-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`}>
              <AccordionTrigger className="text-right font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
