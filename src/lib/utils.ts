import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export const waitFor = async (ms: number) => (
  setTimeout(() => new Promise(
    (res, rej) => res('Time is up')
  ), ms)
)

