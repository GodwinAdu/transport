import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateAsString(): string {
  // Create a new Date object for the current date
  const currentDate: Date = new Date();

  // Format the date as "Sunday, Month Day, Year at HH:MM AM/PM"
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true };
  const formattedDate: string = currentDate.toLocaleDateString('en-US', options);

  return formattedDate;
}
