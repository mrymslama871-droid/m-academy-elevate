import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "تواصل معنا — M_Academy" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="تواصل معنا" title="نسعد بخدمتك في أي وقت" description="فريقنا جاهز للرد على استفساراتك خلال أقل من 24 ساعة." />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-14 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <h2 className="text-xl font-extrabold">أرسل رسالتك</h2>
          <form
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("تم استلام رسالتك، سنعاود التواصل قريباً.");
              (e.target as HTMLFormElement).reset();
            }}
          >
            <div>
              <Label>الاسم</Label>
              <Input required placeholder="اسمك الكامل" className="mt-1" />
            </div>
            <div>
              <Label>البريد الإلكتروني</Label>
              <Input type="email" required placeholder="you@example.com" className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Label>الموضوع</Label>
              <Input required placeholder="موضوع الرسالة" className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Label>الرسالة</Label>
              <Textarea required rows={6} placeholder="اكتب رسالتك هنا..." className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground gap-2">
                <Send className="h-4 w-4" /> إرسال الرسالة
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          {[
            { Icon: Phone, t: "اتصال هاتفي", d: "+20 100 123 4567" },
            { Icon: Mail, t: "البريد الإلكتروني", d: "support@m-academy.com" },
            { Icon: MessageCircle, t: "واتساب", d: "+20 100 987 6543" },
            { Icon: MapPin, t: "العنوان", d: "القاهرة الجديدة — مصر" },
          ].map((c) => (
            <Card key={c.t} className="flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <c.Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{c.t}</div>
                <div className="font-bold">{c.d}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
