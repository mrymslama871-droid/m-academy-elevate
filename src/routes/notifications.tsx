import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlarmClock, Award, Bell, BookOpen, CreditCard, Megaphone, Video, CheckCheck, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "الإشعارات — M_Academy" }] }),
  component: NotificationsPage,
});

type Notif = {
  id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  scheduled_for: string;
};

const iconFor = (type: string) => {
  switch (type) {
    case "exam": return AlarmClock;
    case "assignment": return BookOpen;
    case "live": return Video;
    case "payment": return CreditCard;
    case "announcement": return Megaphone;
    case "achievement": return Award;
    default: return Bell;
  }
};

const tagFor = (type: string) => {
  switch (type) {
    case "exam": return "امتحان";
    case "assignment": return "واجب";
    case "live": return "لايف";
    case "payment": return "دفع";
    case "announcement": return "إعلان";
    case "achievement": return "إنجاز";
    default: return "إشعار";
  }
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "الآن";
  if (m < 60) return `منذ ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `منذ ${h} ساعة`;
  const d = Math.floor(h / 24);
  return `منذ ${d} يوم`;
}

function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) { setItems([]); setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("id,type,title,body,link,read_at,scheduled_for")
      .order("scheduled_for", { ascending: false })
      .limit(100);
    if (error) toast.error("تعذّر تحميل الإشعارات");
    setItems((data as Notif[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (authLoading) return;
    void load();
    if (!user) return;
    const ch = supabase
      .channel("notifications-rt")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        () => void load(),
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, authLoading]);

  const markAllRead = async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .is("read_at", null)
      .eq("user_id", user.id);
    if (error) return toast.error("فشل التحديث");
    toast.success("تم تعليم الكل كمقروء");
    void load();
  };

  const markOneRead = async (id: string) => {
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    void load();
  };

  return (
    <>
      <PageHeader eyebrow="مركز الإشعارات" title="تنبيهات الامتحانات والواجبات قبل الموعد" />
      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {user ? "نرسل لك تذكيراً قبل كل امتحان أو واجب بـ 24 ساعة وقبله بساعة." : "سجّل الدخول لعرض إشعاراتك."}
          </p>
          {user && items.some((n) => !n.read_at) && (
            <Button size="sm" variant="outline" onClick={markAllRead} className="gap-2">
              <CheckCheck className="h-4 w-4" /> تعليم الكل كمقروء
            </Button>
          )}
        </div>

        <Card className="p-0">
          {loading || authLoading ? (
            <div className="flex items-center justify-center gap-2 p-10 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> جاري التحميل...
            </div>
          ) : !user ? (
            <div className="p-10 text-center">
              <Link to="/login"><Button className="bg-gradient-primary text-primary-foreground">تسجيل الدخول</Button></Link>
            </div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              لا توجد إشعارات بعد. اشترك في مادة لتصلك تذكيرات الامتحانات والواجبات تلقائياً.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((n) => {
                const Icon = iconFor(n.type);
                const unread = !n.read_at;
                const inner = (
                  <div className="flex items-start gap-4 p-5 hover:bg-accent/40 transition-colors">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{n.title}</span>
                        {unread && <span className="h-2 w-2 rounded-full bg-brand" />}
                      </div>
                      {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary">{tagFor(n.type)}</Badge>
                        <span>{timeAgo(n.scheduled_for)}</span>
                      </div>
                    </div>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </div>
                );
                return (
                  <div key={n.id} onClick={() => unread && markOneRead(n.id)}>
                    {n.link ? <a href={n.link}>{inner}</a> : inner}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </section>
    </>
  );
}
