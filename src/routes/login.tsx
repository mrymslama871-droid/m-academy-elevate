import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — M_Academy" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-hero px-4 py-16 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <Card className="relative w-full max-w-md bg-card p-8 text-card-foreground shadow-elegant">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-black">أهلاً بعودتك</h1>
          <p className="mt-1 text-sm text-muted-foreground">سجل الدخول لمتابعة رحلتك التعليمية.</p>
        </div>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("تم تسجيل الدخول (تجريبي)");
          }}
        >
          <div>
            <Label>البريد الإلكتروني</Label>
            <div className="relative mt-1">
              <Mail className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" required placeholder="you@example.com" className="pe-9" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>كلمة المرور</Label>
              <a className="text-xs text-brand hover:underline" href="#">نسيت كلمة المرور؟</a>
            </div>
            <div className="relative mt-1">
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <Input type={show ? "text" : "password"} required placeholder="••••••••" className="pe-9" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">تذكرني</Label>
          </div>
          <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground">تسجيل الدخول</Button>
        </form>
        <div className="my-6 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> أو <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">Google</Button>
          <Button variant="outline">Apple</Button>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟ <Link to="/register" className="font-semibold text-brand hover:underline">إنشاء حساب</Link>
        </p>
      </Card>
    </div>
  );
}
