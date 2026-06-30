# paymentpoc-nodejs-egg

Egg.js + TypeScript backend shell for interview practice.

## Local Setup

```bash
npm install
copy .env.example .env
docker compose up -d mysql redis
npm run db:generate
npm run dev
```

## Useful Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run format
docker compose ps
docker compose logs -f mysql redis
```

## Project Shape

This shell mirrors the Java POC style: simple 3+1 layers with CQRS-style `store` and `query` splits. It is not DDD.

```text
app/
  router.ts
  controller/
    paycore/
  consumer/
    paycore/
  usecase/
    paycore/
      store/
      query/
  service/
    paycore/
      store/
      query/
      guard/
  dao/
    paycore/
  repository/
    paycore/
  model/
    paycore/
  object/
    paycore/
      req/
      dto/
      bo/
      event/
  event/
    paycore/
  schedule/
    paycore/
  enum/
    paycore/
  common/
    error/
    middleware/
    response/
    validation/
  infrastructure/
    prisma/
    redis/
    queue/
config/
prisma/
test/
```

```text
controller / consumer
-> usecase
-> service
-> dao / repository
-> prisma / mysql
```

Business routes, models, migrations, and payment/order flow are intentionally left for hand-written practice.
