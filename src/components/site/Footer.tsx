import { Link } from "@tanstack/react-router";
import { Facebook, Github, GraduationCap, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-gradient-to-b from-background to-secondary/40">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-glow" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold">
              M<span className="text-gradient">_Academy</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            منصة تعليمية عربية احترافية تجمع بين أفضل المدرسين ومحتوى تفاعلي متقدم
            لمساعدتك على تحقيق أعلى الدرجات.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[Facebook, Twitter, Instagram, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-gradient-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">المنصة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">من نحن</Link></li>
            <li><Link to="/courses" className="hover:text-foreground">المواد الدراسية</Link></li>
            <li><Link to="/teachers" className="hover:text-foreground">المدرسين</Link></li>
            <li><Link to="/exams" className="hover:text-foreground">الامتحانات</Link></li>
            <li><Link to="/schedule" className="hover:text-foreground">جدول الحصص</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">المساعدة</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/support" className="hover:text-foreground">مركز الدعم</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">الأسئلة الشائعة</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">سياسة الخصوصية</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">الشروط والأحكام</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">تواصل معنا</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> support@m-academy.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> +20 100 123 4567</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand" /> القاهرة، مصر</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} M_Academy — جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
