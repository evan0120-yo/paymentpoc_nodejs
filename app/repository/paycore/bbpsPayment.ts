import { BaseContextClass } from 'egg';
import { BbpsPaymentStatus } from '@prisma/client';
import type { BbpsPayment, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export default class BbpsPaymentRepository extends BaseContextClass {
  async saveInit(
    data: Omit<Prisma.BbpsPaymentUncheckedCreateInput, 'paymentId' | 'bbpsPaymentStatus'>,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsPayment> {
    return tx.bbpsPayment.create({
      data: { ...data, paymentId: randomUUID(), bbpsPaymentStatus: BbpsPaymentStatus.INIT },
    });
  }

  async updateStatus(
    payment: BbpsPayment,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsPayment> {
    const result = await tx.bbpsPayment.updateMany({
      where: { paymentId: payment.paymentId, version: payment.version },
      data: { bbpsPaymentStatus: payment.bbpsPaymentStatus, version: { increment: 1 } },
    });
    if (result.count === 0) {
      throw new Error(`OptimisticLockConflict: bbps_payment ${payment.paymentId}`);
    }
    return tx.bbpsPayment.findUniqueOrThrow({ where: { paymentId: payment.paymentId } });
  }

  async findByOrderId(
    orderId: string,
    tx: Prisma.TransactionClient = this.app.prisma,
  ): Promise<BbpsPayment[]> {
    return tx.bbpsPayment.findMany({ where: { orderId } });
  }
}
