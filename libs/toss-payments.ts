import axios, { AxiosInstance } from 'axios';
import { PaymentResource } from './resource/payment';

export const TOSS_PAYMENTS_API_BASE_URL = 'https://api.tosspayments.com/v1';
export interface TossPaymentsConfig {
  /** 시크릿 키는 토스페이먼츠 API를 호출할 때 사용되는 키입니다. 노출되면 안됩니다. */
  secretKey: string;
  /** 토스페이먼츠 API를 호출할 https endpoint 입니다. */
  baseURL: string;
}

export class TossPaymentsAPI {
  httpClient: AxiosInstance;

  readonly payments: PaymentResource;

  constructor(config: TossPaymentsConfig) {
    const { secretKey, baseURL } = config;
    const base64key = Buffer.from(secretKey + ':', 'utf-8').toString('base64');

    this.httpClient = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${base64key}`,
      },
    });

    this.payments = new PaymentResource(this.httpClient);
  }
}
