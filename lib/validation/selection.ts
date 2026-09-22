import { z } from 'zod';

export const requestTypes = ['samples', 'quote'] as const;
export const fulfilments = ['ship', 'showroom'] as const;

export const selectionSchema = z
  .object({
    requestType: z.enum(requestTypes),
    name: z.string().min(2, 'Please enter your name.').max(120),
    email: z.string().email('Please enter a valid email.').max(200),
    phone: z.string().min(7, 'Please enter a valid phone number.').max(40),
    fulfilment: z.enum(fulfilments),
    address: z.string().max(400).optional().or(z.literal('')),
    preferredShowroom: z.string().max(80).optional().or(z.literal('')),
    /** Comma-separated stone names, filled from the selection board. */
    stones: z.string().min(1, 'Add at least one stone to your selection.').max(2000),
    message: z.string().max(2000).optional().or(z.literal('')),
    // Honeypot.
    website: z.string().max(0).optional().or(z.literal('')),
  })
  .refine((d) => d.fulfilment !== 'ship' || (d.address ?? '').trim().length >= 8, {
    message: 'Please enter a shipping address.',
    path: ['address'],
  });

export type SelectionInput = z.infer<typeof selectionSchema>;
