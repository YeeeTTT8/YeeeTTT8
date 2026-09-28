import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Server-only: whether the catalogue PDF has been added at
 * /public/catalogue.pdf. Pages fall back to a "request the catalogue" link
 * until it exists, so no visitor ever lands on a 404 download.
 */
export const hasCatalogue = existsSync(join(process.cwd(), 'public', 'catalogue.pdf'));

export const catalogueRequestHref = '/contact?intent=catalogue';
