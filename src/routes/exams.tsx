import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlarmClock, CheckCircle2, FileText, Play, Timer, Trophy } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/exams")({
  head: () => ({ meta: [{ title: "الامتحانات — M_Academy" }] }),
  component: ExamsPage,
});

const kinds = [
  { icon: Timer, title: "امتحان يومي", text: "اختبار قصير كل يوم لتثبيت المعلومات." },
  { icon: FileText, title: "امتحان على الدرس", text: "أسئلة على كل درس بعد مشاهدته." },
  { icon: FileText, title: "امتحان على الباب", text: "امتحان شامل بعد إنهاء كل باب." },
  { icon: Trophy, title: "الامتحان النهائي", text: "امتحان تراكمي شامل للمنهج." },
];

type ExamRow = {
  id: string;
  title: string;
  subject_id: string | null;
  duration_minutes: number;
  total_questions: number;
  scheduled_at: string | null;
};

type AttemptRow = {
  id: string;
  exam_id: string;
  score: number;
  total: number;
  submitted_at: string;
  exams: { title: string } | null;
};

function ExamsPage() {
  const { user } = useAuth();
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);

  useEffect(() => {
    supabase
      .from("exams")
      .select("id,title,subject_id,duration_minutes,total_questions,scheduled_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setExams(data ?? []));
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("exam_attempts")
      .select("id,exam_id,score,total,submitted_at,exams(title)")
      .eq("user_id", user.id)
      .order("submitted_at", { ascending: false })
      .limit(10)
      .then(({ data }) => setAttempts((data as unknown as AttemptRow[]) ?? []));
  }, [user]);

  return (
    <>
      <PageHeader
        eyebrow="نظام الامتحانات"
        title="امتحانات تفاعلية وتصحيح فوري"
        description="مؤقت زمني تنازلي، تصحيح تلقائي فور الإنهاء، وعرض الإجابات الصحيحة مع شرح لكل سؤال."
      />

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kinds.map((k) => (
            <Card key={k.title} className="border-border/70 bg-gradient-card p-5 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <k.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-extrabold">{k.title}</div>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">{k.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-extrabold">الامتحانات المتاحة</h2>
            <div className="space-y-3">
              {exams.length === 0 && (
                <Card className="p-5 text-sm text-muted-foreground">لا توجد امتحانات حالياً.</Card>
              )}
              {exams.map((e) => (
                <Card key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <div className="font-bold">{e.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {e.scheduled_at && (
                        <span className="flex items-center gap-1">
                          <AlarmClock className="h-3.5 w-3.5" />
                          {new Date(e.scheduled_at).toLocaleString("ar-EG")}
                        </span>
                      )}
                      <span>{e.duration_minutes} دقيقة</span>
                      <span>{e.total_questions} سؤال</span>
                    </div>
                  </div>
                  <Link to="/exams/$id" params={{ id: e.id }}>
                    <Button className="bg-gradient-primary text-primary-foreground gap-2">
                      <Play className="h-4 w-4" /> ابدأ الامتحان
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-extrabold">نتائجي السابقة</h2>
            <div className="space-y-3">
              {!user && (
                <Card className="p-5 text-sm text-muted-foreground">
                  <Link to="/login" className="text-primary underline">سجّل دخولك</Link> لعرض نتائجك.
                </Card>
              )}
              {user && attempts.length === 0 && (
                <Card className="p-5 text-sm text-muted-foreground">لم تقم بأي امتحان بعد.</Card>
              )}
              {attempts.map((a) => {
                const pct = a.total ? Math.round((a.score / a.total) * 100) : 0;
                const status = pct >= 85 ? "ممتاز" : pct >= 70 ? "جيد جداً" : pct >= 50 ? "جيد" : "يحتاج تحسين";
                return (
                  <Card key={a.id} className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-bold">{a.exams?.title ?? "امتحان"}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          التقييم: {status} • {new Date(a.submitted_at).toLocaleDateString("ar-EG")}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-gradient">
                          {a.score}
                          <span className="text-sm text-muted-foreground">/{a.total}</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={pct} className="mt-3 h-2" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link to="/exams/$id" params={{ id: a.exam_id }}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <CheckCircle2 className="h-4 w-4" /> إعادة الامتحان
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
