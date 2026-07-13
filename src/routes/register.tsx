import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب — M_Academy" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-hero px-4 py-16 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <Card className="relative w-full max-w-xl bg-card p-8 text-card-foreground shadow-elegant">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-black">أنشئ حسابك الآن</h1>
          <p className="mt-1 text-sm text-muted-foreground">انضم لآلاف الطلاب وابدأ رحلة التفوق.</p>
        </div>
        <form
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("تم إنشاء الحساب (تجريبي)");
          }}
        >
          <div>
            <Label>الاسم الأول</Label>
            <Input required placeholder="محمد" className="mt-1" />
          </div>
          <div>
            <Label>اسم العائلة</Label>
            <Input required placeholder="أحمد" className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Label>البريد الإلكتروني</Label>
            <Input type="email" required placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <Input required placeholder="01xxxxxxxxx" className="mt-1" />
          </div>
          <div>
            <Label>المرحلة الدراسية</Label>
            <Select>
              <SelectTrigger className="mt-1"><SelectValue placeholder="اختر المرحلة" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="prep">إعدادي</SelectItem>
                <SelectItem value="sec1">أولى ثانوي</SelectItem>
                <SelectItem value="sec2">ثانية ثانوي</SelectItem>
                <SelectItem value="sec3">ثالثة ثانوي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>كلمة المرور</Label>
            <Input type="password" required placeholder="••••••••" className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">إنشاء الحساب</Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟ <Link to="/login" className="font-semibold text-brand hover:underline">تسجيل الدخول</Link>
        </p>
      </Card>
    </div>
  );
}
