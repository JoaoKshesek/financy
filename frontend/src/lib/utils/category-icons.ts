import {
  BaggageClaim,
  BookOpen,
  BriefcaseBusiness,
  CarFront,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
} from "lucide-react"

export const CATEGORY_ICONS = {
  BRIEFCASE_BUSINESS: BriefcaseBusiness,
  CAR_FRONT: CarFront,
  HEART_PULSE: HeartPulse,
  PIGGY_BANK: PiggyBank,
  SHOPPING_CART: ShoppingCart,
  TICKET: Ticket,
  TOOL_CASE: ToolCase,
  UTENSILS: Utensils,
  PAW_PRINT: PawPrint,
  HOUSE: House,
  GIFT: Gift,
  DUMBBELL: Dumbbell,
  BOOK_OPEN: BookOpen,
  BAGGAGE_CLAIM: BaggageClaim,
  MAILBOX: Mailbox,
  RECEIPT_TEXT: ReceiptText,
} as const

export type CategoryIconName = keyof typeof CATEGORY_ICONS

export const CATEGORY_ICON_NAMES = Object.keys(
  CATEGORY_ICONS
) as CategoryIconName[]
