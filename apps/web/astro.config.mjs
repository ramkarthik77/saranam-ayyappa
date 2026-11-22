import { defineConfig } from "astro/config";
export default defineConfig({
  output:"static",
  site:"https://saranam-ayyappa.pages.dev",
  build:{format:"directory"},
  trailingSlash:"always"
});
