import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "إعادة تعيين كلمة المرور — M_Academy" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("تم تحديث كلمة المرور بنجاح");
    navigate({ to: "/login" });
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-hero px-4 py-16 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <Card className="relative w-full max-w-md bg-card p-8 text-card-foreground shadow-elegant">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-black">كلمة مرور جديدة</h1>
        </div>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <Label>كلمة المرور الجديدة</Label>
            <Input type="password" required minLength={6} value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1" />
          </div>
          <Button disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
            {loading ? "جاري الحفظ..." : "تحديث كلمة المرور"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
