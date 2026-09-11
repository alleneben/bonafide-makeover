export const images = {
  portrait: "/images/IMG_1734.jpg",
  editorial: "/images/IMG_1735.jpg",
  glow: "/images/IMG_1736.jpg",
  glass: "/images/IMG_1737.jpg",
  bridal: "/images/IMG_1738.jpg",
} as const;

export type GalleryCategory = "bridal" | "traditional" | "glam";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  /** Grid span hint for the editorial mosaic */
  span?: "tall" | "wide" | "feature";
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery/look-z7z-1385.jpg",
    alt: "Bride in a sculpted white lace gown against an all-white floral setting",
    title: "White-on-white bridal",
    category: "bridal",
    span: "feature",
  },
  {
    src: "/images/gallery/traditional-kente-kiss.jpg",
    alt: "Traditional Ghanaian bride in kente with gold jewelry blowing a kiss",
    title: "Kente & gold",
    category: "traditional",
    span: "tall",
  },
  {
    src: "/images/gallery/bridal-lace-glow.jpg",
    alt: "Close-up bridal glam with champagne lids and lace gown",
    title: "Lace & champagne lids",
    category: "bridal",
  },
  {
    src: "/images/gallery/glam-red-pearl.jpg",
    alt: "Soft glam with pearl hairpins and a bold red lip",
    title: "Pearl & rouge",
    category: "glam",
  },
  {
    src: "/images/gallery/bridal-party-sky.jpg",
    alt: "Bride and bridesmaids in sky-blue robes during getting ready",
    title: "Getting-ready glow",
    category: "bridal",
    span: "tall",
  },
  {
    src: "/images/gallery/traditional-orange-fan.jpg",
    alt: "Occasion glam with gold lids and a Gye Nyame fan outdoors",
    title: "Golden hour fan",
    category: "traditional",
  },
  {
    src: "/images/gallery/glam-red-earring.jpg",
    alt: "Dewy skin and crystal earring moment in a red gown",
    title: "Red satin glow",
    category: "glam",
    span: "tall",
  },
  {
    src: "/images/gallery/bridal-bbk-07502.jpg",
    alt: "Bride with bridesmaids in soft blue walking through green foliage",
    title: "Garden processional",
    category: "bridal",
    span: "wide",
  },
  {
    src: "/images/gallery/look-m1-4197.jpg",
    alt: "Bride in blue gele and lace gown holding a personalized fan",
    title: "Mrs. Adetola",
    category: "traditional",
    span: "tall",
  },
  {
    src: "/images/gallery/bridal-party-moment.jpg",
    alt: "Bride in an embellished ball gown looking softly aside",
    title: "Embellished ballgown",
    category: "bridal",
  },
  {
    src: "/images/gallery/glam-blue-fan.jpg",
    alt: "Hollywood waves with smoky gold eyes and a blue beaded gown",
    title: "Blue bead glam",
    category: "glam",
  },
  {
    src: "/images/gallery/traditional-rhyklin-2731.jpg",
    alt: "Traditional bride in kente with layered gold and a feather fan",
    title: "Feather & kente",
    category: "traditional",
    span: "tall",
  },
  {
    src: "/images/gallery/bridal-bbk-01942.jpg",
    alt: "Eyes-closed bridal portrait with lace collar and floral bokeh",
    title: "Soft bridal close-up",
    category: "bridal",
  },
  {
    src: "/images/gallery/glam-teal-robe.jpg",
    alt: "Getting-ready soft glam in a teal satin robe by the window",
    title: "Window light prep",
    category: "glam",
  },
  {
    src: "/images/gallery/bridal-lace-balcony.jpg",
    alt: "Full-length bride in lace mermaid gown on a sunlit balcony",
    title: "Balcony lace",
    category: "bridal",
    span: "tall",
  },
];

export const galleryFilters = [
  { id: "all" as const, label: "All" },
  { id: "bridal" as const, label: "Bridal" },
  { id: "traditional" as const, label: "Traditional" },
  { id: "glam" as const, label: "Soft Glam" },
];
