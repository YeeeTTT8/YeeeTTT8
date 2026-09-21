import type { ImageRef } from '@/content/types';

export type GalleryCategory = 'Kitchen' | 'Bathroom' | 'Living' | 'Commercial';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  image: ImageRef;
}

/**
 * SAMPLE DATA — placeholder project imagery. All items are clearly marked
 * placeholders until real project photography is supplied (TODO client).
 */
const CATEGORIES: GalleryCategory[] = ['Kitchen', 'Bathroom', 'Living', 'Commercial'];

export const galleryItems: GalleryItem[] = Array.from({ length: 12 }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length]!;
  return {
    id: `project-${i + 1}`,
    category,
    image: {
      src: `/placeholders/gallery-${i + 1}`,
      alt: `${category} project in natural stone (sample placeholder)`,
    },
  };
});
