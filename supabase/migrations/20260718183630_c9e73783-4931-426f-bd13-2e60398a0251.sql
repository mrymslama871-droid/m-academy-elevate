
-- assignments
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.assignments TO anon, authenticated;
GRANT ALL ON public.assignments TO authenticated, service_role;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Assignments viewable by everyone" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Admins manage assignments" ON public.assignments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  ref_kind TEXT,
  ref_id UUID,
  reminder_bucket TEXT,
  scheduled_for TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX notifications_dedupe_idx ON public.notifications (user_id, ref_kind, ref_id, reminder_bucket)
  WHERE ref_kind IS NOT NULL AND ref_id IS NOT NULL AND reminder_bucket IS NOT NULL;
CREATE INDEX notifications_user_time_idx ON public.notifications (user_id, scheduled_for DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own notifications" ON public.notifications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notifications" ON public.notifications FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- reminder generator
CREATE OR REPLACE FUNCTION public.generate_reminder_notifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Exam reminders (24h and 1h before) for enrolled students
  INSERT INTO public.notifications (user_id, type, title, body, link, ref_kind, ref_id, reminder_bucket, scheduled_for)
  SELECT e.user_id,
         'exam',
         'تذكير بامتحان: ' || x.title,
         'يبدأ خلال ' || b.label || ' — ' || to_char(x.scheduled_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI'),
         '/exams',
         'exam',
         x.id,
         b.bucket,
         now()
  FROM public.exams x
  JOIN public.enrollments e ON e.subject_id = x.subject_id
  CROSS JOIN LATERAL (VALUES ('24h','24 ساعة'), ('1h','ساعة واحدة')) AS b(bucket, label)
  WHERE x.scheduled_at IS NOT NULL
    AND x.scheduled_at > now()
    AND (
      (b.bucket = '24h' AND x.scheduled_at <= now() + interval '24 hours' AND x.scheduled_at > now() + interval '1 hour')
      OR (b.bucket = '1h' AND x.scheduled_at <= now() + interval '1 hour')
    )
  ON CONFLICT DO NOTHING;

  -- Assignment reminders
  INSERT INTO public.notifications (user_id, type, title, body, link, ref_kind, ref_id, reminder_bucket, scheduled_for)
  SELECT e.user_id,
         'assignment',
         'تذكير بواجب: ' || a.title,
         'موعد التسليم خلال ' || b.label || ' — ' || to_char(a.due_at AT TIME ZONE 'UTC', 'YYYY-MM-DD HH24:MI'),
         '/dashboard/student',
         'assignment',
         a.id,
         b.bucket,
         now()
  FROM public.assignments a
  JOIN public.enrollments e ON e.subject_id = a.subject_id
  CROSS JOIN LATERAL (VALUES ('24h','24 ساعة'), ('1h','ساعة واحدة')) AS b(bucket, label)
  WHERE a.due_at IS NOT NULL
    AND a.due_at > now()
    AND (
      (b.bucket = '24h' AND a.due_at <= now() + interval '24 hours' AND a.due_at > now() + interval '1 hour')
      OR (b.bucket = '1h' AND a.due_at <= now() + interval '1 hour')
    )
  ON CONFLICT DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.generate_reminder_notifications() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.generate_reminder_notifications() TO authenticated, service_role;

-- Schedule via pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule(
  'generate-reminder-notifications',
  '*/15 * * * *',
  $$SELECT public.generate_reminder_notifications();$$
);
