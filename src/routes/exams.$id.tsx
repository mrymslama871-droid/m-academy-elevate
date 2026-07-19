import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exams/$id")({
  head: () => ({ meta: [{ title: "امتحان — M_Academy" }] }),
  component: ExamRunnerPage,
});

type Question = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
};

type ExamInfo = {
  id: string;
  title: string;
  duration_minutes: number;
};

function ExamRunnerPage() {
  const { id } = Route.useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [exam, setExam] = useState<ExamInfo | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; total: number; auto: boolean } | null>(null);
  const startedAtRef = useRef<number>(0);

  useEffect(() => {
    (async () => {
      const { data: e } = await supabase
        .from("exams")
        .select("id,title,duration_minutes")
        .eq("id", id)
        .maybeSingle();
      const { data: qs } = await supabase
        .from("exam_questions")
        .select("id,question,options,correct_index,explanation")
        .eq("exam_id", id)
        .order("order_index", { ascending: true });
      setExam(e ?? null);
      setQuestions((qs as unknown as Question[]) ?? []);
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = useCallback(
    async (auto = false) => {
      if (submitted || submitting) return;
      setSubmitting(true);
      let score = 0;
      questions.forEach((q) => {
        if (answers[q.id] === q.correct_index) score += 1;
      });
      const total = questions.length;
      const durationSec = Math.max(0, Math.round((Date.now() - startedAtRef.current) / 1000));

      if (user) {
        await supabase.from("exam_attempts").insert({
          user_id: user.id,
          exam_id: id,
          score,
          total,
          answers: questions.map((q) => ({
            question_id: q.id,
            selected: answers[q.id] ?? null,
            correct: q.correct_index,
          })),
          duration_seconds: durationSec,
          auto_submitted: auto,
        });
      }
      setResult({ score, total, auto });
      setSubmitted(true);
      setSubmitting(false);
      if (auto) toast.warning("انتهى الوقت — تم تسليم الامتحان تلقائياً");
    },
    [answers, id, questions, submitted, submitting, user],
  );

  // Countdown timer
  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, submitted, timeLeft, handleSubmit]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const q = questions[current];

  if (loading || authLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-black">الامتحان غير موجود</h1>
        <Link to="/exams"><Button className="mt-6">العودة للامتحانات</Button></Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-black">تحتاج تسجيل الدخول</h1>
        <p className="mt-2 text-muted-foreground">للمشاركة في الامتحان وحفظ نتيجتك.</p>
        <Link to="/login"><Button className="mt-6 bg-gradient-primary text-primary-foreground">تسجيل الدخول</Button></Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-black">لا توجد أسئلة لهذا الامتحان بعد</h1>
        <Link to="/exams"><Button className="mt-6">العودة</Button></Link>
      </div>
    );
  }

  // Start screen
  if (!started) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Card className="p-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Clock className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-black">{exam.title}</h1>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>عدد الأسئلة: <b className="text-foreground">{questions.length}</b></span>
            <span>المدة: <b className="text-foreground">{exam.duration_minutes} دقيقة</b></span>
          </div>
          <div className="mt-6 rounded-xl bg-accent/50 p-4 text-start text-sm leading-7">
            <div className="flex items-center gap-2 font-bold"><AlertCircle className="h-4 w-4" /> تعليمات</div>
            <ul className="mt-2 list-inside list-disc text-muted-foreground">
              <li>سيبدأ العدّاد التنازلي فور الضغط على "ابدأ".</li>
              <li>عند انتهاء الوقت يُسلَّم الامتحان تلقائياً.</li>
              <li>تظهر النتيجة والإجابات الصحيحة فور الإنهاء.</li>
            </ul>
          </div>
          <Button
            size="lg"
            className="mt-6 bg-gradient-primary text-primary-foreground"
            onClick={() => {
              setTimeLeft(exam.duration_minutes * 60);
              startedAtRef.current = Date.now();
              setStarted(true);
            }}
          >
            ابدأ الامتحان
          </Button>
        </Card>
      </div>
    );
  }

  // Results screen
  if (submitted && result) {
    const pct = result.total ? Math.round((result.score / result.total) * 100) : 0;
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Card className="p-8 text-center">
          <div
            className={cn(
              "mx-auto grid h-20 w-20 place-items-center rounded-full text-white shadow-glow",
              pct >= 50 ? "bg-gradient-primary" : "bg-destructive",
            )}
          >
            {pct >= 50 ? <CheckCircle2 className="h-9 w-9" /> : <XCircle className="h-9 w-9" />}
          </div>
          <h2 className="mt-4 text-2xl font-black">
            {pct >= 85 ? "أداء ممتاز!" : pct >= 50 ? "أحسنت!" : "تحتاج مراجعة"}
          </h2>
          <div className="mt-2 text-5xl font-black text-gradient">
            {result.score}<span className="text-2xl text-muted-foreground">/{result.total}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{pct}%</div>
          {result.auto && (
            <Badge variant="destructive" className="mt-3">تم التسليم تلقائياً بعد انتهاء الوقت</Badge>
          )}
          <Progress value={pct} className="mt-5 h-3" />
        </Card>

        <h3 className="mt-10 mb-4 text-xl font-extrabold">مراجعة الإجابات</h3>
        <div className="space-y-4">
          {questions.map((qq, i) => {
            const picked = answers[qq.id];
            const isCorrect = picked === qq.correct_index;
            return (
              <Card key={qq.id} className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white",
                      isCorrect ? "bg-green-600" : "bg-destructive",
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{qq.question}</div>
                    <div className="mt-3 space-y-2">
                      {qq.options.map((opt, oi) => {
                        const isRight = oi === qq.correct_index;
                        const isPicked = oi === picked;
                        return (
                          <div
                            key={oi}
                            className={cn(
                              "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                              isRight && "border-green-500 bg-green-500/10",
                              !isRight && isPicked && "border-destructive bg-destructive/10",
                            )}
                          >
                            <span>{opt}</span>
                            {isRight && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {!isRight && isPicked && <XCircle className="h-4 w-4 text-destructive" />}
                          </div>
                        );
                      })}
                    </div>
                    {qq.explanation && (
                      <div className="mt-3 rounded-lg bg-accent/50 p-3 text-xs leading-6 text-muted-foreground">
                        <b className="text-foreground">شرح: </b>{qq.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => navigate({ to: "/exams" })}>العودة للامتحانات</Button>
          <Button
            className="bg-gradient-primary text-primary-foreground"
            onClick={() => {
              setAnswers({});
              setCurrent(0);
              setSubmitted(false);
              setResult(null);
              setStarted(false);
            }}
          >
            إعادة الامتحان
          </Button>
        </div>
      </div>
    );
  }

  // Exam runner
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 60;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Sticky timer bar */}
      <div className="sticky top-4 z-10 mb-6 flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-elegant backdrop-blur">
        <div className="text-sm">
          <div className="font-bold">{exam.title}</div>
          <div className="text-xs text-muted-foreground">
            سؤال {current + 1} من {questions.length} • تمت الإجابة: {answeredCount}
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-black tabular-nums",
            lowTime ? "bg-destructive/15 text-destructive animate-pulse" : "bg-primary/10 text-primary",
          )}
        >
          <Clock className="h-5 w-5" />
          {mm}:{ss}
        </div>
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="mb-6 h-1.5" />

      {q && (
        <Card className="p-6 sm:p-8">
          <div className="text-xs font-semibold text-muted-foreground">السؤال {current + 1}</div>
          <h2 className="mt-2 text-lg font-extrabold leading-8 sm:text-xl">{q.question}</h2>

          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-4 text-start text-sm transition-all hover:border-primary/50",
                    selected
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border bg-card",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="gap-2"
        >
          <ArrowRight className="h-4 w-4" /> السابق
        </Button>

        {current < questions.length - 1 ? (
          <Button
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            className="gap-2 bg-gradient-primary text-primary-foreground"
          >
            التالي <ArrowLeft className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            className="gap-2 bg-gradient-primary text-primary-foreground"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            إنهاء الامتحان
          </Button>
        )}
      </div>

      {/* Question navigator */}
      <div className="mt-8 rounded-2xl border border-border/70 bg-card p-4">
        <div className="mb-3 text-xs font-semibold text-muted-foreground">تنقل بين الأسئلة</div>
        <div className="flex flex-wrap gap-2">
          {questions.map((qq, i) => {
            const done = answers[qq.id] !== undefined;
            return (
              <button
                key={qq.id}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-lg border text-xs font-bold transition-all",
                  i === current && "ring-2 ring-primary",
                  done
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card text-muted-foreground hover:bg-accent",
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
