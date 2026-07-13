import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب — M_Academy" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    stage: "",
    password: "",
    role: "student" as "student" | "teacher",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          stage: form.stage,
          role: form.role,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم إنشاء الحساب! تحقق من بريدك لتأكيد الحساب.");
    navigate({ to: "/login" });
  };

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
        <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <div className="sm:col-span-2">
            <Label className="mb-2 block">نوع الحساب</Label>
            <RadioGroup
              value={form.role}
              onValueChange={(v) => update("role", v)}
              className="grid grid-cols-2 gap-3"
            >
              <label className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${form.role === "student" ? "border-brand bg-accent/50" : "border-border"}`}>
                <RadioGroupItem value="student" /> طالب
              </label>
              <label className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${form.role === "teacher" ? "border-brand bg-accent/50" : "border-border"}`}>
                <RadioGroupItem value="teacher" /> مدرس
              </label>
            </RadioGroup>
          </div>
          <div>
            <Label>الاسم الأول</Label>
            <Input required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="محمد" className="mt-1" />
          </div>
          <div>
            <Label>اسم العائلة</Label>
            <Input required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="أحمد" className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Label>البريد الإلكتروني</Label>
            <Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label>رقم الهاتف</Label>
            <Input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="01xxxxxxxxx" className="mt-1" />
          </div>
          <div>
            <Label>{form.role === "teacher" ? "التخصص" : "المرحلة الدراسية"}</Label>
            {form.role === "teacher" ? (
              <Input value={form.stage} onChange={(e) => update("stage", e.target.value)} placeholder="مثال: فيزياء" className="mt-1" />
            ) : (
              <Select value={form.stage} onValueChange={(v) => update("stage", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="اختر المرحلة" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="prep">إعدادي</SelectItem>
                  <SelectItem value="sec1">أولى ثانوي</SelectItem>
                  <SelectItem value="sec2">ثانية ثانوي</SelectItem>
                  <SelectItem value="sec3">ثالثة ثانوي</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label>كلمة المرور</Label>
            <Input type="password" required minLength={6} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
              {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟ <Link to="/login" className="font-semibold text-brand hover:underline">تسجيل الدخول</Link>
        </p>
      </Card>
    </div>
  );
}
