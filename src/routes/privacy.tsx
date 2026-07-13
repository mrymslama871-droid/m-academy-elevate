import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "سياسة الخصوصية — M_Academy" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="القانوني" title="سياسة الخصوصية" description="نحن نلتزم بحماية بياناتك الشخصية." />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <article className="space-y-6 text-sm leading-8 text-muted-foreground">
          <p>في M_Academy نحرص على حماية خصوصية مستخدمينا وبياناتهم الشخصية. توضح هذه السياسة أنواع البيانات التي نجمعها وطرق استخدامها وحمايتها.</p>
          <h3 className="text-lg font-extrabold text-foreground">البيانات التي نجمعها</h3>
          <p>الاسم، البريد الإلكتروني، رقم الهاتف، المرحلة الدراسية، ومعلومات الدفع (بشكل آمن ومشفر).</p>
          <h3 className="text-lg font-extrabold text-foreground">كيف نستخدم البيانات</h3>
          <p>لتقديم الخدمات، إدارة الحساب، إرسال الإشعارات التعليمية، وتحسين تجربة المستخدم.</p>
          <h3 className="text-lg font-extrabold text-foreground">حماية البيانات</h3>
          <p>نستخدم أعلى معايير التشفير وأنظمة الحماية المتقدمة لضمان أمان بياناتك.</p>
        </article>
      </section>
    </>
  );
}
