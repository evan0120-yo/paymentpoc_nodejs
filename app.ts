import { existsSync } from 'node:fs';
import type { Application, IBoot } from 'egg';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

if (existsSync('.env')) {
  process.loadEnvFile('.env');
}


export default class AppBootHook implements IBoot {
  constructor(private readonly app: Application) {}

  async didLoad() {
    const url = process.env.DATABASE_URL;
    if(!url) throw new Error('DATABASE_URL is not defined in .env file');
    const adapter = new PrismaMariaDb(url);
    this.app.prisma = new PrismaClient({ adapter });
  }

  async willReady() {
    await this.app.prisma.$connect();
  }

  async beforeClose() {
    await this.app.prisma.$disconnect();
  }
}
