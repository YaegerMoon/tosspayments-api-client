import { AxiosInstance } from 'axios';
import { Transaction, TransactionQueryParams } from './type';

/**
 * 거래 조회 API로 원하는 기간 동안의 거래 기록을 조회하고 대조 확인하는 작업을 할 수 있습니다.
 * {@link https://docs.tosspayments.com/reference#%EA%B1%B0%EB%9E%98}
 */
export class TransactionResource {
  /**
   * @param httpClient
   */
  constructor(private httpClient: AxiosInstance) {}

  /**
   * 지정한 날짜 정보로 거래 기록을 조회합니다.
   * @param query
   * @returns 거래 조회 요청에 성공했다면 Transaction 객체가 돌아옵니다.
   */
  async retrieve(query: TransactionQueryParams) {
    const { data: transaction } = await this.httpClient.get<Transaction>('/transactions', { params: query });
    return transaction;
  }
}
