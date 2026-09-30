import type { TagColor } from "@/components/atoms"

export const ICON_BOX = {
  gray: "bg-gray-200 text-gray-700",
  blue: "bg-blue-light text-blue-base",
  purple: "bg-purple-light text-purple-base",
  pink: "bg-pink-light text-pink-base",
  red: "bg-red-light text-red-base",
  orange: "bg-orange-light text-orange-base",
  yellow: "bg-yellow-light text-yellow-base",
  green: "bg-green-light text-green-base",
} as const satisfies Record<TagColor, string>

export const COLOR_SWATCH = {
  green: "bg-green-base",
  blue: "bg-blue-base",
  purple: "bg-purple-base",
  pink: "bg-pink-base",
  red: "bg-red-base",
  orange: "bg-orange-base",
  yellow: "bg-yellow-base",
} as const

export type CategoryColorName = keyof typeof COLOR_SWATCH

export const CATEGORY_COLOR_NAMES = Object.keys(
  COLOR_SWATCH
) as CategoryColorName[]
