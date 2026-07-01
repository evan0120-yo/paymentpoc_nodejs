import { BaseContextClass } from 'egg';
import type { BbpsRecharge, Prisma } from '@prisma/client';

export default class BbpsRechargeRepository extends BaseContextClass {
  private get table() {
    return this.app.prisma.bbpsRecharge;
  }

  async save(data: Prisma.BbpsRechargeUncheckedCreateInput): Promise<BbpsRecharge> {
    return this.table.upsert({
      where: { rechargeId: data.rechargeId },
      create: data,
      update: data,
    });
  }

  async findByOrderId(orderId: string): Promise<BbpsRecharge[]> {
    return this.table.findMany({ where: { orderId } });
  }

  async queryBbpsRecharge(params: { orderId?: string; rechargeId?: string }): Promise<BbpsRecharge[]> {
    const where: Prisma.BbpsRechargeWhereInput = {};
    if (params.orderId) where.orderId = params.orderId;
    if (params.rechargeId) where.rechargeId = params.rechargeId;
    return this.table.findMany({ where });
  }
}
