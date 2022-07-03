import axios, { AxiosInstance } from 'axios';
import { CashReceiptResource, TransactionResource } from './resource';
import { BillingResource } from './resource/billing';
import { PaymentResource } from './resource/payment';
import { PromotionResource } from './resource/promotion';
import { SettlementResource } from './resource/settlement';

export const TOSS_PAYMENTS_API_BASE_URL = 'https://api.tosspayments.com/v1';
export interface TossPaymentsConfig {
  /** 시크릿 키는 토스페이먼츠 API를 호출할 때 사용되는 키입니다. 노출되면 안됩니다. */
  secretKey: string;
  /** 토스페이먼츠 API를 호출할 https endpoint 입니다. */
  baseURL: string;
}

export class TossPaymentsAPI {
  readonly payments: PaymentResource;
  readonly promotions: PromotionResource;
  readonly billing: BillingResource;
  readonly settlements: SettlementResource;
  readonly cashReceipt: CashReceiptResource;
  readonly transactions: TransactionResource;

  constructor(config: TossPaymentsConfig) {
    const { secretKey, baseURL } = config;
    const base64key = Buffer.from(secretKey + ':', 'utf-8').toString('base64');

    const httpClient = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${base64key}`,
      },
    });

    this.payments = new PaymentResource(httpClient);
    this.promotions = new PromotionResource(httpClient);
    this.billing = new BillingResource(httpClient);
    this.settlements = new SettlementResource(httpClient);
    this.cashReceipt = new CashReceiptResource(httpClient);
    this.transactions = new TransactionResource(httpClient);
  }
}
