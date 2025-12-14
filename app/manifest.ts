import type { MetadataRoute } from "next";

// RealFaviconGenerator output:
// https://realfavicongenerator.net/files/56973ed6-972c-4fd4-8590-a80d93999222/manifest.json
import manifestJson from "./manifest.json";

export default function manifest(): MetadataRoute.Manifest {
  return manifestJson as MetadataRoute.Manifest;
}

