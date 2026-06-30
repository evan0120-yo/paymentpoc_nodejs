import { existsSync } from 'node:fs';
import { defineConfig, env } from 'prisma/config';

// Prisma 7 不再自動載入 .env，需手動載入（Node 20.6+ 內建 loadEnvFile）
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Migrate / introspect 等需要連線的指令會用這個 URL
    url: env('DATABASE_URL'),
  },
});
