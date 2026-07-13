import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Gift, ShieldCheck, Ticket } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/payment")({
  head: () => ({ meta: [{ title: "الدفع الآمن — M_Academy" }] }),
  component: PaymentPage,
});

const methods = [
  "Visa", "MasterCard", "Apple Pay", "Google Pay", "PayPal", "Stripe",
  "Paymob", "Fawry", "InstaPay", "Vodafone Cash", "Orange Cash", "Etisalat Cash", "WE Pay",
];

const plans = [
  { name: "شراء مادة واحدة", price: "499 ج.م", period: "لمرة واحدة", features: ["وصول كامل للمادة", "امتحانات وواجبات", "شهادة إتمام"] },
  { name: "اشتراك شهري", price: "899 ج.م", period: "شهرياً", features: ["وصول لكل المواد", "امتحانات دورية", "دعم فني 24/7"], featured: true },
  { name: "اشتراك سنوي", price: "6,999 ج.م", period: "سنوياً", features: ["كل مميزات الشهري", "خصم 35%", "استشارات فردية"] },
];

function PaymentPage() {
  return (
    <>
      <PageHeader
        eyebrow="الدفع الآمن"
        title="طرق دفع مرنة وآمنة"
        description="ادفع بأي طريقة تناسبك — كل المعاملات مشفرة ومحمية."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={`relative overflow-hidden p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant ${
                p.featured ? "border-brand ring-2 ring-brand" : "border-border/70"
              }`}
            >
              {p.featured && (
                <Badge className="absolute top-4 end-4 bg-gradient-primary text-primary-foreground">الأكثر شيوعاً</Badge>
              )}
              <h3 className="text-lg font-extrabold">{p.name}</h3>
              <div className="mt-4">
                <div className="text-3xl font-black text-gradient">{p.price}</div>
                <div className="text-xs text-muted-foreground">{p.period}</div>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`mt-6 w-full ${p.featured ? "bg-gradient-primary text-primary-foreground" : ""}`} variant={p.featured ? "default" : "outline"}>
                اختر الخطة
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold"><CreditCard className="h-5 w-5 text-brand" /> بيانات الدفع</h3>
            <form
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); toast.success("تم إتمام الدفع بنجاح (تجريبي)"); }}
            >
              <div className="sm:col-span-2">
                <Label>اسم حامل البطاقة</Label>
                <Input required placeholder="الاسم كما هو على البطاقة" className="mt-1" />
              </div>
              <div className="sm:col-span-2">
                <Label>رقم البطاقة</Label>
                <Input required placeholder="0000 0000 0000 0000" className="mt-1" />
              </div>
              <div>
                <Label>تاريخ الانتهاء</Label>
                <Input required placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input required placeholder="123" className="mt-1" />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <Ticket className="h-4 w-4 text-brand" />
                <Input placeholder="كود خصم أو كوبون" />
                <Button type="button" variant="outline">تطبيق</Button>
              </div>
              <Button type="submit" className="sm:col-span-2 bg-gradient-primary text-primary-foreground gap-2">
                <ShieldCheck className="h-4 w-4" /> ادفع الآن بأمان
              </Button>
            </form>

            <div className="mt-8">
              <div className="mb-3 text-sm font-semibold text-muted-foreground">وسائل الدفع المتاحة</div>
              <div className="flex flex-wrap gap-2">
                {methods.map((m) => (
                  <Badge key={m} variant="secondary" className="px-3 py-1 text-xs">{m}</Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <h4 className="text-sm font-bold">ملخص الطلب</h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>اشتراك شهري</span><span>899 ج.م</span></div>
                <div className="flex justify-between text-muted-foreground"><span>خصم</span><span>-100 ج.م</span></div>
                <div className="flex justify-between border-t border-border pt-2 font-black"><span>الإجمالي</span><span className="text-gradient">799 ج.م</span></div>
              </div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <Gift className="h-5 w-5 text-gold" />
              <div className="text-sm">
                <div className="font-bold">اهدِ اشتراك</div>
                <div className="text-xs text-muted-foreground">أرسل بطاقة هدية لصديق.</div>
              </div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <div className="text-sm">
                <div className="font-bold">استرداد آمن</div>
                <div className="text-xs text-muted-foreground">اطلب استرداد المبلغ خلال 14 يوم.</div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
