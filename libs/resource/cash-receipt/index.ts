import { AxiosInstance } from 'axios';
import { join } from 'path';
import { Resource } from '../resource';
import { CashReceipt, CashReceiptReqBody } from './type';

/**
 * 현금영수증 발급 및 취소를 위한 API입니다.
 * {@link https://docs.tosspayments.com/reference#%ED%98%84%EA%B8%88%EC%98%81%EC%88%98%EC%A6%9D}
 */
export class CashReceiptResource implements Resource {
  readonly path = 'cash-receipts';
  constructor(private httpClient: AxiosInstance) {}

  async request(body: CashReceiptReqBody) {
    const { data: cashReceipt } = await this.httpClient.post<CashReceipt>(this.path, body);
    return cashReceipt;
  }

  async cancel(receiptKey: string) {
    const url = join(this.path, receiptKey, 'cancel');
    const { data: cashReceipt } = await this.httpClient.post<CashReceipt>(url);
    return cashReceipt;
  }
}
