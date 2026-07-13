import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "استعادة كلمة المرور — M_Academy" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك.");
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-hero px-4 py-16 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <Card className="relative w-full max-w-md bg-card p-8 text-card-foreground shadow-elegant">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-black">استعادة كلمة المرور</h1>
          <p className="mt-1 text-sm text-muted-foreground">أدخل بريدك وسنرسل لك رابط إعادة التعيين.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label>البريد الإلكتروني</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <Button disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
            {loading ? "جاري الإرسال..." : "إرسال الرابط"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-semibold text-brand hover:underline">العودة لتسجيل الدخول</Link>
        </p>
      </Card>
    </div>
  );
}
