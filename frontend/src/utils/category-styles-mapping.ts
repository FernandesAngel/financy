import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type CategoryColor =
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow";

const colorMap: Record<
  CategoryColor,
  {
    badgeVariant: string;
    bgClass: string;
    textClass: string;
  }
> = {
  green: {
    badgeVariant: "defaultGreen",
    bgClass: "bg-green-100",
    textClass: "text-primary",
  },
  blue: {
    badgeVariant: "defaultBlue",
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
  },
  purple: {
    badgeVariant: "defaultPurple",
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
  },
  pink: {
    badgeVariant: "defaultPink",
    bgClass: "bg-pink-100",
    textClass: "text-pink-500",
  },
  red: {
    badgeVariant: "defaultRed",
    bgClass: "bg-red-100",
    textClass: "text-red-600",
  },
  orange: {
    badgeVariant: "defaultOrange",
    bgClass: "bg-orange-100",
    textClass: "text-orange-600",
  },
  yellow: {
    badgeVariant: "defaultYellow",
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700",
  },
};

const iconMap: Record<string, LucideIcon> = {
  "briefcase-business": BriefcaseBusiness,
  "car-front": CarFront,
  "heart-pulse": HeartPulse,
  "piggy-bank": PiggyBank,
  "shopping-cart": ShoppingCart,
  ticket: Ticket,
  "tool-case": ToolCase,
  utensils: Utensils,
  "paw-print": PawPrint,
  house: House,
  gift: Gift,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  "baggage-claim": BaggageClaim,
  mailbox: Mailbox,
  "receipt-text": ReceiptText,
};

export function getCategoryStyle(
  color: string,
  icon: string,
): {
  badgeVariant: string;
  bgClass: string;
  textClass: string;
  Icon: LucideIcon;
} {
  const colorConfig = colorMap[color as CategoryColor] ?? colorMap.green;

  const Icon = iconMap[icon] ?? BriefcaseBusiness;

  return {
    ...colorConfig,
    Icon,
  };
}
