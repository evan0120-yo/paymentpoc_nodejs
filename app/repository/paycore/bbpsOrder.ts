import { BaseContextClass } from "egg";
import type { BbpsOrder, Prisma } from "@prisma/client";

export default class BbpsOrderRepository extends BaseContextClass {
  private get table() {
    return this.app.prisma.bbpsOrder;
  }

  async save(data: Prisma.BbpsOrderCreateInput): Promise<BbpsOrder> {
    return this.table.upsert({
      where: { orderId: data.orderId },
      create: data,
      update: data,
    })
  }

  async findByOrderId(orderId: string): Promise<BbpsOrder | null> {
    return this.table.findUnique({
      where: { orderId },
    })
  }

  async findByRefId(refId: string): Promise<BbpsOrder | null> {
    return this.table.findUnique({
      where: { refId },
    })
  }

  async queryBbpsOrder(params: { orderId?: string; userGid?: string }): Promise<BbpsOrder[]> {
    const where: Prisma.BbpsOrderWhereInput = {};
    if (params.orderId) where.orderId = params.orderId;
    if (params.userGid) where.userGid = params.userGid;
    return this.table.findMany({ where });
  }

}
