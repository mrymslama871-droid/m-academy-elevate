
-- Questions
CREATE TABLE public.exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_index int NOT NULL,
  explanation text,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX exam_questions_exam_idx ON public.exam_questions(exam_id, order_index);

GRANT SELECT ON public.exam_questions TO authenticated;
GRANT ALL ON public.exam_questions TO service_role;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions viewable by authenticated" ON public.exam_questions
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage questions" ON public.exam_questions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Attempts
CREATE TABLE public.exam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  score int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  duration_seconds int NOT NULL DEFAULT 0,
  auto_submitted boolean NOT NULL DEFAULT false,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX exam_attempts_user_idx ON public.exam_attempts(user_id, submitted_at DESC);

GRANT SELECT, INSERT ON public.exam_attempts TO authenticated;
GRANT ALL ON public.exam_attempts TO service_role;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own attempts" ON public.exam_attempts
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Users insert own attempts" ON public.exam_attempts
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Seed 8 sample questions per existing exam
DO $$
DECLARE
  r record;
  i int;
  q_templates jsonb := '[
    {"q":"ما ناتج 2 + 2 ؟","o":["3","4","5","6"],"c":1,"e":"عملية جمع بسيطة."},
    {"q":"ما هي عاصمة مصر؟","o":["الإسكندرية","القاهرة","الجيزة","أسوان"],"c":1,"e":"القاهرة هي العاصمة."},
    {"q":"كم عدد أيام الأسبوع؟","o":["5","6","7","8"],"c":2,"e":"سبعة أيام."},
    {"q":"ما هو الرمز الكيميائي للماء؟","o":["O2","H2O","CO2","NaCl"],"c":1,"e":"جزيء الماء H2O."},
    {"q":"من مؤلف رواية الأيام؟","o":["نجيب محفوظ","طه حسين","توفيق الحكيم","المنفلوطي"],"c":1,"e":"طه حسين."},
    {"q":"ما هو أكبر كوكب في المجموعة الشمسية؟","o":["الأرض","المريخ","المشتري","زحل"],"c":2,"e":"المشتري."},
    {"q":"ما هي أطول قارة في العالم؟","o":["أفريقيا","آسيا","أوروبا","أستراليا"],"c":1,"e":"آسيا هي الأكبر."},
    {"q":"ناتج 9 × 8 = ؟","o":["63","71","72","81"],"c":2,"e":"72."}
  ]'::jsonb;
  item jsonb;
BEGIN
  FOR r IN SELECT id FROM public.exams LOOP
    i := 0;
    FOR item IN SELECT * FROM jsonb_array_elements(q_templates) LOOP
      INSERT INTO public.exam_questions (exam_id, question, options, correct_index, explanation, order_index)
      VALUES (r.id, item->>'q', item->'o', (item->>'c')::int, item->>'e', i);
      i := i + 1;
    END LOOP;
  END LOOP;
END $$;
