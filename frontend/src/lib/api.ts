import { Platform } from "react-native";

const ENV_BASE = process.env.EXPO_PUBLIC_BACKEND_URL as string;
// Web shares an origin with the API behind the ingress → relative URLs.
export const HTTP_BASE = Platform.OS === "web" ? "" : ENV_BASE;

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function apiUrl(path: string): string {
  return `${HTTP_BASE}${path}`;
}

/** Build a full URL for a media path returned by the backend (e.g. /api/files/..). */
export function mediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${HTTP_BASE}${path}`;
}

/** Event covers live on the Glitz site which blocks cross-origin reads on web
 *  (CORP). Route external images through our backend proxy so they always load. */
export function coverUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return `${HTTP_BASE}/api/img?u=${encodeURIComponent(url)}`;
  return `${HTTP_BASE}${url}`;
}

function buildHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    ...(extra || {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

async function handle(res: Response) {
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    throw { status: res.status, data };
  }
  return data as any;
}

export async function apiGet(path: string) {
  const res = await fetch(apiUrl(path), { headers: buildHeaders() });
  return handle(res);
}

export async function apiPost(path: string, body?: unknown) {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: buildHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body ?? {}),
  });
  return handle(res);
}

export async function apiPatch(path: string, body?: unknown) {
  const res = await fetch(apiUrl(path), {
    method: "PATCH",
    headers: buildHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body ?? {}),
  });
  return handle(res);
}

/** Upload a local image uri as multipart. Handles web vs native body shapes. */
export async function apiUpload(path: string, uri: string, name = "photo.jpg", type = "image/jpeg") {
  const form = new FormData();
  if (Platform.OS === "web") {
    const blob = await (await fetch(uri)).blob();
    form.append("file", blob, name);
  } else {
    // @ts-expect-error native FormData file shape
    form.append("file", { uri, name, type });
  }
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: buildHeaders(),
    body: form,
  });
  return handle(res);
}
