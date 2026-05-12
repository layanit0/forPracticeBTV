import { ShoppingBag, Music, Trophy } from 'lucide-react';

export const events = [
  {
    id: 1,
    title: "سوق الليل",
    time: "21:00",
    icon: ShoppingBag,
    description: "منتجات حرفية وتقليدية",
  },
  {
    id: 2,
    title: "عروض فنية",
    time: "بعد صلاة المغرب",
    icon: Music,
    description: "فنون شعبية حية",
  },
  {
    id: 3,
    title: "مسابقات",
    time: "22:30",
    icon: Trophy,
    description: "جوائز قيمة للمشاركين",
  },
];

export const foodBooths = [
  {
    id: 1,
    name: "كنافة الشام",
    emoji: "🥧",
    zone: "A",
    color: "bg-lj-blue",
  },
  {
    id: 2,
    name: "قهوة البلد",
    emoji: "☕",
    zone: "B",
    color: "bg-lj-green",
  },
  {
    id: 3,
    name: "قطايف الحجاز",
    emoji: "🥟",
    zone: "C",
    color: "bg-lj-lime",
  },
  {
    id: 4,
    name: "عسل اليمن",
    emoji: "🍯",
    zone: "A",
    color: "bg-lj-pink",
  },
];

export const prayerTimes = [
  { name: "المغرب", time: "18:45" },
  { name: "العشاء", time: "20:15" },
];
