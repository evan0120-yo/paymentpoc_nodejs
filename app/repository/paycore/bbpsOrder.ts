import { BaseContextClass } from 'egg';
import { BbpsOrderStatus } from '@prisma/client';
import type { BbpsOrder, Prisma } from '@prisma/client';

export default class BbpsOrderRepository extends BaseContextClass {
  async saveInit(
    data: Omit<Prisma.BbpsOrderUncheckedCreateInput, 'bbpsOrderStatus'>,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsOrder> {
    return tx.bbpsOrder.create({
      data: { ...data, bbpsOrderStatus: BbpsOrderStatus.INIT },
    });
  }

  async updateStatus(
    order: BbpsOrder,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsOrder> {
    const result = await tx.bbpsOrder.updateMany({
      where: { orderId: order.orderId, version: order.version },
      data: { bbpsOrderStatus: order.bbpsOrderStatus, version: { increment: 1 } },
    });
    if (result.count === 0) {
      throw new Error(`OptimisticLockConflict: bbps_order ${order.orderId}`);
    }
    return tx.bbpsOrder.findUniqueOrThrow({ where: { orderId: order.orderId } });
  }

  async findByRefId(
    refId: string,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsOrder[]> {
    return tx.bbpsOrder.findMany({ where: { refId } });
  }
}
