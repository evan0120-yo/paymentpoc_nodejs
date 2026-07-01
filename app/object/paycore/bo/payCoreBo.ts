import type { BbpsOrder, BbpsPayment, BbpsRecharge, BbpsRefund } from '@prisma/client';

export interface PayCoreBo {
  bbpsOrder?: BbpsOrder;
  bbpsPayment?: BbpsPayment;
  bbpsRecharge?: BbpsRecharge;
  bbpsRefund?: BbpsRefund;
}
