import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Rocket, Target } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "من نحن — M_Academy" }] }),
  component: AboutPage,
});

const values = [
  { icon: Target, t: "رؤيتنا", d: "أن نكون المنصة التعليمية الأولى في الوطن العربي لصناعة جيل متفوق." },
  { icon: Rocket, t: "رسالتنا", d: "تقديم تجربة تعليمية استثنائية تجمع بين المحتوى المتميز والتقنية الحديثة." },
  { icon: HeartHandshake, t: "قيمنا", d: "الجودة، الشفافية، التحفيز، والاهتمام بكل طالب على حدة." },
  { icon: Award, t: "إنجازاتنا", d: "أكثر من 25 ألف طالب تفوقوا معنا وحصلوا على أعلى الدرجات." },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title="نحن شركاء نجاحك"
        description="M_Academy منصة تعليمية عربية أُسست لتقديم تعليم عالي الجودة يمكّن الطالب من تحقيق أهدافه بأسلوب حديث وفعّال."
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.t} className="border-border/70 bg-gradient-card p-6 shadow-card">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold">{v.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.d}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-14 overflow-hidden border-border/70 p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-hero p-10 text-primary-foreground">
              <h3 className="text-2xl font-black">قصتنا</h3>
              <p className="mt-3 leading-8 text-primary-foreground/85">
                بدأنا برؤية بسيطة: تعليم عربي يليق بطموحات طلابنا. اليوم M_Academy تضم
                نخبة من أفضل المدرسين، آلاف الطلاب، ومحتوى تعليمي يتم تحديثه باستمرار
                ليتناسب مع المناهج الحديثة وأسئلة الوزارة.
              </p>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-black">لماذا M_Academy؟</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <li>• محتوى تعليمي احترافي وشامل لجميع المراحل.</li>
                <li>• منصة مصممة لتناسب استخدام الطالب بشكل يومي.</li>
                <li>• دعم فني ومتابعة على مدار الأسبوع.</li>
                <li>• تحفيز مستمر عبر نظام النقاط والشارات.</li>
                <li>• أسعار مناسبة وخطط اشتراك مرنة.</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
