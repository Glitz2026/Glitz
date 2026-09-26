// Website content (events, shop, news, gallery, club, contacts) reaches the app
// through the backend bridge at /api/site/*, so every screen reads the same data
// the Glitz site shows and edits from its admin panel.
import { useQuery } from "@tanstack/react-query";
import { Linking } from "react-native";

import { apiGet, coverUrl, HTTP_BASE } from "@/src/lib/api";

export type Formula = { id: string; label: string; price: number; includes: string };

export type SiteEvent = {
  id: string;
  title: string;
  date: string;
  lineup: string[];
  description: string;
  poster_url: string;
  artist_photo_url?: string;
  ticket_url?: string;
  location?: string;
  floorplan_enabled?: boolean;
  floorplan_image_url?: string;
  reserved_tables?: Record<string, string>;
  app_event_id?: string | null;
  formulas?: Formula[];
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_url: string;
  body: string;
  tags: string[];
  created_at: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  image: string;
  gallery?: string[];
  badge?: string;
  color?: string;
  description?: string;
  details?: string[];
  sizes?: string[];
};

export type Media = { id: string; url: string; caption?: string; category?: string };
export type Faq = { id: string; question: string; answer: string };
export type Settings = Record<string, any>;

/** Images from the site: absolute URLs go through the image proxy, site paths through the asset bridge. */
export function siteImg(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return coverUrl(url);
  return `${HTTP_BASE}/api/site/asset?p=${encodeURIComponent(url.startsWith("/") ? url : `/${url}`)}`;
}

export const siteGet = (path: string) => apiGet(`/api/site${path}`);

export function useSettings() {
  return useQuery<Settings>({ queryKey: ["site", "settings"], queryFn: () => siteGet("/settings"), staleTime: 60_000 });
}

export function useSiteEvents() {
  return useQuery<SiteEvent[]>({ queryKey: ["site", "events"], queryFn: () => siteGet("/events"), staleTime: 30_000 });
}

export function useUpcoming() {
  return useQuery<SiteEvent | null>({ queryKey: ["site", "upcoming"], queryFn: () => siteGet("/events/upcoming"), staleTime: 30_000 });
}

export function useProducts() {
  return useQuery<Product[]>({ queryKey: ["site", "products"], queryFn: () => siteGet("/products"), staleTime: 60_000 });
}

export function usePosts() {
  return useQuery<Post[]>({ queryKey: ["site", "posts"], queryFn: () => siteGet("/posts"), staleTime: 60_000 });
}

export function useFaqs() {
  return useQuery<Faq[]>({ queryKey: ["site", "faqs"], queryFn: () => siteGet("/faqs"), staleTime: 60_000 });
}

export function useMedia(category: string | null | undefined) {
  return useQuery<Media[]>({
    queryKey: ["site", "media", category],
    queryFn: () => siteGet(`/media?category=${encodeURIComponent(category ?? "")}`),
    enabled: !!category,
    staleTime: 60_000,
  });
}

// Same fallbacks as the site's ContactContext / Contact page.
export function useContact() {
  const { data: s } = useSettings();
  return {
    whatsappNumber: s?.contact_whatsapp_number || "393444289232",
    whatsappDisplay: s?.contact_whatsapp_display || "344 4289232",
    email: s?.contact_email || "glitzclubofficial@gmail.com",
    instagram: s?.contact_instagram || "https://instagram.com/glitzclubofficial",
    instagramHandle: s?.contact_instagram_handle || "@glitzclubofficial",
    tiktok: "https://tiktok.com/@glitzclubofficial",
    address: s?.contact_address || "Contrada Dino, San Nicola Arcella (CS), 87020",
    hours: s?.contact_hours || "Aperto solo la sera, dal giovedì alla domenica\nGiugno – Settembre · 22:00 – 05:00",
  };
}

export function openWhatsApp(number: string, text: string) {
  return Linking.openURL(`https://wa.me/${number}?text=${encodeURIComponent(text)}`);
}

export function errorMessage(e: unknown, fallback = "Errore. Riprova."): string {
  const detail = (e as { data?: { detail?: unknown } })?.data?.detail;
  return typeof detail === "string" ? detail : fallback;
}
