import { z } from 'zod';

/** Shared quote-form schema (client validation + server re-validation). */
export const audiences = ['homeowner', 'trade'] as const;
export const projectTypes = [
  'Kitchen',
  'Bathroom',
  'Commercial',
  'Fireplace / feature',
  'Flooring',
  'Other',
] as const;
export const timelines = [
  'Just exploring',
  'Within 1 month',
  '1–3 months',
  '3+ months',
] as const;

export const quoteSchema = z.object({
  audience: z.enum(audiences),
  name: z.string().min(2, 'Please enter your name.').max(120),
  company: z.string().max(160).optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email.').max(200),
  phone: z.string().min(7, 'Please enter a valid phone number.').max(40),
  location: z.string().min(2, 'Please enter your city and state.').max(120),
  projectType: z.enum(projectTypes),
  materialInterest: z.string().max(200).optional().or(z.literal('')),
  timeline: z.enum(timelines),
  preferredShowroom: z.string().max(80).optional().or(z.literal('')),
  stone: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(10, 'Please add a little detail (10+ characters).').max(4000),
  // Honeypot — must stay empty. Bots tend to fill every field.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Server-side file constraints. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/acad', // .dwg (varies by browser)
  'image/vnd.dwg',
  'application/octet-stream', // fallback for CAD exports
];
