export type Course = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacher: string;
  rating: number;
  students: number;
  lessons: number;
  hours: number;
  price: number;
  oldPrice?: number;
  color: string;
  tag?: string;
};

export const courses: Course[] = [
  { id: "math-3s", title: "الرياضيات — الصف الثالث الثانوي", subject: "رياضيات", grade: "ثانوية عامة", teacher: "أ. أحمد السيد", rating: 4.9, students: 12480, lessons: 84, hours: 62, price: 599, oldPrice: 899, color: "from-indigo-500 to-purple-600", tag: "الأكثر مبيعاً" },
  { id: "phys-3s", title: "الفيزياء — الصف الثالث الثانوي", subject: "فيزياء", grade: "ثانوية عامة", teacher: "د. محمد فهمي", rating: 4.8, students: 9820, lessons: 76, hours: 58, price: 549, oldPrice: 799, color: "from-fuchsia-500 to-pink-600" },
  { id: "chem-3s", title: "الكيمياء — الصف الثالث الثانوي", subject: "كيمياء", grade: "ثانوية عامة", teacher: "أ. مصطفى الشرقاوي", rating: 4.7, students: 8140, lessons: 68, hours: 51, price: 499, color: "from-emerald-500 to-teal-600" },
  { id: "bio-3s", title: "الأحياء — الصف الثالث الثانوي", subject: "أحياء", grade: "ثانوية عامة", teacher: "د. سارة عبد الله", rating: 4.9, students: 7620, lessons: 72, hours: 55, price: 499, color: "from-lime-500 to-green-600", tag: "جديد" },
  { id: "eng-3s", title: "اللغة الإنجليزية — الثانوية العامة", subject: "إنجليزي", grade: "ثانوية عامة", teacher: "أ. ياسمين حسن", rating: 4.8, students: 15310, lessons: 90, hours: 70, price: 449, oldPrice: 649, color: "from-sky-500 to-blue-600" },
  { id: "ar-3s", title: "اللغة العربية — الثانوية العامة", subject: "عربي", grade: "ثانوية عامة", teacher: "أ. عبد الرحمن نور", rating: 4.9, students: 11290, lessons: 80, hours: 60, price: 449, color: "from-amber-500 to-orange-600" },
  { id: "hist-2s", title: "التاريخ — الصف الثاني الثانوي", subject: "تاريخ", grade: "ثانوية عامة", teacher: "أ. طارق منير", rating: 4.6, students: 4210, lessons: 54, hours: 40, price: 349, color: "from-rose-500 to-red-600" },
  { id: "geo-2s", title: "الجغرافيا — الصف الثاني الثانوي", subject: "جغرافيا", grade: "ثانوية عامة", teacher: "أ. هبة إبراهيم", rating: 4.7, students: 3980, lessons: 52, hours: 38, price: 349, color: "from-cyan-500 to-teal-600" },
  { id: "phil-2s", title: "الفلسفة والمنطق", subject: "فلسفة", grade: "ثانوية عامة", teacher: "د. كريم عاطف", rating: 4.5, students: 2810, lessons: 44, hours: 32, price: 299, color: "from-violet-500 to-purple-600" },
];

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  rating: number;
  students: number;
  courses: number;
  bio: string;
  color: string;
};

export const teachers: Teacher[] = [
  { id: "t1", name: "د. أحمد السيد", subject: "الرياضيات", rating: 4.9, students: 24800, courses: 12, bio: "خبرة 20 عام في تدريس الرياضيات للثانوية العامة.", color: "from-indigo-500 to-purple-600" },
  { id: "t2", name: "د. محمد فهمي", subject: "الفيزياء", rating: 4.8, students: 18400, courses: 9, bio: "متخصص في تبسيط الفيزياء الحديثة والميكانيكا.", color: "from-fuchsia-500 to-pink-600" },
  { id: "t3", name: "أ. مصطفى الشرقاوي", subject: "الكيمياء", rating: 4.7, students: 15200, courses: 8, bio: "أسلوب فريد في شرح الكيمياء العضوية.", color: "from-emerald-500 to-teal-600" },
  { id: "t4", name: "د. سارة عبد الله", subject: "الأحياء", rating: 4.9, students: 12600, courses: 7, bio: "دكتوراة في علوم الأحياء وخبرة تعليمية 15 عام.", color: "from-lime-500 to-green-600" },
  { id: "t5", name: "أ. ياسمين حسن", subject: "الإنجليزي", rating: 4.8, students: 21000, courses: 11, bio: "معلمة إنجليزي معتمدة من كامبريدج.", color: "from-sky-500 to-blue-600" },
  { id: "t6", name: "أ. عبد الرحمن نور", subject: "اللغة العربية", rating: 4.9, students: 17800, courses: 10, bio: "شاعر وناقد أدبي، معلم لغة عربية بامتياز.", color: "from-amber-500 to-orange-600" },
];

export const schedule = [
  { day: "السبت", items: [
    { time: "05:00 م", subject: "الرياضيات", teacher: "د. أحمد السيد", type: "لايف" },
    { time: "07:00 م", subject: "الفيزياء", teacher: "د. محمد فهمي", type: "لايف" },
  ]},
  { day: "الأحد", items: [
    { time: "04:00 م", subject: "الكيمياء", teacher: "أ. مصطفى الشرقاوي", type: "مسجل" },
    { time: "06:30 م", subject: "الإنجليزي", teacher: "أ. ياسمين حسن", type: "لايف" },
  ]},
  { day: "الاثنين", items: [
    { time: "05:00 م", subject: "الأحياء", teacher: "د. سارة عبد الله", type: "لايف" },
    { time: "08:00 م", subject: "العربي", teacher: "أ. عبد الرحمن نور", type: "مسجل" },
  ]},
  { day: "الثلاثاء", items: [
    { time: "05:30 م", subject: "الرياضيات — مراجعة", teacher: "د. أحمد السيد", type: "لايف" },
  ]},
  { day: "الأربعاء", items: [
    { time: "06:00 م", subject: "الفيزياء — حل مسائل", teacher: "د. محمد فهمي", type: "لايف" },
    { time: "08:00 م", subject: "الفلسفة", teacher: "د. كريم عاطف", type: "مسجل" },
  ]},
  { day: "الخميس", items: [
    { time: "07:00 م", subject: "امتحان شامل", teacher: "لجنة المعلمين", type: "امتحان" },
  ]},
];
