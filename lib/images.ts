import { collections } from '@/content/collections';
import { galleryItems } from '@/content/gallery';

/**
 * Generated imagery (AI, licence-clean) hosted on the generation CDN and
 * referenced remotely via next/image (see remotePatterns in next.config.mjs).
 *
 * These are REPRESENTATIVE images, not the client's actual slabs/showrooms —
 * TODO(client): replace with real photography and self-host under /public.
 * If a CDN URL ever 404s, regenerate or self-host and update this one map.
 */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FFTySXDUWytob3JoCfrGujpA75/';

const FILE: Record<string, string> = {
  'tex-ivory-1': 'hf_20260921_071916_8418879f-6612-44b7-afd6-eeed35169fdb.png',
  'tex-ivory-2': 'hf_20260921_071915_ae43fd26-91dd-44b3-939f-893027497531.png',
  'tex-nero-1': 'hf_20260921_071916_997717ac-cddc-4b8d-ae6a-a1fe4bbc241c.png',
  'tex-nero-2': 'hf_20260921_071916_36a11beb-89d3-4edf-af51-9e39dc6b4149.png',
  'tex-cala-1': 'hf_20260921_071916_27579d61-a90f-4398-a1c0-67bdf7ffa40a.png',
  'tex-cala-2': 'hf_20260921_071915_7daaf954-d668-4fbe-9f35-ac182e4e3c06.png',
  'tex-terra-1': 'hf_20260921_071916_efb0d823-9caa-4285-ac63-e004a7cb566f.png',
  'tex-terra-2': 'hf_20260921_071916_f68e08c9-770e-4234-9222-f3e6cd9efe93.png',
  'tex-coastal-1': 'hf_20260921_071917_a606975c-588b-4f6b-b020-450bfeafdc12.png',
  'tex-coastal-2': 'hf_20260921_071916_f3080f09-6015-4071-9e4f-feb7d0b2769c.png',
  'tex-atelier-1': 'hf_20260921_071916_64d78c02-6b49-4163-99ac-b6e254d609e1.png',
  'tex-atelier-2': 'hf_20260921_071916_95e93d7a-353d-46df-b013-793f7701326b.png',
  'material-granite': 'hf_20260921_071934_05a85b31-54cb-439b-aeec-4a0fb9adf925.png',
  'material-marble': 'hf_20260921_071934_d15329cd-a873-4b13-a9d5-c456b3f7e7d1.png',
  'material-quartz': 'hf_20260921_071933_96624133-a677-4e54-ae6c-8b309b0295cb.png',
  'material-quartzite': 'hf_20260921_071934_cc42f2ca-478a-47d4-9694-664fdcc4353f.png',
  'room-kitchen': 'hf_20260921_071934_b07c3242-ca0b-4e3e-9644-852bb360570a.png',
  'room-bathroom': 'hf_20260921_071933_b0176f05-f86a-4a66-8227-b08d8f0919a4.png',
  'room-living': 'hf_20260921_071934_2e4ce194-fd00-4297-9054-0c97c94e250a.png',
  'room-commercial': 'hf_20260921_071934_3c321a5d-3c36-49b1-9ce5-c698c0fdbd61.png',
  'warehouse-hero': 'hf_20260921_071934_a7b0b728-a459-479e-8130-0581e1c91ac3.png',
  'journal-read-slab': 'hf_20260921_071934_8dcc975a-26c7-4baa-bf4a-e927aa7a52ba.png',
  'journal-care': 'hf_20260921_071934_472deee9-8579-4b1e-b84d-c66288bca86e.png',
  'journal-granite-quartzite': 'hf_20260921_072012_ea333823-d32b-432a-92b8-869c4b9ab8e7.png',
};

export function imageUrl(key: string): string | null {
  const file = FILE[key];
  return file ? `${CDN}${file}` : null;
}

// Map each collection to its two texture variants.
const COLLECTION_TEX: Record<string, [string, string]> = {
  'ivory-coast': ['tex-ivory-1', 'tex-ivory-2'],
  'nero-reserve': ['tex-nero-1', 'tex-nero-2'],
  'calacatta-noir': ['tex-cala-1', 'tex-cala-2'],
  'terra-warm': ['tex-terra-1', 'tex-terra-2'],
  'coastal-green': ['tex-coastal-1', 'tex-coastal-2'],
  'atelier-pure': ['tex-atelier-1', 'tex-atelier-2'],
};

// Precompute stone slug -> texture key (alternate the two per collection).
const STONE_KEY: Record<string, string> = {};
for (const c of collections) {
  const tex = COLLECTION_TEX[c.slug] ?? ['tex-ivory-1', 'tex-ivory-2'];
  c.stoneSlugs.forEach((slug, i) => {
    STONE_KEY[slug] = tex[i % 2]!;
  });
}

// Gallery number -> room key by that item's category.
const GALLERY_KEY: Record<string, string> = {};
galleryItems.forEach((item, i) => {
  const cat = item.category.toLowerCase(); // kitchen | bathroom | living | commercial
  GALLERY_KEY[`gallery-${i + 1}`] = `room-${cat}`;
});

// Showrooms rotate across a few interior/warehouse shots.
const SHOWROOM_KEY: Record<string, string> = {
  'showroom-houston': 'warehouse-hero',
  'showroom-memphis': 'room-commercial',
  'showroom-nashville': 'room-kitchen',
  'showroom-denver': 'warehouse-hero',
  'showroom-atlanta': 'room-commercial',
  'showroom-columbus': 'room-kitchen',
};

/**
 * Resolve a `/placeholders/...` src to a real remote image URL, or null to keep
 * the deterministic gradient placeholder. Centralising this means content data
 * files stay unchanged and swapping to self-hosted photos is a one-file edit.
 */
export function resolvePlaceholder(src: string): string | null {
  if (!src.startsWith('/placeholders/')) return null;
  const key = src.slice('/placeholders/'.length);

  // Direct keys (materials, rooms, journal, warehouse).
  if (imageUrl(key)) return imageUrl(key);
  if (key.startsWith('material-')) return imageUrl(key);
  if (key.startsWith('room-')) return imageUrl(key);
  if (key.startsWith('journal-')) return imageUrl(key);
  if (key === 'about-warehouse') return imageUrl('warehouse-hero');

  // Collections -> first texture variant.
  if (key.startsWith('collection-')) {
    const slug = key.slice('collection-'.length);
    const tex = COLLECTION_TEX[slug]?.[0];
    return tex ? imageUrl(tex) : null;
  }

  // Stones -> assigned texture.
  if (key.startsWith('stone-')) {
    const slug = key.slice('stone-'.length);
    const tex = STONE_KEY[slug];
    return tex ? imageUrl(tex) : null;
  }

  // Gallery -> room by category.
  if (key.startsWith('gallery-')) {
    const room = GALLERY_KEY[key];
    return room ? imageUrl(room) : null;
  }

  // Showrooms.
  if (key.startsWith('showroom-')) {
    const room = SHOWROOM_KEY[key];
    return room ? imageUrl(room) : null;
  }

  return null;
}
