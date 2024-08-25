import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const makeStringTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export const makeFirstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isDev = process.env.NODE_ENV === "development"