import type { PrismaClient } from "@prisma/client";

declare module 'egg' {
  interface Application {
    prisma: PrismaClient;
  }
}


