function toLines(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

/** Build a safe, whitelisted set of package fields from request input. */
export function sanitizePackage(body: Record<string, unknown>) {
  const category = String(body.category ?? '').trim() || 'Nusa Penida Tours';

  return {
    title: String(body.title ?? '').trim(),
    category,
    description: String(body.description ?? '').trim(),
    descriptionId: String(body.descriptionId ?? '').trim(),
    duration: String(body.duration ?? '').trim(),
    durationId: String(body.durationId ?? '').trim(),
    priceValue: Math.max(0, Math.round(Number(body.priceValue) || 0)),
    image: String(body.image ?? '').trim(),
    destinations: toLines(body.destinations),
    includes: toLines(body.includes),
    featured: Boolean(body.featured),
    order: Number.isFinite(Number(body.order)) ? Number(body.order) : 0,
  };
}
