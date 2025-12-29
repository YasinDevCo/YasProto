// Mock data store - easily replaceable with MongoDB + Mongoose later
// This structure mirrors what a MongoDB collection would look like

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  category: "frontend" | "backend" | "tools";
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: "work" | "education";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}
interface Admin {
  username: string;
  password: string;
}
export interface Profile extends Admin {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  image: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}
export interface IHome {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  ctaButtons: { text: string; link: string }[];
  socialLinks: { platform: string; url: string; icon: string }[];
  stats: { label: string; value: string }[];
}

export interface About {
  id: string;
  title: string;
  biography: string;
  profileImage: string;
  tools: string[];
  values: { title: string; description: string; icon: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Database
export const mockData = {
  home: {
    id: "1",
    heroTitle: "سلام، من علی محمدی هستم",
    heroSubtitle: "توسعه‌دهنده فرانت‌اند",
    heroDescription:
      "من یک توسعه‌دهنده وب با تمرکز بر ایجاد تجربه‌های کاربری عالی و رابط‌های کاربری زیبا هستم.",
    ctaButtons: [
      { text: "دیدن پروژه‌ها", link: "/projects" },
      { text: "تماس با من", link: "/contact" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com", icon: "Github" },
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
      { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: "Instagram",
      },
    ],
    stats: [
      { label: "سال تجربه", value: "۵+" },
      { label: "پروژه تکمیل‌شده", value: "۵۰+" },
      { label: "مشتری راضی", value: "۳۰+" },
      { label: "جایزه", value: "۱۰+" },
    ],
  } as Home,

  about: {
    id: "1",
    title: "درباره من",
    biography: `من علی محمدی، یک توسعه‌دهنده فرانت‌اند با بیش از ۵ سال تجربه در طراحی و ساخت وب‌سایت‌ها و اپلیکیشن‌های مدرن هستم.
    
عاشق یادگیری تکنولوژی‌های جدید و ایجاد تجربه‌های کاربری منحصربه‌فرد هستم. تخصص من در React، Next.js و TypeScript است و همیشه به دنبال بهترین روش‌ها برای ساخت محصولات با کیفیت هستم.

در کنار کدنویسی، به طراحی UI/UX نیز علاقه‌مندم و سعی می‌کنم در پروژه‌هایم ترکیبی از زیبایی و کارایی را ارائه دهم.`,
    profileImage: "/professional-persian-developer-portrait.jpg",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "Figma",
      "Docker",
    ],
    values: [
      {
        title: "کیفیت",
        description: "تعهد به ارائه کد تمیز و قابل نگهداری",
        icon: "Award",
      },
      {
        title: "نوآوری",
        description: "استفاده از جدیدترین تکنولوژی‌ها و روش‌ها",
        icon: "Lightbulb",
      },
      {
        title: "همکاری",
        description: "کار تیمی و ارتباط موثر با مشتریان",
        icon: "Users",
      },
      {
        title: "یادگیری",
        description: "به‌روزرسانی مداوم دانش و مهارت‌ها",
        icon: "BookOpen",
      },
    ],
  } as About,

  blogPosts: [
    {
      id: "1",
      title: "آشنایی با Next.js 15 و قابلیت‌های جدید",
      slug: "nextjs-15-features",
      excerpt:
        "در این مقاله با قابلیت‌های جدید Next.js 15 آشنا می‌شویم و نحوه استفاده از آن‌ها را بررسی می‌کنیم.",
      content: `# آشنایی با Next.js 15

Next.js 15 با قابلیت‌های جدید و هیجان‌انگیزی منتشر شده است. در این مقاله به بررسی مهم‌ترین تغییرات می‌پردازیم.

## Turbopack به عنوان bundler پیش‌فرض

یکی از بزرگ‌ترین تغییرات، استفاده از Turbopack به عنوان bundler پیش‌فرض است که سرعت توسعه را به طور قابل توجهی افزایش می‌دهد.

## بهبود Caching

سیستم کشینگ جدید با APIهای بهبودیافته مانند revalidateTag و updateTag امکان کنترل دقیق‌تر کش را فراهم می‌کند.

## نتیجه‌گیری

Next.js 15 یک قدم بزرگ به جلو برای توسعه‌دهندگان React است.`,
      image: "/nextjs-blog-post.jpg",
      category: "تکنولوژی",
      tags: ["Next.js", "React", "JavaScript"],
      author: "علی محمدی",
      published: true,
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: "2",
      title: "بهترین روش‌های TypeScript در پروژه‌های React",
      slug: "typescript-react-best-practices",
      excerpt:
        "یادگیری بهترین روش‌ها برای استفاده از TypeScript در پروژه‌های React و افزایش کیفیت کد.",
      content: `# بهترین روش‌های TypeScript در React

TypeScript یکی از بهترین ابزارها برای نوشتن کد امن‌تر و قابل نگهداری‌تر است.

## تعریف Props با Interface

همیشه Props کامپوننت‌ها را با Interface تعریف کنید:

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
\`\`\`

## استفاده از Generic Types

از Generic Types برای کامپوننت‌های قابل استفاده مجدد استفاده کنید.

## نتیجه‌گیری

با رعایت این روش‌ها، کیفیت کد شما به طور قابل توجهی افزایش می‌یابد.`,
      image: "/typescript-blog-post.jpg",
      category: "آموزش",
      tags: ["TypeScript", "React", "Best Practices"],
      author: "علی محمدی",
      published: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "3",
      title: "طراحی سیستم دیزاین با Tailwind CSS",
      slug: "design-system-tailwind",
      excerpt:
        "چگونه یک سیستم دیزاین یکپارچه با استفاده از Tailwind CSS بسازیم.",
      content: `# طراحی سیستم دیزاین با Tailwind CSS

سیستم دیزاین یکی از مهم‌ترین بخش‌های هر پروژه بزرگ است.

## تعریف رنگ‌ها

ابتدا پالت رنگی پروژه را تعریف کنید:

\`\`\`css
@theme {
  --color-primary: #6366f1;
  --color-secondary: #0ea5e9;
}
\`\`\`

## کامپوننت‌های پایه

کامپوننت‌های پایه مانند Button، Card و Input را بسازید.

## مستندسازی

همیشه کامپوننت‌ها را مستند کنید.`,
      image: "/tailwind-blog-post.jpg",
      category: "طراحی",
      tags: ["Tailwind CSS", "Design System", "CSS"],
      author: "علی محمدی",
      published: true,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "4",
      title: "مدیریت State در React با Zustand",
      slug: "react-state-zustand",
      excerpt:
        "آشنایی با Zustand به عنوان یک راه‌حل ساده و قدرتمند برای مدیریت state.",
      content: `# مدیریت State با Zustand

Zustand یک کتابخانه کوچک و قدرتمند برای مدیریت state است.

## نصب و راه‌اندازی

\`\`\`bash
npm install zustand
\`\`\`

## ایجاد Store

\`\`\`typescript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
\`\`\`

## مزایای Zustand

- سادگی استفاده
- حجم کم
- عملکرد بالا`,
      image: "/zustand-blog-post.jpg",
      category: "آموزش",
      tags: ["React", "Zustand", "State Management"],
      author: "علی محمدی",
      published: false,
      createdAt: "2024-01-05T10:00:00Z",
      updatedAt: "2024-01-05T10:00:00Z",
    },
  ] as BlogPost[],

  profile: {
    name: "علی محمدی",
    title: "توسعه‌دهنده فرانت‌اند و طراح رابط کاربری",
    email: "info@example.com",
    phone: "۰۹۱۲-۱۲۳-۴۵۶۷",
    location: "تهران، ایران",
    bio: "من یک توسعه‌دهنده فرانت‌اند با بیش از ۵ سال تجربه در طراحی و ساخت وب‌سایت‌ها و اپلیکیشن‌های مدرن هستم. عاشق یادگیری تکنولوژی‌های جدید و ایجاد تجربه‌های کاربری منحصربه‌فرد هستم.",
    image: "/professional-persian-developer-portrait.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  } as Profile,

  projects: [
    {
      id: "1",
      title: "فروشگاه آنلاین",
      description:
        "طراحی و توسعه فروشگاه آنلاین با امکانات کامل پرداخت و مدیریت سفارشات. این پروژه شامل سیستم سبد خرید، درگاه پرداخت و پنل مدیریت است.",
      image: "/ecommerce-dark-theme.png",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "PostgreSQL",
      ],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "فروشگاه",
      featured: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "داشبورد مدیریت",
      description:
        "پنل مدیریت پیشرفته با نمودارها و گزارش‌های تحلیلی. امکان مشاهده آمار و ارقام به صورت بلادرنگ.",
      image: "/admin-dashboard-dark-theme.png",
      technologies: ["React", "Chart.js", "Node.js", "MongoDB"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "داشبورد",
      featured: true,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      title: "اپلیکیشن چت",
      description:
        "اپلیکیشن چت بلادرنگ با قابلیت ارسال فایل و تماس تصویری. پشتیبانی از گروه‌ها و کانال‌ها.",
      image: "/dark-theme-chat-app.png",
      technologies: ["Next.js", "Socket.io", "WebRTC", "PostgreSQL"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "اپلیکیشن",
      featured: true,
      createdAt: "2024-01-05",
    },
    {
      id: "4",
      title: "وبلاگ شخصی",
      description:
        "سیستم وبلاگ با قابلیت مدیریت محتوا، دسته‌بندی مطالب و سیستم نظرات.",
      image: "/dark-theme-blog.png",
      technologies: ["Next.js", "MDX", "Tailwind CSS", "Prisma"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "وبلاگ",
      featured: false,
      createdAt: "2023-12-20",
    },
    {
      id: "5",
      title: "سیستم رزرو آنلاین",
      description:
        "سیستم رزرو نوبت آنلاین برای کلینیک‌ها و مراکز خدماتی با تقویم هوشمند.",
      image: "/dark-theme-booking.png",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "اپلیکیشن",
      featured: false,
      createdAt: "2023-12-15",
    },
    {
      id: "6",
      title: "لندینگ پیج استارتاپ",
      description:
        "طراحی صفحه فرود مدرن و واکنش‌گرا برای استارتاپ‌های تکنولوژی.",
      image: "/dark-theme-landing.png",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "لندینگ",
      featured: false,
      createdAt: "2023-12-10",
    },
  ] as Project[],

  skills: [
    { id: "1", name: "React", level: 95, icon: "⚛️", category: "frontend" },
    { id: "2", name: "Next.js", level: 90, icon: "▲", category: "frontend" },
    {
      id: "3",
      name: "TypeScript",
      level: 85,
      icon: "📘",
      category: "frontend",
    },
    {
      id: "4",
      name: "Tailwind CSS",
      level: 95,
      icon: "🎨",
      category: "frontend",
    },
    {
      id: "5",
      name: "JavaScript",
      level: 92,
      icon: "🟨",
      category: "frontend",
    },
    { id: "6", name: "HTML/CSS", level: 98, icon: "🌐", category: "frontend" },
    { id: "7", name: "Node.js", level: 80, icon: "💚", category: "backend" },
    { id: "8", name: "Express", level: 78, icon: "🚂", category: "backend" },
    { id: "9", name: "MongoDB", level: 75, icon: "🍃", category: "backend" },
    {
      id: "10",
      name: "PostgreSQL",
      level: 70,
      icon: "🐘",
      category: "backend",
    },
    { id: "11", name: "GraphQL", level: 72, icon: "◼️", category: "backend" },
    { id: "12", name: "REST API", level: 85, icon: "🔌", category: "backend" },
    { id: "13", name: "Git", level: 90, icon: "📝", category: "tools" },
    { id: "14", name: "Docker", level: 65, icon: "🐳", category: "tools" },
    { id: "15", name: "Figma", level: 85, icon: "🎯", category: "tools" },
    { id: "16", name: "VS Code", level: 95, icon: "💻", category: "tools" },
    { id: "17", name: "Linux", level: 70, icon: "🐧", category: "tools" },
    { id: "18", name: "CI/CD", level: 68, icon: "🔄", category: "tools" },
  ] as Skill[],

  experiences: [
    {
      id: "1",
      title: "توسعه‌دهنده ارشد فرانت‌اند",
      company: "شرکت فناوری نوین",
      period: "۱۴۰۱ - اکنون",
      description:
        "مسئول طراحی و توسعه محصولات وب شرکت. همکاری با تیم محصول برای بهبود تجربه کاربری و پیاده‌سازی قابلیت‌های جدید.",
      achievements: [
        "افزایش ۴۰٪ سرعت بارگذاری",
        "پیاده‌سازی سیستم طراحی جدید",
        "رهبری تیم ۵ نفره فرانت‌اند",
      ],
      type: "work",
    },
    {
      id: "2",
      title: "توسعه‌دهنده فرانت‌اند",
      company: "استارتاپ دیجیتال",
      period: "۱۳۹۸ - ۱۴۰۱",
      description:
        "توسعه و نگهداری اپلیکیشن‌های وب با استفاده از React و Next.js. همکاری نزدیک با تیم طراحی و بک‌اند.",
      achievements: [
        "توسعه داشبورد مدیریت",
        "بهینه‌سازی عملکرد اپلیکیشن",
        "پیاده‌سازی تست‌های واحد",
      ],
      type: "work",
    },
    {
      id: "3",
      title: "توسعه‌دهنده جونیور",
      company: "آژانس طراحی وب",
      period: "۱۳۹۶ - ۱۳۹۸",
      description:
        "شروع فعالیت حرفه‌ای در زمینه توسعه وب. یادگیری مهارت‌های پایه و کار روی پروژه‌های کوچک.",
      achievements: [
        "توسعه ۲۰+ وبسایت",
        "یادگیری React",
        "آشنایی با روش‌های چابک",
      ],
      type: "work",
    },
    {
      id: "4",
      title: "کارشناسی ارشد مهندسی نرم‌افزار",
      company: "دانشگاه تهران",
      period: "۱۳۹۴ - ۱۳۹۶",
      description:
        "تحصیل در رشته مهندسی نرم‌افزار با تمرکز بر سیستم‌های توزیع‌شده و معماری نرم‌افزار.",
      achievements: [],
      type: "education",
    },
    {
      id: "5",
      title: "کارشناسی مهندسی کامپیوتر",
      company: "دانشگاه صنعتی شریف",
      period: "۱۳۹۰ - ۱۳۹۴",
      description: "تحصیل در رشته مهندسی کامپیوتر - نرم‌افزار با معدل ۱۸/۵۰.",
      achievements: [],
      type: "education",
    },
  ] as Experience[],

  services: [
    {
      id: "1",
      title: "توسعه وب",
      description:
        "طراحی و توسعه وب‌سایت‌های مدرن و واکنش‌گرا با استفاده از جدیدترین تکنولوژی‌ها",
      iconName: "Code2",
      features: [
        "React & Next.js",
        "TypeScript",
        "API Development",
        "Database Design",
      ],
    },
    {
      id: "2",
      title: "طراحی UI/UX",
      description:
        "طراحی رابط کاربری زیبا و تجربه کاربری عالی برای محصولات دیجیتال",
      iconName: "Palette",
      features: [
        "Wireframing",
        "Prototyping",
        "Design Systems",
        "User Research",
      ],
    },
    {
      id: "3",
      title: "اپلیکیشن موبایل",
      description:
        "توسعه اپلیکیشن‌های موبایل با React Native برای iOS و Android",
      iconName: "Smartphone",
      features: [
        "Cross-platform",
        "Native Features",
        "Performance",
        "Push Notifications",
      ],
    },
    {
      id: "4",
      title: "بهینه‌سازی عملکرد",
      description: "بهبود سرعت و عملکرد وب‌سایت‌ها و اپلیکیشن‌های موجود",
      iconName: "Gauge",
      features: [
        "Core Web Vitals",
        "Caching",
        "Code Splitting",
        "Image Optimization",
      ],
    },
    {
      id: "5",
      title: "سئو و بازاریابی",
      description:
        "بهینه‌سازی سایت برای موتورهای جستجو و افزایش دیده شدن در وب",
      iconName: "Search",
      features: ["Technical SEO", "Content Strategy", "Analytics", "Local SEO"],
    },
    {
      id: "6",
      title: "پشتیبانی و نگهداری",
      description: "خدمات پشتیبانی مداوم و نگهداری از سایت‌ها و اپلیکیشن‌ها",
      iconName: "Wrench",
      features: ["Bug Fixes", "Updates", "Security", "Monitoring"],
    },
  ] as Service[],

  messages: [
    {
      id: "1",
      name: "محمد رضایی",
      email: "mohammad@example.com",
      subject: "درخواست همکاری",
      message:
        "سلام، من علاقه‌مند به همکاری در پروژه وب‌سایت فروشگاهی هستم. لطفاً با من تماس بگیرید.",
      date: "۱۴۰۳/۰۱/۱۵",
      read: false,
    },
    {
      id: "2",
      name: "سارا احمدی",
      email: "sara@example.com",
      subject: "سوال درباره پروژه",
      message:
        "با سلام، می‌خواستم در مورد پروژه داشبورد مدیریت بیشتر بدانم. آیا امکان دموی آنلاین وجود دارد؟",
      date: "۱۴۰۳/۰۱/۱۴",
      read: true,
    },
    {
      id: "3",
      name: "علی کریمی",
      email: "ali@example.com",
      subject: "پیشنهاد کاری",
      message:
        "سلام، یک پروژه استارتاپی داریم که به یک توسعه‌دهنده فرانت‌اند نیاز داریم. آیا علاقه‌مند هستید؟",
      date: "۱۴۰۳/۰۱/۱۳",
      read: false,
    },
  ] as Message[],
};
