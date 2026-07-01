import { BaseContextClass } from 'egg';
import type { BbpsRefund, Prisma } from '@prisma/client';

export default class BbpsRefundRepository extends BaseContextClass {
  private get table() {
    return this.app.prisma.bbpsRefund;
  }

  async save(data: Prisma.BbpsRefundUncheckedCreateInput): Promise<BbpsRefund> {
    return this.table.upsert({
      where: { refundId: data.refundId },
      create: data,
      update: data,
    });
  }

  async findByRefundId(refundId: string): Promise<BbpsRefund | null> {
    return this.table.findUnique({ where: { refundId } });
  }
}
