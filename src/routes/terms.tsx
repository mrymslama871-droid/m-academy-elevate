import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "الشروط والأحكام — M_Academy" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="القانوني" title="الشروط والأحكام" />
      <section className="mx-auto max-w-3xl px-6 py-14">
        <article className="space-y-6 text-sm leading-8 text-muted-foreground">
          <p>باستخدامك لمنصة M_Academy فإنك توافق على هذه الشروط والأحكام. يرجى قراءتها بعناية.</p>
          <h3 className="text-lg font-extrabold text-foreground">استخدام المنصة</h3>
          <p>يُمنع مشاركة حسابك أو تسجيل المحتوى أو إعادة نشره بأي وسيلة. المحتوى مخصص للاستخدام الشخصي فقط.</p>
          <h3 className="text-lg font-extrabold text-foreground">المدفوعات</h3>
          <p>جميع المدفوعات آمنة ومشفرة. يمكن استرداد المبلغ خلال 14 يوماً وفق سياسة الاسترداد.</p>
          <h3 className="text-lg font-extrabold text-foreground">إنهاء الحساب</h3>
          <p>نحتفظ بالحق في إنهاء أي حساب يخالف هذه الشروط دون إشعار مسبق.</p>
        </article>
      </section>
    </>
  );
}
