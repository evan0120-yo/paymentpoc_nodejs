import { BaseContextClass } from "egg";
import type { BbpsPayment, Prisma } from "@prisma/client";

export default class BbpsPaymentRepository extends BaseContextClass {

  private get table() {
    return this.app.prisma.bbpsPayment;
  }

  async save(data: Prisma.BbpsPaymentCreateInput): Promise<BbpsPayment> {
    return this.table.upsert({
      where: { paymentId: data.paymentId },
      create: data,
      update: data,
    })
  }

  async findByOrderId(orderId: string): Promise<BbpsPayment[]> {
    return this.table.findMany({ where: { orderId } });
  }

  async queryBbpsPayment(params: { orderId?: string; paymentId?: string }): Promise<BbpsPayment[]> {
    const where: Prisma.BbpsPaymentWhereInput = {};
    if (params.orderId) where.orderId = params.orderId;
    if (params.paymentId) where.paymentId = params.paymentId;
    return this.table.findMany({ where });
  }
}
