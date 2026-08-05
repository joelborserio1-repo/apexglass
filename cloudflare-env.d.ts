interface CloudflareEnv {
  DB: D1Database;
  PORTFOLIO_BUCKET: R2Bucket;
  ASSETS: Fetcher;
  ADMIN_BYPASS?: string;
  ADMIN_EMAILS: string;
  SITE_URL: string;
  INSTAGRAM_USER_ID?: string;
  INSTAGRAM_ACCESS_TOKEN?: string;
  INSTAGRAM_API_VERSION?: string;
  INSTAGRAM_API_BASE?: string;
  INSTAGRAM_CACHE_MINUTES?: string;
  R2_PUBLIC_BASE_URL?: string;
}
