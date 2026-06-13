import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://despegai.vercel.app";
  return [
    { url: base,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/politica-de-privacidad`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terminos`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
