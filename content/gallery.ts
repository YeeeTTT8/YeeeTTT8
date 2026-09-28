import type { ImageRef } from '@/content/types';

export type GalleryCategory = 'Kitchen' | 'Bathroom' | 'Living' | 'Commercial';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  image: ImageRef;
}

/**
 * SAMPLE DATA — representative project imagery, one tile per distinct photo
 * (repeating the same image reads as padding). TODO(client): add real project
 * photography and extend this list.
 */
const CATEGORIES: GalleryCategory[] = ['Kitchen', 'Bathroom', 'Living', 'Commercial'];

export const galleryItems: GalleryItem[] = Array.from({ length: CATEGORIES.length }, (_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length]!;
  return {
    id: `project-${i + 1}`,
    category,
    image: {
      src: `/placeholders/gallery-${i + 1}`,
      alt: `${category} project in natural stone`,
    },
  };
});
