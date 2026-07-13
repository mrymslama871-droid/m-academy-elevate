import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { dashboardPathFor, type AppRole } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول — M_Academy" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const redirectByRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .limit(1)
      .maybeSingle();
    const role = (data?.role as AppRole | undefined) ?? "student";
    navigate({ to: dashboardPathFor(role) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message === "Email not confirmed"
        ? "يرجى تأكيد بريدك الإلكتروني أولاً"
        : "بيانات الدخول غير صحيحة");
      return;
    }
    toast.success("تم تسجيل الدخول بنجاح");
    if (data.user) await redirectByRole(data.user.id);
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("تعذر تسجيل الدخول عبر جوجل");
      return;
    }
    if (result.redirected) return;
    const { data } = await supabase.auth.getUser();
    if (data.user) await redirectByRole(data.user.id);
  };

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
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>البريد الإلكتروني</Label>
            <div className="relative mt-1">
              <Mail className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pe-9" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>كلمة المرور</Label>
              <Link to="/forgot-password" className="text-xs text-brand hover:underline">نسيت كلمة المرور؟</Link>
            </div>
            <div className="relative mt-1">
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <Input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pe-9" />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>
        <div className="my-6 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> أو <div className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          تسجيل الدخول بحساب Google
        </Button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟ <Link to="/register" className="font-semibold text-brand hover:underline">إنشاء حساب</Link>
        </p>
      </Card>
    </div>
  );
}
