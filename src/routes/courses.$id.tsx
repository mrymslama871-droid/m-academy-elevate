import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Lock,
  Maximize2,
  MessageCircle,
  Paperclip,
  Pause,
  Play,
  Settings2,
  Star,
  Users,
  Volume2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { enrollInSubject } from "@/lib/enrollments";


export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.id === params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.course.title} — M_Academy` : "مادة دراسية" }],
  }),
  component: CourseDetail,
});

const chapters: { title: string; lessons: { t: string; d: string; done?: boolean; quiz?: boolean; locked?: boolean }[] }[] = [
  { title: "الباب الأول: المقدمات والأساسيات", lessons: [
    { t: "درس 1: تعريفات وأمثلة", d: "18:24", done: true },
    { t: "درس 2: القواعد الأساسية", d: "22:10", done: true },
    { t: "درس 3: أمثلة تطبيقية", d: "26:00", done: false },
    { t: "امتحان الباب الأول", d: "40:00", quiz: true, done: false },
  ]},
  { title: "الباب الثاني: التطبيقات المتقدمة", lessons: [
    { t: "درس 1: مسائل متقدمة", d: "31:45", done: false },
    { t: "درس 2: حل نماذج الوزارة", d: "28:12", done: false, locked: true },
    { t: "درس 3: مراجعة عامة", d: "45:00", done: false, locked: true },
  ]},
  { title: "الباب الثالث: المراجعة النهائية", lessons: [
    { t: "درس 1: ملخص شامل", d: "50:00", done: false, locked: true },
    { t: "الامتحان النهائي", d: "90:00", quiz: true, done: false, locked: true },
  ]},
];

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [playing, setPlaying] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link to="/courses" className="hover:text-foreground">المواد</Link>
        <span>/</span>
        <span className="text-foreground">{course.subject}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Video + info */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-elegant">
            <div className={`relative aspect-video bg-gradient-to-br ${course.color}`}>
              <div className="absolute inset-0 bg-black/40" />
              <button
                onClick={() => setPlaying((p) => !p)}
                className="absolute inset-0 grid place-items-center"
                aria-label="play"
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-primary shadow-glow transition-transform hover:scale-110">
                  {playing ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current" />}
                </div>
              </button>
              {/* Controls */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <button onClick={() => setPlaying((p) => !p)}>
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <Volume2 className="h-5 w-5" />
                <div className="h-1 flex-1 rounded-full bg-white/25">
                  <div className="h-full w-1/3 rounded-full bg-gold" />
                </div>
                <span className="text-xs">08:24 / 22:10</span>
                <select className="rounded-md bg-white/10 px-2 py-1 text-xs" defaultValue="1">
                  <option value="0.5">0.5x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
                <select className="rounded-md bg-white/10 px-2 py-1 text-xs" defaultValue="1080">
                  <option>360p</option>
                  <option>720p</option>
                  <option value="1080">1080p HD</option>
                </select>
                <Settings2 className="h-5 w-5" />
                <Maximize2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary">{course.subject}</Badge>
              <Badge variant="outline">{course.grade}</Badge>
              {course.tag && <Badge className="bg-gold text-primary hover:bg-gold">{course.tag}</Badge>}
            </div>
            <h1 className="mt-3 text-2xl font-black sm:text-3xl">{course.title}</h1>
            <p className="mt-2 text-muted-foreground">مع {course.teacher}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" /> {course.rating}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.students.toLocaleString("ar-EG")} طالب</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.lessons} درس</span>
              <span>{course.hours} ساعة محتوى</span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="w-full flex-wrap justify-start gap-1 bg-muted p-1">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="notes">ملاحظاتي</TabsTrigger>
              <TabsTrigger value="attachments">المرفقات</TabsTrigger>
              <TabsTrigger value="homework">الواجبات</TabsTrigger>
              <TabsTrigger value="discussion">النقاش</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">وصف المادة</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  مادة شاملة تغطي المنهج كاملاً بأسلوب مبسط ومحدث بأحدث نماذج الوزارة،
                  مع تمارين تفاعلية وامتحانات دورية وتصحيح فوري. مناسبة لكل المستويات
                  وتساعدك على الوصول للدرجة النهائية.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  {[
                    { l: "دروس", v: `${course.lessons}` },
                    { l: "امتحانات", v: "18" },
                    { l: "واجبات", v: "24" },
                    { l: "مرفقات PDF", v: "42" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl border border-border bg-muted/30 p-3 text-center">
                      <div className="text-xl font-black text-gradient">{s.v}</div>
                      <div className="text-xs text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">أضف ملاحظة عند الدقيقة الحالية</h3>
                <Textarea placeholder="اكتب ملاحظتك هنا..." className="mt-3 min-h-[100px]" />
                <div className="mt-3 flex justify-end">
                  <Button className="bg-gradient-primary text-primary-foreground">حفظ الملاحظة</Button>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { t: "12:30", n: "قاعدة مهمة عن التفاضل" },
                    { t: "18:04", n: "مراجعة أمثلة الكتاب" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-border p-3">
                      <div>
                        <div className="text-xs text-muted-foreground">الدقيقة {n.t}</div>
                        <div className="font-semibold">{n.n}</div>
                      </div>
                      <Button variant="outline" size="sm">فتح</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="attachments" className="mt-6 space-y-3">
              {["ملزمة الباب الأول.pdf", "أسئلة إضافية.pdf", "ملخص القوانين.pdf"].map((f, i) => (
                <Card key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{f}</div>
                      <div className="text-xs text-muted-foreground">PDF • 2.4 MB</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2"><Download className="h-4 w-4" /> تحميل</Button>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="homework" className="mt-6 space-y-3">
              {[1,2,3].map((i) => (
                <Card key={i} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Paperclip className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">واجب رقم {i} — تمارين على الباب</div>
                      <div className="text-xs text-muted-foreground">آخر موعد: 25 مايو 2026</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground">ابدأ الحل</Button>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="discussion" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-extrabold">نقاش الطلاب</h3>
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب سؤالك أو تعليقك..." className="mt-3 min-h-[100px]" />
                <div className="mt-3 flex justify-end">
                  <Button className="bg-gradient-primary text-primary-foreground gap-2">
                    <MessageCircle className="h-4 w-4" /> نشر
                  </Button>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { u: "محمود ع.", m: "شكراً على الشرح، ممكن مثال إضافي؟", a: 3 },
                    { u: "ندى س.", m: "المثال 4 صعب شوية، محتاجة توضيح.", a: 1 },
                  ].map((c, i) => (
                    <div key={i} className="rounded-xl border border-border bg-muted/30 p-4">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground font-bold">
                          {c.u[0]}
                        </div>
                        <div>
                          <div className="font-semibold">{c.u}</div>
                          <div className="text-xs text-muted-foreground">قبل ساعتين</div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{c.m}</p>
                      <div className="mt-2 text-xs text-muted-foreground">{c.a} ردود</div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar: chapters */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-extrabold">محتوى المادة</h3>
              <Badge variant="secondary">{course.lessons} درس</Badge>
            </div>
            <Progress value={38} className="h-2" />
            <div className="mt-2 text-xs text-muted-foreground">أكملت 38% من المادة</div>

            <div className="mt-4 space-y-3">
              {chapters.map((ch, i) => (
                <div key={i} className="rounded-xl border border-border">
                  <div className="border-b border-border bg-muted/30 px-4 py-3 text-sm font-bold">{ch.title}</div>
                  <ul className="divide-y divide-border">
                    {ch.lessons.map((l, j) => (
                      <li key={j} className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
                        <div className="flex items-center gap-2 truncate">
                          {l.locked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : l.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : l.quiz ? (
                            <FileText className="h-4 w-4 text-brand" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                          <span className={`truncate ${l.locked ? "text-muted-foreground" : ""}`}>{l.t}</span>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">{l.d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-gradient-hero p-4 text-primary-foreground">
              <div className="text-2xl font-black">{course.price} ج.م</div>
              {course.oldPrice && <div className="text-sm line-through opacity-80">{course.oldPrice} ج.م</div>}
              <Link to="/payment">
                <Button className="mt-3 w-full bg-white text-primary hover:bg-white/90">اشترك الآن</Button>
              </Link>
              <button className="mt-2 w-full rounded-md border border-white/20 py-2 text-sm hover:bg-white/10">
                إضافة للمفضلة
              </button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
