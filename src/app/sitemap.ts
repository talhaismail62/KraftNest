import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/how-it-works", "/work", "/pricing", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const workRoutes = projects.map((p) => ({
    url: `${site.url}/work/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...workRoutes];
}
