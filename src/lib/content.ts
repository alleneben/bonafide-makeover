export const site = {
  brand: "Bonafide Makeover",
  tagline: "Bridal & occasion makeup · Kumasi",
  phone: "+233 554435360",
  phoneHref: "tel:+233554435360",
  email: "dianawalter@bonafidemakeover.com",
  emailHref: "mailto:dianawalter@bonafidemakeover.com",
  instagram: "@bonafide_makeover",
  instagramUrl: "https://instagram.com/bonafide_makeover",
  address: "Kumasi — near KNUST",
  mapsEmbed:
    "https://maps.google.com/maps?q=KNUST%2C%20Kumasi%2C%20Ghana&z=14&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=KNUST+Kumasi+Ghana",
} as const;

export const nav = [
  { href: "#portfolio", label: "Portfolio", current: true },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#location", label: "Location" },
  { href: "#book", label: "Book" },
] as const;

export const services = [
  {
    title: "Bridal Makeup",
    description:
      "Soft, lasting bridal glam for your white wedding. Skin prep, heat-set finish, and a calm chair so you look like yourself — only more radiant.",
    detail: "Studio or home call",
  },
  {
    title: "Traditional Ceremony",
    description:
      "Looks that honour kente, beads, and gold without fighting them. Warm tones, defined eyes, and a finish that holds through greeting lines and photos.",
    detail: "Engagement · outdoor · evening",
  },
  {
    title: "Engagement & Portraits",
    description:
      "Camera-ready soft glam for engagement shoots, birthday portraits, and studio sittings in Kumasi.",
    detail: "From the Kumasi studio",
  },
  {
    title: "Bridal Party",
    description:
      "Coordinated glam for the bride and her sisters. Early starts, clear timing, and the same careful finish for every seat.",
    detail: "Book early for weekend dates",
  },
] as const;

export const testimonials = [
  {
    quote:
      "She listened to my kente colours first, then built the face around them. Soft, polished, and still me — even after the long greeting line.",
    name: "Akosua M.",
    role: "Traditional & white wedding · Kumasi",
  },
  {
    quote:
      "Our bridal party met her before dawn. By the time guests arrived, every sister looked fresh and camera-ready.",
    name: "Efua A.",
    role: "Bridal party · Kumasi",
  },
  {
    quote:
      "I booked the studio for engagement portraits. The skin still looked clean under harsh midday light, and she packed a small touch-up kit for later.",
    name: "Nana Yaa B.",
    role: "Engagement portraits · Kumasi",
  },
] as const;
