
-- Subjects (courses catalog)
CREATE TABLE public.subjects (
  id text PRIMARY KEY,
  title text NOT NULL,
  subject text NOT NULL,
  grade text NOT NULL,
  teacher text NOT NULL,
  description text,
  rating numeric(3,2) DEFAULT 4.8,
  students_count integer DEFAULT 0,
  lessons_count integer DEFAULT 0,
  hours integer DEFAULT 0,
  price integer NOT NULL DEFAULT 0,
  old_price integer,
  color text,
  tag text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subjects TO anon, authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subjects are viewable by everyone" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Admins manage subjects" ON public.subjects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Lessons
CREATE TABLE public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id text NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  chapter text NOT NULL,
  title text NOT NULL,
  duration text,
  video_url text,
  position integer NOT NULL DEFAULT 0,
  is_free boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lessons TO anon, authenticated;
GRANT ALL ON public.lessons TO service_role;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons viewable by everyone" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Admins manage lessons" ON public.lessons FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Exams
CREATE TABLE public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id text REFERENCES public.subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  duration_minutes integer NOT NULL DEFAULT 30,
  total_questions integer NOT NULL DEFAULT 10,
  scheduled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.exams TO anon, authenticated;
GRANT ALL ON public.exams TO service_role;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exams viewable by everyone" ON public.exams FOR SELECT USING (true);
CREATE POLICY "Admins manage exams" ON public.exams FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enrollments
CREATE TABLE public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id text NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  progress integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.enrollments TO authenticated;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own enrollments" ON public.enrollments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own enrollments" ON public.enrollments FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own enrollments" ON public.enrollments FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all enrollments" ON public.enrollments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_enrollments_updated_at BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER set_subjects_updated_at BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed subjects
INSERT INTO public.subjects (id, title, subject, grade, teacher, rating, students_count, lessons_count, hours, price, old_price, color, tag) VALUES
('math-3s','الرياضيات — الصف الثالث الثانوي','رياضيات','ثانوية عامة','أ. أحمد السيد',4.9,12480,84,62,599,899,'from-indigo-500 to-purple-600','الأكثر مبيعاً'),
('phys-3s','الفيزياء — الصف الثالث الثانوي','فيزياء','ثانوية عامة','د. محمد فهمي',4.8,9820,76,58,549,799,'from-fuchsia-500 to-pink-600',NULL),
('chem-3s','الكيمياء — الصف الثالث الثانوي','كيمياء','ثانوية عامة','أ. مصطفى الشرقاوي',4.7,8140,68,51,499,NULL,'from-emerald-500 to-teal-600',NULL),
('bio-3s','الأحياء — الصف الثالث الثانوي','أحياء','ثانوية عامة','د. سارة عبد الله',4.9,7620,72,55,499,NULL,'from-lime-500 to-green-600','جديد'),
('eng-3s','اللغة الإنجليزية — الثانوية العامة','إنجليزي','ثانوية عامة','أ. ياسمين حسن',4.8,15310,90,70,449,649,'from-sky-500 to-blue-600',NULL),
('ar-3s','اللغة العربية — الثانوية العامة','عربي','ثانوية عامة','أ. عبد الرحمن نور',4.9,11290,80,60,449,NULL,'from-amber-500 to-orange-600',NULL),
('hist-2s','التاريخ — الصف الثاني الثانوي','تاريخ','ثانوية عامة','أ. طارق منير',4.6,4210,54,40,349,NULL,'from-rose-500 to-red-600',NULL),
('geo-2s','الجغرافيا — الصف الثاني الثانوي','جغرافيا','ثانوية عامة','أ. هبة إبراهيم',4.7,3980,52,38,349,NULL,'from-cyan-500 to-teal-600',NULL),
('phil-2s','الفلسفة والمنطق','فلسفة','ثانوية عامة','د. كريم عاطف',4.5,2810,44,32,299,NULL,'from-violet-500 to-purple-600',NULL);

-- Seed a few lessons per subject
INSERT INTO public.lessons (subject_id, chapter, title, duration, position, is_free) VALUES
('math-3s','الباب الأول','مقدمة في التفاضل','18:24',1,true),
('math-3s','الباب الأول','قواعد الاشتقاق','22:10',2,false),
('math-3s','الباب الثاني','التكامل المحدد','26:00',3,false),
('phys-3s','الباب الأول','الحركة الدورانية','20:00',1,true),
('phys-3s','الباب الثاني','الموجات الكهرومغناطيسية','24:30',2,false),
('chem-3s','الباب الأول','الاتزان الكيميائي','19:15',1,true),
('bio-3s','الباب الأول','الوراثة','23:40',1,true),
('eng-3s','Unit 1','Reading Skills','21:00',1,true),
('ar-3s','الباب الأول','النصوص الأدبية','25:10',1,true);

-- Seed exams
INSERT INTO public.exams (subject_id, title, description, duration_minutes, total_questions) VALUES
('math-3s','امتحان الباب الأول — تفاضل','مراجعة شاملة على قواعد التفاضل',45,20),
('phys-3s','امتحان الفيزياء — الفصل الأول','أسئلة اختيار من متعدد',30,15),
('chem-3s','كويز يومي — كيمياء',NULL,15,10),
('bio-3s','امتحان شامل — أحياء','امتحان نهاية الوحدة',60,30);
