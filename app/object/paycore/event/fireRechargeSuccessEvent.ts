export interface FireRechargeSuccessEvent {
  orderGid: string;
  refId: string;
  actualPaymentAmount: string;
  billAmount: string;
  rechargeInfo: string;
  eventType?: string;
  topicId?: string;
}
