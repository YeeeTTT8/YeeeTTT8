import type { Faq } from '@/content/types';

/** SAMPLE DATA — eight FAQs. Answers are general and accurate; anything
 * business-specific is marked TODO(client). */
export const faqs: Faq[] = [
  {
    question: 'Do you sell directly to homeowners, or only to the trade?',
    answer:
      'Both. Homeowners are welcome to visit a showroom and select slabs; fabricators, builders and designers can also work with us through our trade program. TODO(client): confirm any minimums or account requirements.',
    category: 'Ordering',
  },
  {
    question: 'Can I see the actual slab before I buy it?',
    answer:
      'Yes. Because natural stone varies slab to slab, we keep full slabs in our warehouses so you can view the exact piece, see how the veining moves, and reserve it for your project.',
    category: 'Ordering',
  },
  {
    question: 'What is the difference between granite, marble, quartz and quartzite?',
    answer:
      'Granite and quartzite are hard natural stones well suited to kitchens. Marble is a softer natural stone with luminous veining that patinas over time. Quartz is an engineered, non-porous material with very consistent colour. Each material page goes into detail.',
    category: 'Materials',
  },
  {
    question: 'How do I care for natural stone countertops?',
    answer:
      'Clean with mild soap and water or a pH-neutral stone cleaner. Seal porous natural stones periodically, and wipe up acidic spills (citrus, wine) promptly on marble to avoid etching. Avoid abrasive pads and harsh chemicals.',
    category: 'Care',
  },
  {
    question: 'Do you fabricate and install countertops?',
    answer:
      'We are a slab distributor rather than a fabricator. We can refer you to established local fabrication partners who template, cut and install. TODO(client): confirm partner referrals.',
    category: 'Trade',
  },
  {
    question: 'How does delivery work?',
    answer:
      'We hold stock across several warehouses and deliver locally to fabrication shops and job sites. TODO(client): confirm delivery areas, scheduling and lead times.',
    category: 'Delivery',
  },
  {
    question: 'Can I check current inventory online?',
    answer:
      'Yes — live inventory is hosted on StoneProfitsWeb and is linked throughout the site under “Live Inventory.” It opens in a new tab and shows what is currently in stock.',
    category: 'Ordering',
  },
  {
    question: 'What thicknesses do slabs come in?',
    answer:
      'Slabs are commonly stocked in 2 cm and 3 cm thicknesses depending on the material and use. TODO(client): confirm stocked thicknesses per material.',
    category: 'Materials',
  },
];
