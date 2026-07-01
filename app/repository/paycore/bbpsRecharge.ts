import { BaseContextClass } from 'egg';
import { BbpsRechargeStatus } from '@prisma/client';
import type { BbpsRecharge, Prisma } from '@prisma/client';

export default class BbpsRechargeRepository extends BaseContextClass {
  async saveInit(
    data: Omit<Prisma.BbpsRechargeUncheckedCreateInput, 'bbpsRechargeStatus'>,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsRecharge> {
    return tx.bbpsRecharge.create({
      data: { ...data, bbpsRechargeStatus: BbpsRechargeStatus.INIT },
    });
  }

  async updateStatus(
    recharge: BbpsRecharge,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsRecharge> {
    const result = await tx.bbpsRecharge.updateMany({
      where: { rechargeId: recharge.rechargeId, version: recharge.version },
      data: { bbpsRechargeStatus: recharge.bbpsRechargeStatus, version: { increment: 1 } },
    });
    if (result.count === 0) {
      throw new Error(`OptimisticLockConflict: bbps_recharge ${recharge.rechargeId}`);
    }
    return tx.bbpsRecharge.findUniqueOrThrow({ where: { rechargeId: recharge.rechargeId } });
  }

  async findByOrderId(
    orderId: string,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsRecharge[]> {
    return tx.bbpsRecharge.findMany({ where: { orderId } });
  }
}
