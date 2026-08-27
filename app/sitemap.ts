import { MetadataRoute } from "next";
import { STATIC_GUIDES } from "@/lib/data/staticGuides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.despegai.net";
  const now  = new Date();

  const guiaUrls: MetadataRoute.Sitemap = STATIC_GUIDES.map((g) => ({
    url: `${base}/guias/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: base,                                         lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/consultas`,                          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/destinos`,                           lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/chollos`,                            lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/guias`,                              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    ...guiaUrls,
    { url: `${base}/consejos`,                           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/consejos/vuelos-baratos`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/consejos/equipaje-mano`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/consejos/cuando-viajar`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/consejos/reserva-anticipada`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/quienes-somos`,                      lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/politica-de-privacidad`,             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terminos`,                           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
